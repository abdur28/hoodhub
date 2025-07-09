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
  Loader2,
  Crown,
  User as UserIcon,
  RefreshCw,
  Eye,
  Gift,
  Copy,
  Check,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { Dictionary } from "../../dictionaries";

interface User {
  _id: string;
  clerkId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
  bookings?: any[];
  profilePicture?: string;
  referralCode?: string;
  referralCodeGeneratedAt?: string;
  referralCount?: number;
  referralBookings?: number;
}

interface UsersPageProps {
  lang: string;
  dictionary: Dictionary;
}

export default function UsersPage({ lang, dictionary }: UsersPageProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("users");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loadingUserDetails, setLoadingUserDetails] = useState(false);
  const [generatingReferral, setGeneratingReferral] = useState(false);
  const [updatingRole, setUpdatingRole] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

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
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/users');
      const data = await response.json();
      
      if (data.success) {
        setUsers(data.users);
      } else {
        toast.error(data.error || "Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserDetails = async (userId: string) => {
    try {
      setLoadingUserDetails(true);
      const response = await fetch(`/api/admin/users/referral?userId=${userId}`);
      const data = await response.json();
      
      if (data.success) {
        setSelectedUser(data.user);
      } else {
        toast.error(data.error || "Failed to fetch user details");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Failed to fetch user details");
    } finally {
      setLoadingUserDetails(false);
    }
  };

  const handleUserClick = async (user: User) => {
    setSelectedUser(user);
    setDialogOpen(true);
    await fetchUserDetails(user._id);
  };

  const handleRoleToggle = async () => {
    if (!selectedUser) return;
    
    const newRole = selectedUser.role === 'admin' ? 'user' : 'admin';
    
    try {
      setUpdatingRole(true);
      
      const response = await fetch('/api/admin/users/role', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: selectedUser._id,
          newRole: newRole
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Update the user in the local state
        setUsers(users.map(u => 
          u._id === selectedUser._id 
            ? { ...u, role: newRole }
            : u
        ));
        
        // Update selected user
        setSelectedUser({ ...selectedUser, role: newRole });
        
        toast.success(`User role updated to ${newRole}`);
      } else {
        toast.error(data.error || "Failed to update user role");
      }
    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error("Failed to update user role");
    } finally {
      setUpdatingRole(false);
    }
  };

  const handleGenerateReferralCode = async () => {
    if (!selectedUser) return;
    
    try {
      setGeneratingReferral(true);
      
      const response = await fetch('/api/admin/users/referral', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetUserId: selectedUser._id
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Update the selected user with the new referral code
        setSelectedUser({
          ...selectedUser,
          referralCode: data.referralCode,
          referralCodeGeneratedAt: new Date().toISOString()
        });
        
        // Update the user in the main list
        setUsers(users.map(u => 
          u._id === selectedUser._id 
            ? { ...u, referralCode: data.referralCode }
            : u
        ));
        
        toast.success("Referral code generated successfully!");
      } else {
        toast.error(data.error || "Failed to generate referral code");
      }
    } catch (error) {
      console.error("Error generating referral code:", error);
      toast.error("Failed to generate referral code");
    } finally {
      setGeneratingReferral(false);
    }
  };

  const handleCopyReferralCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(true);
      toast.success("Referral code copied to clipboard!");
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (error) {
      console.error("Error copying referral code:", error);
      toast.error("Failed to copy referral code");
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = 
      roleFilter === "all" ||
      (roleFilter === "admin" && user.role === "admin") ||
      (roleFilter === "users" && user.role !== "admin");
    
    return matchesSearch && matchesRole;
  });

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      
      return date.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

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

      {/* Users Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {dictionary.admin?.users?.title || "User Management"}
          </h2>
          <p className="text-sm text-gray-600">
            {dictionary.admin?.users?.subtitle || "Manage and view all registered users"}
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder={dictionary.admin?.users?.searchPlaceholder || "Search users..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </div>
        
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Users</SelectItem>
            <SelectItem value="users">Users Only</SelectItem>
            <SelectItem value="admin">Admins Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users Table */}
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
                    {dictionary.admin?.users?.table?.user || "User"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {dictionary.admin?.users?.table?.email || "Email"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {dictionary.admin?.users?.table?.role || "Role"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {dictionary.admin?.users?.table?.joinDate || "Join Date"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {dictionary.admin?.users?.table?.bookings || "Bookings"}
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {dictionary.admin?.users?.table?.actions || "Actions"}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <motion.tr
                    key={user._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleUserClick(user)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {user.profilePicture ? (
                            <img 
                              className="h-10 w-10 rounded-full object-cover" 
                              src={user.profilePicture} 
                              alt={`${user.firstName} ${user.lastName}`}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <span className="text-sm font-medium text-gray-700">
                                {user.firstName[0]}{user.lastName[0]}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {user.role === 'admin' ? (
                          <Crown className="w-4 h-4 text-yellow-500 mr-2" />
                        ) : (
                          <UserIcon className="w-4 h-4 text-gray-500 mr-2" />
                        )}
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.role === 'admin' 
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role === 'admin' ? 'Admin' : 'User'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.bookings || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUserClick(user);
                        }}
                        className="inline-flex items-center"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View Details
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* User Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              User Details
            </DialogTitle>
            <DialogDescription>
              View and manage user information
            </DialogDescription>
          </DialogHeader>
          
          {loadingUserDetails ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
              <span className="ml-2 text-gray-500">Loading user details...</span>
            </div>
          ) : selectedUser ? (
            <div className="space-y-6">
              {/* User Information */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">User Information</h4>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {selectedUser.profilePicture ? (
                      <img 
                        className="h-12 w-12 rounded-full object-cover" 
                        src={selectedUser.profilePicture} 
                        alt={`${selectedUser.firstName} ${selectedUser.lastName}`}
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
                        <UserIcon className="w-6 h-6 text-gray-600" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedUser.firstName} {selectedUser.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{selectedUser.email}</p>
                  </div>
                </div>
              </div>

              {/* Account Details */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Account Details</h4>
                <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Role:</span>
                    <div className="flex items-center">
                      {selectedUser.role === 'admin' ? (
                        <Crown className="w-4 h-4 text-yellow-500 mr-1" />
                      ) : (
                        <UserIcon className="w-4 h-4 text-gray-500 mr-1" />
                      )}
                      <span className="font-medium capitalize">{selectedUser.role}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Join Date:</span>
                    <span className="font-medium">{formatDate(selectedUser.createdAt)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Total Bookings:</span>
                    <span className="font-medium">{selectedUser.bookings || 0}</span>
                  </div>
                </div>
              </div>

              {/* Role Management */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Role Management</h4>
                <Button
                  variant="outline"
                  onClick={handleRoleToggle}
                  disabled={updatingRole}
                  className="w-full flex items-center justify-center"
                >
                  {updatingRole ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Updating Role...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Change to {selectedUser.role === 'admin' ? 'User' : 'Admin'}
                    </>
                  )}
                </Button>
              </div>

              {/* Referral Information */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Gift className="w-4 h-4 mr-1" />
                  Referral Information
                </h4>
                
                {selectedUser.referralCode ? (
                  <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Referral Code:</span>
                      <div className="flex items-center space-x-2">
                        <code className="bg-white px-2 py-1 rounded text-xs font-mono border">
                          {selectedUser.referralCode}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyReferralCode(selectedUser.referralCode!)}
                          className="h-6 w-6 p-0"
                        >
                          {copiedCode ? (
                            <Check className="w-3 h-3 text-green-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Generated On:</span>
                      <span className="font-medium">
                        {selectedUser.referralCodeGeneratedAt ? formatDate(selectedUser.referralCodeGeneratedAt) : 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">People Referred:</span>
                      <span className="font-medium">{selectedUser.referralCount || 0}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Referral Bookings:</span>
                      <span className="font-medium">{selectedUser.referralBookings || 0}</span>
                    </div>
                  </div>
                ) : (
                  <Button
                    onClick={handleGenerateReferralCode}
                    disabled={generatingReferral}
                    variant="outline"
                    className="w-full flex items-center justify-center"
                  >
                    {generatingReferral ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Gift className="w-4 h-4 mr-2" />
                        Generate Referral Code
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No user selected</p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}