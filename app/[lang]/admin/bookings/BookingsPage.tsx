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
  Badge as BadgeIcon,
  Phone,
  MailOpen,
  Package,
  MessageSquare,
  Scissors,
  PaintBucket,
  Diamond,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import Image from "next/image";

interface Service {
  id: string;
  name: string;
}

interface Booking {
  _id: string;
  userId: string;
  clerkId: string;
  services?: Service[];
  service?: Service;
  date: string;
  time: string;
  dateTime: string;
  formattedDate: string;
  formattedTime: string;
  createdAt: string;
  comment?: string;
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
    phoneNumber?: string;
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

  // Helper function to check if booking is upcoming based on date/time strings
  const isUpcoming = (dateString: string, timeString: string): boolean => {
    const [year, month, day] = dateString.split('-').map(Number);
    const [hours, minutes] = timeString.split(':').map(Number);
    
    // Create date for comparison (this will be in local timezone)
    const bookingDate = new Date(year, month - 1, day, hours, minutes);
    const now = new Date();
    
    return bookingDate > now;
  };

  // Helper function to format date string for display
  const formatDateString = (dateString: string): string => {
    const [year, month, day] = dateString.split('-');
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return `${monthNames[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
  };

  // Helper function to format time string for display
  const formatTimeString = (timeString: string): string => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

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
      id: "subscribers",
      label: dictionary.admin?.tabs?.subscribers || "Newsletter",
      icon: MailOpen,
      href: `/${lang}/admin/subscribers`,
      current: activeTab === "subscribers"
    },
    {
      id: "emails",
      label: dictionary.admin?.tabs?.emails || "Send Emails",
      icon: Mail,
      href: `/${lang}/admin/send-emails`,
      current: activeTab === "emails"
    }
  ];

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

  const filteredBookings = bookings.filter(booking => {
    const serviceNames = getServiceNames(booking);
    const matchesSearch = 
      booking.user?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.user?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.user?.phoneNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      serviceNames.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.referral?.referralCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.referral?.referralUserEmail?.toLowerCase().includes(searchTerm.toLowerCase());

    const upcoming = isUpcoming(booking.date, booking.time);
    const matchesFilter = 
      filterStatus === "all" ||
      (filterStatus === "upcoming" && upcoming) ||
      (filterStatus === "past" && !upcoming) ||
      (filterStatus === "referred" && booking.referral) ||
      (filterStatus === "multiple" && getServiceCount(booking) > 1);

    return matchesSearch && matchesFilter;
  });

  const upcomingBookings = bookings.filter(booking => isUpcoming(booking.date, booking.time));
  const pastBookings = bookings.filter(booking => !isUpcoming(booking.date, booking.time));
  const referredBookings = bookings.filter(booking => booking.referral);
  const multipleServiceBookings = bookings.filter(booking => getServiceCount(booking) > 1);

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
                      ? 'text-yellow-600'
                      : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {dictionary.admin?.bookings?.title || "Booking Management"}
          </h1>
          <p className="text-gray-600">
            {dictionary.admin?.bookings?.subtitle || "View and manage all appointments"}
          </p>
        </div>
        
        {/* Stats */}
        <div className="flex gap-4">
          <div className="border p-3 min-w-24 rounded-lg">
            <div className="text-2xl font-bold">{upcomingBookings.length}</div>
            <div className="text-xs">Upcoming</div>
          </div>
          <div className="border p-3 min-w-24 rounded-lg">
            <div className="text-2xl font-bold">{pastBookings.length}</div>
            <div className="text-xs">Past</div>
          </div>
          <div className="border p-3 min-w-24 rounded-lg">
            <div className="text-2xl font-bold">{referredBookings.length}</div>
            <div className="text-xs">Referred</div>
          </div>
          <div className="border p-3 min-w-24 rounded-lg">
            <div className="text-2xl font-bold">{multipleServiceBookings.length}</div>
            <div className="text-xs">Multi-Service</div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search bookings, customers, services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter bookings" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Bookings</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="past">Past</SelectItem>
            <SelectItem value="referred">Referred</SelectItem>
            <SelectItem value="multiple">Multiple Services</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Services
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-gray-400" />
                    <p className="text-gray-500 mt-2">Loading bookings...</p>
                  </td>
                </tr>
              ) : filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No bookings found</p>
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => {
                  const services = getServicesArray(booking);
                  const serviceNames = getServiceNames(booking);
                  const serviceCount = getServiceCount(booking);
                  const upcoming = isUpcoming(booking.date, booking.time);
                  
                  return (
                    <tr key={booking._id} className="hover:bg-gray-50">
                      {/* Customer */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {booking.user?.profilePicture ? (
                              <Image
                                width={40}
                                height={40}
                                className="h-10 w-10 rounded-full object-cover"
                                src={booking.user.profilePicture}
                                alt={`${booking.user.firstName} ${booking.user.lastName}`}
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                <User className="h-5 w-5 text-gray-500" />
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
                            {booking.user?.phoneNumber && (
                              <div className="text-xs text-gray-400 flex items-center mt-1">
                                <Phone className="w-3 h-3 mr-1" />
                                {booking.user.phoneNumber}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Services */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            {getServiceIcon(services[0]?.id || '')}
                            <div className="text-sm text-gray-900">
                              {serviceNames}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Date & Time */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDateString(booking.date)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatTimeString(booking.time)}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1">
                          <Badge className={upcoming ? "bg-blue-600" : ""} variant={upcoming ? "default" : "outline"}>
                            {upcoming ? "Upcoming" : "Past"}
                          </Badge>
                          {booking.referral && (
                            <Badge variant="outline" className="text-xs">
                              <Gift className="w-3 h-3 mr-1" />
                              Referred
                            </Badge>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleBookingClick(booking)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          
                          {upcoming && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCancelClick(booking)}
                              className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Dialog */}
      <Dialog open={showBookingDetails} onOpenChange={setShowBookingDetails}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="space-y-6">
              {/* Customer Info */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Customer Information</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                      {selectedBooking.user?.profilePicture ? (
                        <Image
                          width={48}
                          height={48}
                          src={selectedBooking.user.profilePicture}
                          alt="Profile"
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-6 h-6 text-gray-500" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {selectedBooking.user?.firstName} {selectedBooking.user?.lastName}
                      </div>
                      <div className="text-sm text-gray-600">{selectedBooking.user?.email}</div>
                      {selectedBooking.user?.phoneNumber && (
                        <div className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                          <Phone className="w-3 h-3" />
                          {selectedBooking.user.phoneNumber}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Service{getServiceCount(selectedBooking) > 1 ? 's' : ''} ({getServiceCount(selectedBooking)})
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {getServiceCount(selectedBooking) > 1 ? (
                    <div className="space-y-2">
                      {getServicesArray(selectedBooking).map((service, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-white rounded border">
                          {getServiceIcon(service.id)}
                          <span className="font-medium">{service.name}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {getServiceIcon(getServicesArray(selectedBooking)[0]?.id || '')}
                      <span className="font-medium">{getServiceNames(selectedBooking)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Date & Time */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Appointment Details</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      {formatDateString(selectedBooking.date)}
                    </div>
                    <div className="flex items-center text-sm text-gray-900">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      {formatTimeString(selectedBooking.time)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Comment */}
              {selectedBooking.comment && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Special Requests</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-900">{selectedBooking.comment}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Referral Information */}
              {selectedBooking.referral && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Referral Information</h4>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-green-700">Referral Code:</span>
                        <code className="bg-green-100 px-2 py-1 rounded text-green-800 font-mono">
                          {selectedBooking.referral.referralCode}
                        </code>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-green-700">Referred By:</span>
                        <span className="font-medium text-green-800">
                          {selectedBooking.referral.referralUserEmail}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Booking Metadata */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Booking Information</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Booking ID:</span>
                      <div className="font-mono text-gray-900">{selectedBooking._id}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Created:</span>
                      <div className="text-gray-900">
                        {formatDateString(selectedBooking.createdAt.split('T')[0])}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={showCancelConfirm} onOpenChange={setShowCancelConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Cancel Booking
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this booking? This action cannot be undone.
              {bookingToCancel && (
                <>
                  <br />
                  <span className="text-sm font-medium text-gray-900">
                    {bookingToCancel.user?.firstName} {bookingToCancel.user?.lastName}
                  </span>
                  <br />
                  <span className="text-sm text-gray-600">
                    {getServiceNames(bookingToCancel)}
                  </span>
                  <br />
                  <span className="text-sm text-gray-600">
                    {formatDateString(bookingToCancel.date)} at {formatTimeString(bookingToCancel.time)}
                  </span>
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelConfirm(false)}>
              Keep Booking
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleCancelConfirm}
              disabled={cancellingBooking}
            >
              {cancellingBooking ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Cancelling...
                </>
              ) : (
                "Cancel Booking"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}