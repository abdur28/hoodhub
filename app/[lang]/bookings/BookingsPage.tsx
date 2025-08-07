"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Calendar as CalendarIcon,
  Clock,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  CheckCircle,
  User,
  Scissors,
  PaintBucket,
  Diamond,
  Heart,
  X,
  AlertTriangle,
  Gift,
  Copy,
  Edit,
  Save,
  Phone,
  Check,
  MessageSquare,
  Package
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { Dictionary } from "../dictionaries";

interface User {
  _id: string;
  clerkId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  profilePicture?: string;
  referralCode?: string;
}

interface Service {
  id: string;
  name: string;
}

interface Booking {
  id: string;
  services?: Service[];
  service?: Service;
  date: string;
  time: string;
  dateTime: string;
  formattedDate: string;
  formattedTime: string;
  createdAt: string;
  isPast: boolean;
  comment?: string;
  referral?: {
    referralCode: string;
    referralUserEmail: string;
  };
}

interface BookingsResponse {
  success: boolean;
  bookings: {
    upcoming: Booking[];
    past: Booking[];
    all: Booking[];
  };
  totalBookings: number;
}

interface BookingsPageProps {
  lang: string;
  dictionary: Dictionary;
  userAsString: string;
}

const BookingsPage = ({ lang, dictionary, userAsString }: BookingsPageProps) => {
  const [bookings, setBookings] = useState<BookingsResponse["bookings"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<{id: string, serviceNames: string, dateTime: string} | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  
  // Phone editing states
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isUpdatingPhone, setIsUpdatingPhone] = useState(false);

  const user: User = JSON.parse(userAsString);

  // Helper function to parse date from string (YYYY-MM-DD format)
  const parseDate = (dateString: string): Date => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  // Get service icon based on service ID
  const getServiceIcon = (serviceId: string) => {
    switch (serviceId) {
      case 'braids':
      case 'locs':  
      case 'barbing':
        return <Scissors className="w-4 h-4" />;
      case 'tattoo':
        return <PaintBucket className="w-4 h-4" />;
      case 'manicure':
      case 'pedicure':
        return <Diamond className="w-4 h-4" />;
      case 'beautyMakeup':
        return <Heart className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  // Get service names from booking (handles both legacy and new formats)
  const getServiceNames = (booking: Booking): string => {
    if (booking.services && booking.services.length > 0) {
      // New format: multiple services
      return booking.services.map(s => s.name).join(', ');
    } else if (booking.service) {
      // Legacy format: single service
      return booking.service.name;
    }
    return 'Unknown Service';
  };

  // Get all services from booking as array (handles both formats)
  const getServicesArray = (booking: Booking): Service[] => {
    if (booking.services && booking.services.length > 0) {
      return booking.services;
    } else if (booking.service) {
      return [booking.service];
    }
    return [{ id: 'unknown', name: 'Unknown Service' }];
  };

  // Get service count
  const getServiceCount = (booking: Booking): number => {
    if (booking.services) {
      return booking.services.length;
    } else if (booking.service) {
      return 1;
    }
    return 0;
  };

  const copyReferralCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(true);
      toast.success("Referral code copied to clipboard!");
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (err) {
      toast.error("Failed to copy referral code");
    }
  };

  const updatePhoneNumber = async () => {
    if (!phoneNumber.trim()) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setIsUpdatingPhone(true);
    try {
      const response = await fetch('/api/user/update-phone', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: phoneNumber.trim() }),
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        toast.success("Phone number updated successfully!");
        setIsEditingPhone(false);
        user.phoneNumber = phoneNumber.trim();
      } else {
        toast.error(data.error || "Failed to update phone number");
      }
    } catch (error) {
      console.error("Error updating phone number:", error);
      toast.error("Failed to update phone number. Please try again.");
    } finally {
      setIsUpdatingPhone(false);
    }
  };

  // Fetch bookings on mount
  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    if (user.phoneNumber) {
      setPhoneNumber(user.phoneNumber);
    }
  }, [user.phoneNumber]);

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

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/user-bookings');
      const data = await response.json();
      
      if (response.ok && data.success) {
        setBookings(data.bookings);
      } else {
        console.error('Failed to fetch bookings:', data.error);
        toast.error("Failed to load bookings", {
          description: "Please refresh the page to try again.",
          icon: <X className="w-4 h-4" />
        });
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error("Connection error", {
        description: "Please check your internet connection and try again.",
        icon: <X className="w-4 h-4" />
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBooking = async (bookingId: string, booking: Booking) => {
    const serviceNames = getServiceNames(booking);
    const dateTime = `${booking.formattedDate} at ${booking.formattedTime}`;
    setBookingToDelete({ id: bookingId, serviceNames, dateTime });
    setConfirmDialogOpen(true);
  };

  const confirmDeleteBooking = async () => {
    if (!bookingToDelete) return;
    
    setDeletingId(bookingToDelete.id);
    setConfirmDialogOpen(false);
    
    const toastId = toast.loading("Cancelling booking...", {
      description: "Please wait while we process your cancellation"
    });

    try {
      const response = await fetch(`/api/book?id=${bookingToDelete.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.dismiss(toastId);
        toast.success("Booking cancelled", {
          description: `Your ${bookingToDelete.serviceNames} appointment has been cancelled successfully.`,
          icon: <CheckCircle className="w-4 h-4" />,
          duration: 5000
        });
        await fetchBookings();
      } else {
        const data = await response.json();
        toast.dismiss(toastId);
        toast.error("Failed to cancel booking", {
          description: data.error || "Please try again or contact support.",
          icon: <X className="w-4 h-4" />,
          duration: 5000
        });
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
      toast.dismiss(toastId);
      toast.error("Something went wrong", {
        description: "Please try again later.",
        icon: <X className="w-4 h-4" />,
        duration: 5000
      });
    } finally {
      setDeletingId(null);
      setBookingToDelete(null);
    }
  };

  const formatDateForCalendar = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth();
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  // Get bookings for a specific date (using string comparison)
  const getBookingsForDate = (date: Date) => {
    if (!bookings) return [];
    const dateStr = formatDateForCalendar(date);
    return bookings.all.filter(booking => booking.date === dateStr);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Floating Navigation */}
      <FloatingNav lang={lang} dictionary={dictionary} />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full overflow-hidden">
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
        </div>

        <div className="absolute top-0 left-0 right-0 z-40">
          <Navbar variant="transparent" lang={lang} dictionary={dictionary} />
        </div>

        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mb-8"
            >
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-franklin text-white">
                {dictionary.bookings.hero.title} {" "}
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                  {dictionary.bookings.hero.titleHighlight}
                </span>
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bookings Section */}
      <section className="relative rounded-t-4xl bg-white py-20 lg:py-32 -mt-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Left Side - Calendar */}
            <motion.div
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Calendar */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h2 className="text-2xl font-franklin font-semibold text-gray-900 mb-6">
                  {dictionary.bookings.calendar.title}
                </h2>

                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={handlePrevMonth}
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h3 className="text-xl font-franklin font-semibold">
                    {dictionary.book?.calendar?.months?.[currentMonth.getMonth()] || currentMonth.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', { month: 'long' })} {currentMonth.getFullYear()}
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
                  {(dictionary.book?.calendar?.days || ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']).map((day) => (
                    <div key={day} className="text-center text-sm font-franklin font-medium text-gray-600 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((date, index) => {
                    const isCurrent = isCurrentMonth(date);
                    const todayDate = isToday(date);
                    const bookingsOnDate = getBookingsForDate(date);
                    const hasBooking = bookingsOnDate.length > 0;

                    return (
                      <div
                        key={index}
                        className={`
                          relative h-12 w-full rounded-lg text-sm font-franklin transition-all duration-200
                          ${!isCurrent ? 'text-gray-400' : 'text-gray-900'}
                          ${todayDate ? 'bg-blue-100 text-blue-600 font-medium' : ''}
                          ${hasBooking ? 'bg-yellow-100' : ''}
                        `}
                      >
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span>{date.getDate()}</span>
                          {hasBooking && (
                            <div className="flex gap-0.5 mt-1">
                              {bookingsOnDate.slice(0, 3).map((booking, i) => {
                                const serviceCount = getServiceCount(booking);
                                return (
                                  <div
                                    key={i}
                                    className={`w-1 h-1 rounded-full ${serviceCount > 1 ? 'bg-green-500' : 'bg-yellow-500'}`}
                                    title={`${getServiceNames(booking)} at ${booking.formattedTime}`}
                                  />
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="mt-6 flex items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-100 rounded"></div>
                    <span className="font-franklin text-gray-600">{dictionary.bookings.calendar.booked}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-100 rounded"></div>
                    <span className="font-franklin text-gray-600">{dictionary.bookings.calendar.today}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                    <span className="font-franklin text-gray-600">Multiple Services</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Bookings List */}
            <motion.div
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* User Info */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
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
                  <div className="flex-1">
                    <h3 className="text-xl font-franklin font-semibold text-gray-900">
                      {user.firstName} {user.lastName}
                    </h3>
                    <p className="text-gray-600 font-franklin">{user.email}</p>
                    
                    {/* Phone Number Section */}
                    <div className="flex items-center gap-2 mt-1">
                      <Phone className="w-4 h-4 text-gray-500" />
                      {isEditingPhone ? (
                        <div className="flex items-center gap-2">
                          <Input
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="+234 123 456 7890"
                            className="h-8 text-sm w-40"
                          />
                          <Button
                            size="sm"
                            onClick={updatePhoneNumber}
                            disabled={isUpdatingPhone}
                            className="h-8 px-2"
                          >
                            {isUpdatingPhone ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Save className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setIsEditingPhone(false);
                              setPhoneNumber(user.phoneNumber || "");
                            }}
                            className="h-8 px-2"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600 font-franklin text-sm">
                            {user.phoneNumber || "No phone number"}
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setIsEditingPhone(true)}
                            className="h-6 px-1"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Referral Code */}
                    {user.referralCode && (
                      <div className="flex items-center gap-2 mt-2">
                        <Gift className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-franklin text-gray-600">Your referral code:</span>
                        <code className="bg-green-100 px-2 py-1 rounded text-sm font-mono text-green-700">
                          {user.referralCode}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyReferralCode(user.referralCode!)}
                          className="h-6 px-1"
                        >
                          {copiedCode ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Booking Tabs */}
              <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
                <button
                  onClick={() => setActiveTab("upcoming")}
                  className={`flex-1 py-2 px-4 rounded-lg font-franklin font-medium transition-all duration-200 ${
                    activeTab === "upcoming"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {dictionary.bookings.tabs.upcoming}
                  {bookings && bookings.upcoming.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {bookings.upcoming.length}
                    </Badge>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("past")}
                  className={`flex-1 py-2 px-4 rounded-lg font-franklin font-medium transition-all duration-200 ${
                    activeTab === "past"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {dictionary.bookings.tabs.past}
                  {bookings && bookings.past.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {bookings.past.length}
                    </Badge>
                  )}
                </button>
              </div>

              {/* Bookings List */}
              <div className="space-y-4">
                {isLoading ? (
                  <div className="text-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-gray-400" />
                    <p className="text-gray-600 font-franklin mt-2">Loading your bookings...</p>
                  </div>
                ) : !bookings || (activeTab === "upcoming" ? bookings.upcoming.length === 0 : bookings.past.length === 0) ? (
                  <div className="text-center py-8">
                    <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-franklin font-semibold text-gray-900 mb-2">
                      {activeTab === "upcoming" ? dictionary.bookings.empty.noUpcoming : dictionary.bookings.empty.noPast}
                    </h3>
                    <p className="text-gray-600 font-franklin mb-4">
                      {activeTab === "upcoming" ? dictionary.bookings.empty.noUpcomingDescription : dictionary.bookings.empty.noPastDescription}
                    </p>
                    {activeTab === "upcoming" && (
                      <Link href={`/${lang}/book`}>
                        <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-franklin">
                          {dictionary.bookings.empty.bookNewButton}
                        </Button>
                      </Link>
                    )}
                  </div>
                ) : (
                  (activeTab === "upcoming" ? bookings.upcoming : bookings.past).map((booking) => {
                    const services = getServicesArray(booking);
                    const serviceNames = getServiceNames(booking);
                    const serviceCount = getServiceCount(booking);
                    
                    return (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            {/* Services Display */}
                            <div className="flex items-center gap-2 mb-3">
                              {getServiceIcon(services[0]?.id || '')}
                              <div>
                                <h3 className="font-franklin font-semibold text-gray-900">
                                  {serviceNames}
                                </h3>
                              </div>
                            </div>
                            
                            {/* Date and Time */}
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4" />
                                <span>{booking.formattedDate}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{booking.formattedTime}</span>
                              </div>
                            </div>

                            {/* Comment */}
                            {booking.comment && (
                              <div className="flex items-start gap-2 mb-3 p-3 bg-gray-50 rounded-lg">
                                <MessageSquare className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                                <div>
                                  <span className="text-xs font-medium text-gray-700 block">Special Requests:</span>
                                  <span className="text-sm text-gray-600">{booking.comment}</span>
                                </div>
                              </div>
                            )}

                            {/* Referral Info */}
                            {booking.referral && (
                              <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 px-2 py-1 rounded-lg">
                                <Gift className="w-3 h-3" />
                                <span>Referred by {booking.referral.referralUserEmail}</span>
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          {!booking.isPast && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteBooking(booking.id, booking)}
                              disabled={deletingId === booking.id}
                              className="ml-4 text-red-600 border-red-200 hover:bg-red-50"
                            >
                              {deletingId === booking.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>

              {/* Book New Appointment Button */}
              {bookings && bookings.upcoming.length > 0 && (
                <div className="mt-6 text-center">
                  <Link href={`/${lang}/book`}>
                    <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-franklin">
                      {dictionary.bookings.empty.bookNewButton}
                    </Button>
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-franklin">Cancel Booking</DialogTitle>
            <DialogDescription className="font-franklin">
              {`${dictionary.bookings.alerts.confirmCancel} ${bookingToDelete && bookingToDelete.serviceNames} on ${bookingToDelete && bookingToDelete.dateTime}`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
              Keep Booking
            </Button>
            <Button variant="destructive" onClick={confirmDeleteBooking}>
              Cancel Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingsPage;