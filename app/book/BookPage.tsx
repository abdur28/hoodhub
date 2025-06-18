"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
  ChevronRight
} from "lucide-react";
import { barbingServices } from "@/constants";

interface User {
  _id: string;
  clerkId: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string;
}

interface BookPageProps {
  userAsString: string;
  selectedService?: string;
}

const services = [
  { id: "barbing", name: "Professional Barbing", category: "Barbing" },
  { id: "tattoo", name: "Tattoo Artistry", category: "Tattoo" },
  { id: "nails", name: "Nails Services", category: "Lifestyle" },
  { id: "breads", name: "Breads & Treats", category: "Other" },
];

const timeSlots = [
  "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"
];

const BookPage = ({ userAsString, selectedService }: BookPageProps) => {
  const [selectedServiceId, setSelectedServiceId] = useState(selectedService || "");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);

  const user: User = JSON.parse(userAsString);

  // Generate calendar days
  useEffect(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
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

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    return date < today && !isToday(date);
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth();
  };

  const handleDateSelect = (date: Date) => {
    if (isPastDate(date)) return;
    setSelectedDate(formatDate(date));
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleBooking = () => {
    if (!user) {
      // Redirect to sign in
      window.location.href = '/sign-in';
      return;
    }

    if (!selectedServiceId || !selectedDate || !selectedTime) {
      alert('Please select all required fields');
      return;
    }

    // Handle booking logic here
    console.log('Booking:', {
      service: selectedServiceId,
      date: selectedDate,
      time: selectedTime,
      user: user.clerkId
    });
    
    alert('Booking request submitted! We will contact you to confirm.');
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="min-h-screen bg-black">
      {/* Floating Navigation */}
      <FloatingNav />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden">
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
          <Navbar variant="transparent" />
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
                Book Your {" "}
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                  Experience
                </span>
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="relative rounded-t-[4rem] bg-white py-20 lg:py-32 -mt-16 z-20">
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
                  Select Service
                </Label>
                <Select value={selectedServiceId} onValueChange={setSelectedServiceId}>
                  <SelectTrigger className="w-full h-14 text-lg font-franklin">
                    <SelectValue placeholder="Choose your service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.id} className="font-franklin ">
                        <div className="flex items-center gap-2">
                          <div className="font-medium">{service.name}</div>
                          <div className="text-sm text-gray-500">{'-'}</div>
                          <div className="text-sm text-gray-500">{service.category}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Calendar */}
              <div>
                <Label className="text-lg font-franklin font-semibold text-gray-900 mb-4 block">
                  Select Date
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
                      {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
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
                    {dayNames.map((day) => (
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
                  Select Time
                </Label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      disabled={!selectedDate}
                      className={`
                        h-12 rounded-lg text-sm font-franklin font-medium transition-all duration-200
                        ${!selectedDate 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : selectedTime === time
                            ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-lg' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                        }
                      `}
                    >
                      <Clock className="w-4 h-4 inline mr-1" />
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Side - User Profile & Book Button */}
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
                        <img 
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
                      Sign in to Book
                    </h3>
                    <p className="text-gray-600 font-franklin mb-4">
                      Please sign in to your account to book an appointment
                    </p>
                    <Button
                      onClick={() => window.location.href = '/sign-in'}
                      className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-franklin"
                    >
                      Sign In
                    </Button>
                  </div>
                )}
              </div>

              {/* Booking Summary */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-xl font-franklin font-semibold text-gray-900 mb-6">
                  Booking Summary
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-franklin text-gray-600">Service:</span>
                    <span className="font-franklin font-medium">
                      {selectedServiceId ? services.find(s => s.id === selectedServiceId)?.name : "Not selected"}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-franklin text-gray-600">Date:</span>
                    <span className="font-franklin font-medium">
                      {selectedDate ? new Date(selectedDate).toLocaleDateString() : "Not selected"}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-franklin text-gray-600">Time:</span>
                    <span className="font-franklin font-medium">
                      {selectedTime || "Not selected"}
                    </span>
                  </div>
                </div>

                <div className="mt-8">
                  <Button
                    onClick={handleBooking}
                    disabled={!user || !selectedServiceId || !selectedDate || !selectedTime}
                    className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-franklin font-semibold py-4 text-lg hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Book Appointment
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookPage;