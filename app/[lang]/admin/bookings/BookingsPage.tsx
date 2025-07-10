"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";
import { 
  Users as UsersIcon,
  Calendar,
  Mail,
  Search,
  Clock,
  User,
  CheckCircle,
  XCircle,
  Loader2,
  Eye,
  Trash2,
  MoreHorizontal,
  AlertTriangle,
  Gift,
  Badge as BadgeIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Dictionary } from "../../dictionaries";

interface Booking {
  _id: string;
  userId: string;
  clerkId: string;
  service: {
    id: string;
    name: string;
    category?: string;
  };
  dateTime: string;
  createdAt: string;
  referral?: {
    referralCode: string;
    referralUserEmail: string;
    referralUserName: string;
    referralUserId: string;
  };
  user?: {
    firstName: string;
    lastName: string;
    email: string;
    profilePicture?: string;
  };
}

interface BookingsPageProps {
  lang: string;
  dictionary: Dictionary;
}

export default function BookingsPage({ lang, dictionary }: BookingsPageProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);
  const [cancellingBooking, setCancellingBooking] = useState(false);
  const [activeTab, setActiveTab] = useState("bookings");
  const [filterStatus, setFilterStatus] = useState("all");

  // Admin tabs configuration  
  const adminTabs = [
    {
      id: "users",
      label: dictionary.admin?.tabs?.users || "Users",
      icon: UsersIcon,
      href: `/${lang}/admin/users`,
      current: activeTab === "users"
    },
    {
      id: "bookings", 
      label: dictionary.admin?.tabs?.bookings || "Bookings",
      icon: Calendar,
      href: `/${lang}/admin/bookings`,
      current: activeTab === "bookings"
    },
    {
      id: "emails",
      label: dictionary.admin?.tabs?.emails || "Send Emails",
      icon: Mail,
      href: `/${lang}/admin/send-emails`,
      current: activeTab === "emails"
    }
  ];

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/bookings');
      const data = await response.json();
      
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.error || "Failed to fetch bookings");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowBookingDetails(true);
  };

  const handleCancelClick = (booking: Booking) => {
    setBookingToCancel(booking);
    setShowCancelConfirm(true);
  };

  const handleCancelConfirm = async () => {
    if (!bookingToCancel) return;

    try {
      setCancellingBooking(true);
      
      const response = await fetch(`/api/admin/bookings?id=${bookingToCancel._id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        // Remove the cancelled booking from the list
        setBookings(bookings.filter(b => b._id !== bookingToCancel._id));
        toast.success("Booking cancelled successfully");
        setShowCancelConfirm(false);
        setBookingToCancel(null);
      } else {
        toast.error(data.error || "Failed to cancel booking");
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("Failed to cancel booking");
    } finally {
      setCancellingBooking(false);
    }
  };

  const isUpcoming = (dateTime: string) => {
    const bookingDate = new Date(dateTime); // UTC stored date from database
    const now = new Date(); // Current local time
    
    // Compare using UTC timestamps to ensure accuracy
    return new Date(bookingDate) > now;
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.user?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.user?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.referral?.referralCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.referral?.referralUserEmail?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = 
      filterStatus === "all" ||
      (filterStatus === "upcoming" && isUpcoming(booking.dateTime)) ||
      (filterStatus === "past" && !isUpcoming(booking.dateTime)) ||
      (filterStatus === "referred" && booking.referral);

    return matchesSearch && matchesFilter;
  });

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', {
        year: 'numeric',
        month: 'short', 
        day: 'numeric'
      }),
      time: date.toLocaleTimeString(lang === 'ru' ? 'ru-RU' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  const upcomingBookings = bookings.filter(booking => isUpcoming(booking.dateTime));
  const pastBookings = bookings.filter(booking => !isUpcoming(booking.dateTime));
  const referredBookings = bookings.filter(booking => booking.referral);

  return (
    <div className="space-y-6">
      {/* Admin Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {adminTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={`group inline-flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                  tab.current
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon
                  className={`-ml-0.5 mr-2 h-5 w-5 ${
                    tab.current
                      ? 'text-yellow-500'
                      : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bookings Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {dictionary.admin?.bookings?.title || "Booking Management"}
          </h2>
          <p className="text-sm text-gray-600">
            {dictionary.admin?.bookings?.subtitle || "Manage and view all appointments"}
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder={dictionary.admin?.bookings?.searchPlaceholder || "Search bookings, customers, or referral codes..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </div>
        
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{dictionary.admin?.filters?.all || "All Bookings"}</SelectItem>
            <SelectItem value="upcoming">{dictionary.admin?.filters?.upcoming || "Upcoming"}</SelectItem>
            <SelectItem value="past">{dictionary.admin?.filters?.past || "Past"}</SelectItem>
            <SelectItem value="referred">Referred Bookings</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Booking Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {dictionary.admin?.stats?.totalBookings || "Total Bookings"}
              </p>
              <p className="text-2xl font-semibold text-gray-900">{bookings.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {dictionary.admin?.stats?.upcomingBookings || "Upcoming"}
              </p>
              <p className="text-2xl font-semibold text-gray-900">{upcomingBookings.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-gray-100 rounded-lg">
              <XCircle className="w-6 h-6 text-gray-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {dictionary.admin?.stats?.pastBookings || "Past"}
              </p>
              <p className="text-2xl font-semibold text-gray-900">{pastBookings.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Gift className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Referred Bookings
              </p>
              <p className="text-2xl font-semibold text-gray-900">{referredBookings.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
            <span className="ml-2 text-gray-500">
              {dictionary.admin?.loading || "Loading..."}
            </span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {dictionary.admin?.bookings?.table?.customer || "Customer"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {dictionary.admin?.bookings?.table?.service || "Service"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {dictionary.admin?.bookings?.table?.datetime || "Date & Time"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Referral
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {dictionary.admin?.bookings?.table?.status || "Status"}
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => {
                  const { date, time } = formatDateTime(booking.dateTime);
                  const upcoming = isUpcoming(booking.dateTime);
                  
                  return (
                    <motion.tr
                      key={booking._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleBookingClick(booking)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {booking.user?.profilePicture ? (
                              <img 
                                className="h-10 w-10 rounded-full object-cover" 
                                src={booking.user.profilePicture} 
                                alt={`${booking.user.firstName} ${booking.user.lastName}`}
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                <User className="w-5 h-5 text-gray-600" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {booking.user?.firstName} {booking.user?.lastName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.user?.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {booking.service.name}
                        </div>
                        {booking.service.category && (
                          <div className="text-xs text-gray-500">
                            {booking.service.category}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{date}</div>
                        <div className="text-sm text-gray-500">{time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {booking.referral ? (
                          <div className="space-y-1">
                            <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                              <Gift className="w-3 h-3 mr-1" />
                              {booking.referral.referralCode}
                            </Badge>
                            <div className="text-xs text-gray-500">
                              by {booking.referral.referralUserEmail}
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">No referral</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          upcoming 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {upcoming 
                            ? (dictionary.admin?.status?.upcoming || "Upcoming")
                            : (dictionary.admin?.status?.completed || "Past")
                          }
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              handleBookingClick(booking);
                            }}>
                              <Eye className="mr-2 h-4 w-4" />
                              {dictionary.admin?.actions?.view || "View"}
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleCancelClick(booking)
                              }}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              {dictionary.admin?.actions?.cancel || "Cancel"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      <Dialog open={showBookingDetails} onOpenChange={setShowBookingDetails}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {dictionary.admin?.bookings?.bookingDetails || "Booking Details"}
            </DialogTitle>
            <DialogDescription>
              {dictionary.admin?.bookings?.bookingDetailsDescription || "View detailed information about this booking"}
            </DialogDescription>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="space-y-6">
              <div className="grid gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    {dictionary.admin?.bookings?.customer || "Customer"}
                  </h4>
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {selectedBooking.user?.profilePicture ? (
                        <img 
                          className="h-12 w-12 rounded-full object-cover" 
                          src={selectedBooking.user.profilePicture} 
                          alt={`${selectedBooking.user.firstName} ${selectedBooking.user.lastName}`}
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
                          <User className="w-6 h-6 text-gray-600" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedBooking.user?.firstName} {selectedBooking.user?.lastName}
                      </p>
                      <p className="text-sm text-gray-500">{selectedBooking.user?.email}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    {dictionary.admin?.bookings?.appointment || "Appointment"}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      {formatDateTime(selectedBooking.dateTime).date}
                    </div>
                    <div className="flex items-center text-sm text-gray-900">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      {formatDateTime(selectedBooking.dateTime).time}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  {dictionary.admin?.bookings?.service || "Service"}
                </h4>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">{selectedBooking.service.name}</p>
                  {selectedBooking.service.category && (
                    <p className="text-xs text-gray-500 mt-1">{selectedBooking.service.category}</p>
                  )}
                </div>
              </div>

              {/* Referral Information */}
              {selectedBooking.referral && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    <Gift className="w-4 h-4 inline mr-1" />
                    Referral Information
                  </h4>
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Referral Code</label>
                        <div className="mt-1">
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {selectedBooking.referral.referralCode}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Referred By</label>
                        <p className="text-sm text-gray-900 mt-1">{selectedBooking.referral.referralUserName}</p>
                        <p className="text-xs text-gray-600">{selectedBooking.referral.referralUserEmail}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    {dictionary.admin?.bookings?.status || "Status"}
                  </h4>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    isUpcoming(selectedBooking.dateTime)
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {isUpcoming(selectedBooking.dateTime)
                      ? (dictionary.admin?.status?.upcoming || "Upcoming")
                      : (dictionary.admin?.status?.completed || "Past")
                    }
                  </span>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    {dictionary.admin?.bookings?.bookedOn || "Booked On"}
                  </h4>
                  <p className="text-sm text-gray-900">
                    {formatDateTime(selectedBooking.createdAt).date}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBookingDetails(false)}>
              {dictionary.admin?.actions?.close || "Close"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={showCancelConfirm} onOpenChange={setShowCancelConfirm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
              {dictionary.admin?.bookings?.cancelConfirm?.title || "Cancel Booking"}
            </DialogTitle>
            <DialogDescription>
              {dictionary.admin?.bookings?.cancelConfirm?.description || "Are you sure you want to cancel this booking? This action cannot be undone."}
            </DialogDescription>
          </DialogHeader>
          
          {bookingToCancel && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm">
                <p className="font-medium text-gray-900">
                  {bookingToCancel.user?.firstName} {bookingToCancel.user?.lastName}
                </p>
                <p className="text-gray-600">{bookingToCancel.service.name}</p>
                <p className="text-gray-500">
                  {formatDateTime(bookingToCancel.dateTime).date} at {formatDateTime(bookingToCancel.dateTime).time}
                </p>
                {bookingToCancel.referral && (
                  <p className="text-green-600 text-xs mt-1">
                    Referred by: {bookingToCancel.referral.referralUserEmail}
                  </p>
                )}
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowCancelConfirm(false);
                setBookingToCancel(null);
              }}
              disabled={cancellingBooking}
            >
              {dictionary.admin?.actions?.close || "Close"}
            </Button>
            <Button 
              variant="destructive"
              onClick={handleCancelConfirm}
              disabled={cancellingBooking}
              className="bg-red-600 hover:bg-red-700"
            >
              {cancellingBooking ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {dictionary.admin?.bookings?.cancelConfirm?.cancelling || "Cancelling..."}
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  {dictionary.admin?.bookings?.cancelConfirm?.confirm || "Cancel Booking"}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}