"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
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
  Copy
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
  profilePicture?: string;
  referralCode?: string;
}

interface Booking {
  id: string;
  service: {
    id: string;
    name: string;
  };
  dateTime: string;
  createdAt: string;
  isPast: boolean;
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
  const [bookingToDelete, setBookingToDelete] = useState<{id: string, serviceName: string, dateTime: string} | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const user: User = JSON.parse(userAsString);

  // Fetch bookings on mount
  useEffect(() => {
    fetchBookings();
  }, []);

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

  const handleDeleteBooking = async (bookingId: string, serviceName: string, dateTime: string) => {
    setBookingToDelete({ id: bookingId, serviceName, dateTime });
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
          description: `Your ${bookingToDelete.serviceName} appointment has been cancelled successfully.`,
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
        description: "Please check your connection and try again.",
        icon: <X className="w-4 h-4" />,
        duration: 5000
      });
    } finally {
      setDeletingId(null);
      setBookingToDelete(null);
    }
  };

  const handleCopyReferralCode = async () => {
    if (!user.referralCode) return;
    
    try {
      await navigator.clipboard.writeText(user.referralCode);
      setCopiedCode(true);
      toast.success("Referral code copied!", {
        description: "Share this code with friends to refer them to HoodHub.",
        icon: <CheckCircle className="w-4 h-4" />
      });
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (error) {
      console.error("Error copying referral code:", error);
      toast.error("Failed to copy code", {
        description: "Please try selecting and copying the code manually.",
        icon: <X className="w-4 h-4" />
      });
    }
  };

  const formatDate = (date: Date) => {
    // Use local timezone instead of UTC to avoid date shifting
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const isBookedDate = (date: Date) => {
    if (!bookings) return false;
    const dateStr = formatDate(date);
    return bookings.all.some(booking => {
      const bookingDate = new Date(booking.dateTime);
      return formatDate(bookingDate) === dateStr;
    });
  };

  const getBookingsForDate = (date: Date) => {
    if (!bookings) return [];
    const dateStr = formatDate(date);
    return bookings.all.filter(booking => {
      const bookingDate = new Date(booking.dateTime);
      return formatDate(bookingDate) === dateStr;
    });
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

  const displayedBookings = activeTab === "upcoming" ? bookings?.upcoming : bookings?.past;

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
                {dictionary.bookings.hero.title} {" "}
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                  {dictionary.bookings.hero.titleHighlight}
                </span>
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative rounded-t-4xl bg-white py-16 lg:py-20 -mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Side - Calendar */}
            <motion.div
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
                <h2 className="text-2xl font-franklin font-semibold mb-6">
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
                    const hasBooking = isBookedDate(date);
                    const bookingsOnDate = getBookingsForDate(date);
                    const isCurrent = isCurrentMonth(date);
                    const todayDate = isToday(date);

                    return (
                      <div
                        key={index}
                        className={`
                          relative h-12 w-full rounded-lg text-sm font-franklin 
                          ${!isCurrent ? 'text-gray-400' : 'text-gray-900'}
                          ${todayDate ? 'bg-blue-100 text-blue-600 font-medium' : ''}
                          ${hasBooking ? 'bg-yellow-100' : ''}
                        `}
                      >
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span>{date.getDate()}</span>
                          {hasBooking && (
                            <div className="flex gap-0.5 mt-1">
                              {bookingsOnDate.slice(0, 3).map((booking, i) => (
                                <div
                                  key={i}
                                  className="w-1 h-1 bg-yellow-500 rounded-full"
                                  title={`${booking.service.name} at ${new Date(booking.dateTime).toLocaleTimeString()}`}
                                />
                              ))}
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
                  <div>
                    <h3 className="text-xl font-franklin font-semibold text-gray-900">
                      {user.firstName} {user.lastName}
                    </h3>
                    <p className="text-gray-600 font-franklin">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* Referral Code Section */}
              {user.referralCode && (
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-6 border border-green-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Gift className="w-5 h-5 text-green-600" />
                    <h3 className="text-lg font-franklin font-semibold text-gray-900">
                      Your Referral Code
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-white text-gray-900 font-mono text-base px-3 py-2 border border-gray-200">
                      {user.referralCode}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyReferralCode}
                      className="flex items-center gap-2"
                    >
                      {copiedCode ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      {copiedCode ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                  
                  <p className="text-sm text-gray-600 font-franklin mt-3">
                    Share this code with friends to refer them to HoodHub and earn rewards!
                  </p>
                </div>
              )}

              {/* Tabs */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setActiveTab("upcoming")}
                  className={`flex-1 py-3 px-4 rounded-lg font-franklin font-medium transition-all ${
                    activeTab === "upcoming"
                      ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {dictionary.bookings.tabs.upcoming} ({bookings?.upcoming.length || 0})
                </button>
                <button
                  onClick={() => setActiveTab("past")}
                  className={`flex-1 py-3 px-4 rounded-lg font-franklin font-medium transition-all ${
                    activeTab === "past"
                      ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {dictionary.bookings.tabs.past} ({bookings?.past.length || 0})
                </button>
              </div>

              {/* Bookings List */}
              <div className="space-y-4">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
                  </div>
                ) : displayedBookings && displayedBookings.length > 0 ? (
                  displayedBookings.map((booking) => {
                    const bookingDate = new Date(booking.dateTime);
                    const isDeleting = deletingId === booking.id;

                    return (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                  <Scissors className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="font-franklin font-semibold text-gray-900">
                                  {booking.service.name}
                                </h4>
                              </div>
                            </div>
                            
                            <div className="space-y-2 mt-4">
                              <div className="flex items-center gap-2 text-gray-600">
                                <CalendarIcon className="w-4 h-4" />
                                <span className="font-franklin">
                                  {bookingDate.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </span>
                              </div>
                              
                              <div className="flex items-center gap-2 text-gray-600">
                                <Clock className="w-4 h-4" />
                                <span className="font-franklin">
                                  {bookingDate.toLocaleTimeString(lang === 'ru' ? 'ru-RU' : 'en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Delete Button - Only for upcoming bookings */}
                          {!booking.isPast && (
                            <Button
                              onClick={() => handleDeleteBooking(booking.id, booking.service.name, booking.dateTime)}
                              disabled={isDeleting}
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            >
                              {isDeleting ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </Button>
                          )}
                        </div>

                        {/* Status Badge */}
                        <div className="mt-4">
                          {booking.isPast ? (
                            <span className="inline-flex items-center gap-1 text-sm text-gray-500 font-franklin">
                              <CheckCircle className="w-4 h-4" />
                              {dictionary.bookings.status.completed}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-sm text-green-600 font-franklin">
                              <AlertCircle className="w-4 h-4" />
                              {dictionary.bookings.status.confirmed}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CalendarIcon className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-franklin font-semibold text-gray-900 mb-2">
                      {activeTab === "upcoming" ? dictionary.bookings.empty.noUpcoming : dictionary.bookings.empty.noPast}
                    </h3>
                    <p className="text-gray-600 font-franklin mb-6">
                      {activeTab === "upcoming" 
                        ? dictionary.bookings.empty.noUpcomingDescription
                        : dictionary.bookings.empty.noPastDescription
                      }
                    </p>
                    {activeTab === "upcoming" && (
                      <Button
                        onClick={() => window.location.href = `/${lang}/book`}
                        className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-franklin"
                      >
                        <Link href={`/${lang}/book`}>
                          {dictionary.bookings.empty.bookNewButton}
                        </Link>
                      </Button>
                    )}
                  </div>
                )}
              </div>

              {/* Book New Button */}
              {displayedBookings && displayedBookings.length > 0 && activeTab === "upcoming" && (
                <div className="mt-8">
                  <Button
                    onClick={() => window.location.href = `/${lang}/book`}
                    className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-franklin font-semibold py-4 text-lg hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Link href={`/${lang}/book`}>
                      {dictionary.bookings.empty.bookNewButton}
                    </Link>
                  </Button>
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
            <DialogTitle className="flex items-center gap-2 font-franklin">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              {dictionary.bookings.confirmDialog.title}
            </DialogTitle>
            <DialogDescription className="font-franklin">
              {bookingToDelete && (
                <>
                  {dictionary.bookings.confirmDialog.description
                    .replace("{serviceName}", bookingToDelete.serviceName)
                    .replace("{date}", new Date(bookingToDelete.dateTime).toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long', 
                      day: 'numeric'
                    }))
                    .replace("{time}", new Date(bookingToDelete.dateTime).toLocaleTimeString(lang === 'ru' ? 'ru-RU' : 'en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    }))}
                  <br />
                  <br />
                  {dictionary.bookings.confirmDialog.warning}
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setConfirmDialogOpen(false)}
              className="font-franklin"
            >
              {dictionary.bookings.confirmDialog.keepButton}
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDeleteBooking}
              className="font-franklin"
              disabled={deletingId === bookingToDelete?.id}
            >
              {deletingId === bookingToDelete?.id ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  {dictionary.bookings.confirmDialog.cancelling}
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  {dictionary.bookings.confirmDialog.confirmButton}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingsPage;