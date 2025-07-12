"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Calendar as CalendarIcon,
  Clock,
  User,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertTriangle,
  X,
  Gift,
  Info
} from "lucide-react";
import Image from "next/image";
import type { Dictionary } from "../dictionaries";

interface User {
  _id: string;
  clerkId: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string;
}

interface BookPageProps {
  lang: string;
  dictionary: Dictionary;
  userAsString: string;
  selectedService?: string;
  referral?: string;
}

const BookPage = ({ lang, dictionary, userAsString, selectedService, referral }: BookPageProps) => {
  const [selectedServiceId, setSelectedServiceId] = useState(selectedService || "");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [referralCode, setReferralCode] = useState(referral || "");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);
  const [availableSlots, setAvailableSlots] = useState<{time: string, available: boolean}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingSlots, setIsFetchingSlots] = useState(false);
  const [isValidatingReferral, setIsValidatingReferral] = useState(false);
  const [referralStatus, setReferralStatus] = useState<'valid' | 'invalid' | 'not-checked'>('not-checked');
  const [referralUserEmail, setReferralUserEmail] = useState("");

  const user: User | null = userAsString ? JSON.parse(userAsString) : null;

  // Services with translated names (categories removed)
  const services = [
    { id: "barbing", name: dictionary.book.services.barbing },
    { id: "braidslocks", name: dictionary.book.services.braidslocks },
    { id: "manicurePedicure", name: dictionary.book.services.manicurePedicure },
    { id: "tattoo", name: dictionary.book.services.tattoo },
  ];

  const timeSlots = [
    "10:00", "11:00", "12:00", "13:00", "14:00", 
    "15:00", "16:00", "17:00", "18:00", "19:00", 
    "20:00", "21:00"
  ];

  // Generate calendar days
  useEffect(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(firstDay.getDate() - firstDay.getDay());
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    
    setCalendarDays(days);
  }, [currentMonth]);

  // Fetch available slots when date changes
  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots();
    }
  }, [selectedDate]);

  // Validate referral code when it changes
  useEffect(() => {
    if (referralCode.trim() && referralCode.length >= 5) {
      validateReferralCode();
    } else {
      setReferralStatus('not-checked');
      setReferralUserEmail("");
    }
  }, [referralCode]);

  const fetchAvailableSlots = async () => {
    setIsFetchingSlots(true);
    try {
      const response = await fetch(`/api/book?date=${selectedDate}`);
      const data = await response.json();
      
      if (response.ok && data.slots) {
        setAvailableSlots(data.slots);
      } else {
        console.error('Failed to fetch slots:', data.error);
        setAvailableSlots(timeSlots.map(time => ({ time, available: true })));
        toast.error("Failed to load available slots", {
          description: "Showing all slots as available. Please refresh if needed."
        });
      }
    } catch (error) {
      console.error('Error fetching slots:', error);
      setAvailableSlots(timeSlots.map(time => ({ time, available: true })));
      toast.error("Failed to load available slots", {
        description: "Please check your connection and try again."
      });
    } finally {
      setIsFetchingSlots(false);
    }
  };

  const validateReferralCode = async () => {
    if (!referralCode.trim()) return;
    
    setIsValidatingReferral(true);
    try {
      const response = await fetch(`/api/referral/validate?code=${referralCode.trim()}`);
      const data = await response.json();
      
      if (response.ok && data.valid) {
        setReferralStatus('valid');
        setReferralUserEmail(data.userEmail);
      } else {
        setReferralStatus('invalid');
        setReferralUserEmail("");
      }
    } catch (error) {
      console.error('Error validating referral code:', error);
      setReferralStatus('invalid');
      setReferralUserEmail("");
    } finally {
      setIsValidatingReferral(false);
    }
  };

  const formatDate = (date: Date) => {
    // Use local timezone instead of UTC to avoid date shifting
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth();
  };

  const handleDateSelect = (date: Date) => {
    if (isPastDate(date)) return;
    setSelectedDate(formatDate(date));
    setSelectedTime("");
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleBooking = async () => {
    if (!user) {
      window.location.href = `/${lang}/sign-in`;
      return;
    }

    if (!selectedServiceId || !selectedDate || !selectedTime) {
      toast.warning("Please complete your selection", {
        description: dictionary.book.alerts.selectAll,
        icon: <AlertTriangle className="w-4 h-4" />,
      });
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading("Creating your booking...", {
      description: "Please wait while we process your request"
    });

    try {
      const selectedServiceData = services.find(s => s.id === selectedServiceId);
      
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: {
            id: selectedServiceId,
            name: selectedServiceData?.name || ''
          },
          date: selectedDate,
          time: selectedTime,
          referralCode: referralCode.trim() || null,
          referralUserEmail: referralUserEmail || null
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.dismiss(toastId);
        toast.success("Booking confirmed!", {
          description: dictionary.book.alerts.confirmed,
          icon: <CheckCircle className="w-4 h-4" />,
          duration: 5000,
        });
        
        // Reset form
        setSelectedServiceId('');
        setSelectedDate('');
        setSelectedTime('');
        setReferralCode('');
        setReferralStatus('not-checked');
        setReferralUserEmail('');
        setAvailableSlots([]);
      } else {
        toast.dismiss(toastId);
        toast.error("Booking failed", {
          description: data.error || dictionary.book.alerts.failed,
          icon: <X className="w-4 h-4" />,
          duration: 5000,
        });
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.dismiss(toastId);
      toast.error("Something went wrong", {
        description: dictionary.book.alerts.error,
        icon: <X className="w-4 h-4" />,
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Floating Navigation */}
      <FloatingNav lang={lang} dictionary={dictionary} />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-[200%] h-[200%]"
            animate={{
              x: ["-25%", "-75%", "-25%"],
              rotate: [0, 360],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              background: `radial-gradient(circle, rgba(180,83,9,0.15) 0%, rgba(0,0,0,0) 70%)`
            }}
          />
          
          <motion.div 
            className="absolute top-3/4 left-3/4 w-[150%] h-[150%]"
            animate={{
              x: ["-50%", "-90%", "-50%"],
              rotate: [360, 0],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              background: `radial-gradient(circle, rgba(120,53,15,0.1) 0%, rgba(0,0,0,0) 70%)`
            }}
          />
        </div>

        {/* Transparent Navbar */}
        <div className="absolute top-0 left-0 right-0 z-40">
          <Navbar variant="transparent" lang={lang} dictionary={dictionary} />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mb-8"
            >
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-franklin text-white">
                {dictionary.book.hero.title} {" "}
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                  {dictionary.book.hero.titleHighlight}
                </span>
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="relative rounded-t-4xl bg-white py-20 lg:py-32 -mt-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Left Side - Service Selection, Calendar & Time */}
            <motion.div
              className="w-full lg:w-1/2 space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* Service Selection */}
              <div>
                <Label className="text-lg font-franklin font-semibold text-gray-900 mb-4 block">
                  {dictionary.book.form.selectService}
                </Label>
                <Select value={selectedServiceId} onValueChange={setSelectedServiceId}>
                  <SelectTrigger className="w-full h-14 text-lg font-franklin">
                    <SelectValue placeholder={dictionary.book.form.chooseService} />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.id} className="font-franklin">
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Calendar */}
              <div>
                <Label className="text-lg font-franklin font-semibold text-gray-900 mb-4 block">
                  {dictionary.book.form.selectDate}
                </Label>
                <div className="bg-gray-50 rounded-2xl p-6">
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between mb-6">
                    <button
                      onClick={handlePrevMonth}
                      className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <h3 className="text-xl font-franklin font-semibold">
                      {dictionary.book.calendar.months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </h3>
                    <button
                      onClick={handleNextMonth}
                      className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Day Headers */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {dictionary.book.calendar.days.map((day) => (
                      <div key={day} className="text-center text-sm font-franklin font-medium text-gray-600 py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((date, index) => {
                      const dateStr = formatDate(date);
                      const isSelected = selectedDate === dateStr;
                      const isPast = isPastDate(date);
                      const isCurrent = isCurrentMonth(date);
                      const todayDate = isToday(date);

                      return (
                        <button
                          key={index}
                          onClick={() => handleDateSelect(date)}
                          disabled={isPast}
                          className={`
                            relative h-12 w-full rounded-lg text-sm font-franklin transition-all duration-200
                            ${isPast 
                              ? 'text-gray-300 cursor-not-allowed' 
                              : 'hover:bg-gray-200 cursor-pointer'
                            }
                            ${!isCurrent ? 'text-gray-400' : 'text-gray-900'}
                            ${isSelected 
                              ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold' 
                              : todayDate 
                                ? 'bg-blue-100 text-blue-600 font-medium' 
                                : ''
                            }
                          `}
                        >
                          {date.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Time Selection */}
              <div>
                <Label className="text-lg font-franklin font-semibold text-gray-900 mb-4 block">
                  {dictionary.book.form.selectTime}
                  {isFetchingSlots && (
                    <span className="ml-2 text-sm text-gray-500 font-normal">
                      <Loader2 className="w-4 h-4 inline animate-spin mr-1" />
                      {dictionary.book.form.loadingSlots}
                    </span>
                  )}
                </Label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {selectedDate && availableSlots.length > 0 ? (
                    availableSlots.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => slot.available && setSelectedTime(slot.time)}
                        disabled={!slot.available}
                        className={`
                          h-12 rounded-lg text-sm font-franklin font-medium transition-all duration-200
                          ${!slot.available 
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed line-through' 
                            : selectedTime === slot.time
                              ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-lg' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                          }
                        `}
                      >
                        <Clock className="w-4 h-4 inline mr-1" />
                        {slot.time}
                      </button>
                    ))
                  ) : (
                    timeSlots.map((time) => (
                      <button
                        key={time}
                        disabled={!selectedDate}
                        className="h-12 rounded-lg text-sm font-franklin font-medium bg-gray-100 text-gray-400 cursor-not-allowed"
                      >
                        <Clock className="w-4 h-4 inline mr-1" />
                        {time}
                      </button>
                    ))
                  )}
                </div>
              </div>
            </motion.div>

            {/* Right Side - User Profile, Referral & Book Button */}
            <motion.div
              className="w-full lg:w-1/2 space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* User Profile */}
              <div className="bg-gray-50 rounded-2xl p-8">
                {user ? (
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                      {user.profilePicture ? (
                        <Image 
                          width={100}
                          height={100}
                          src={user.profilePicture} 
                          alt={`${user.firstName} ${user.lastName}`}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-8 h-8 text-black" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-franklin font-semibold text-gray-900">
                        {user.firstName} {user.lastName}
                      </h3>
                      <p className="text-gray-600 font-franklin">{user.email}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-franklin font-semibold text-gray-900 mb-2">
                      {dictionary.book.auth.signInTitle}
                    </h3>
                    <p className="text-gray-600 font-franklin mb-4">
                      {dictionary.book.auth.signInDescription}
                    </p>
                    <Button
                      onClick={() => window.location.href = `/${lang}/sign-in`}
                      className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-franklin"
                    >
                      {dictionary.book.auth.signInButton}
                    </Button>
                  </div>
                )}
              </div>

              {/* Referral Code Section */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <Gift className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-franklin font-semibold text-gray-900">
                    Referral Code
                  </h3>
                </div>
                
                <div className="space-y-3">
                  <div className="relative">
                    <Input
                      type="text"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                      placeholder="Enter 7-character referral code (optional)"
                      className="w-full h-12 text-lg font-franklin  tracking-wider"
                      maxLength={12}
                    />
                    {isValidatingReferral && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                      </div>
                    )}
                  </div>
                  
                  {referralStatus === 'valid' && (
                    <div className="flex items-center gap-2 text-green-700 text-sm font-franklin">
                      <CheckCircle className="w-4 h-4" />
                      <span>Valid referral code from {referralUserEmail}</span>
                    </div>
                  )}
                  
                  {referralStatus === 'invalid' && (
                    <div className="flex items-center gap-2 text-red-700 text-sm font-franklin">
                      <X className="w-4 h-4" />
                      <span>Invalid referral code</span>
                    </div>
                  )}
                  
                  <div className="flex items-start gap-2 text-sm text-gray-600 font-franklin">
                    <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>
                      Have a referral code? Enter it above to connect with the person who referred you.
                    </span>
                  </div>
                </div>
              </div>

              {/* Booking Summary */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-xl font-franklin font-semibold text-gray-900 mb-6">
                  {dictionary.book.summary.title}
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-franklin text-gray-600">{dictionary.book.summary.service}:</span>
                    <span className="font-franklin font-medium">
                      {selectedServiceId ? services.find(s => s.id === selectedServiceId)?.name : dictionary.book.summary.notSelected}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-franklin text-gray-600">{dictionary.book.summary.date}:</span>
                    <span className="font-franklin font-medium">
                      {selectedDate ? new Date(selectedDate).toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US') : dictionary.book.summary.notSelected}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-franklin text-gray-600">{dictionary.book.summary.time}:</span>
                    <span className="font-franklin font-medium">
                      {selectedTime || dictionary.book.summary.notSelected}
                    </span>
                  </div>
                  
                  {referralStatus === 'valid' && (
                    <div className="flex items-center justify-between">
                      <span className="font-franklin text-gray-600">Referral:</span>
                      <span className="font-franklin font-medium text-green-700">
                        {referralCode}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-8">
                  <Button
                    onClick={handleBooking}
                    disabled={!user || !selectedServiceId || !selectedDate || !selectedTime || isLoading}
                    className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-franklin font-semibold py-4 text-lg hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        {dictionary.book.summary.processing}
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        {dictionary.book.summary.bookButton}
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h4 className="font-franklin font-semibold text-blue-900 mb-2 flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  {dictionary.book.info.title}
                </h4>
                <ul className="space-y-2 text-sm text-blue-800 font-franklin">
                  <li>• {dictionary.book.info.cancellation}</li>
                  <li>• {dictionary.book.info.arrival}</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookPage;