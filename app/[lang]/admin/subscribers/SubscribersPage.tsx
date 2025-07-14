// app/[lang]/admin/subscribers/SubscribersPage.tsx
"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";
import { 
  Users as UsersIcon,
  Calendar,
  Mail,
  MailOpen,
  Search,
  Trash2,
  Download,
  Loader2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Dictionary } from "../../dictionaries";

interface Subscriber {
  _id: string;
  email: string;
  subscribedAt: string;
  status: string;
}

interface SubscribersPageProps {
  lang: string;
  dictionary: Dictionary;
}

export default function SubscribersPage({ lang, dictionary }: SubscribersPageProps) {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("subscribers");
  
  // Delete confirmation state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [subscriberToDelete, setSubscriberToDelete] = useState<Subscriber | null>(null);
  const [deleting, setDeleting] = useState(false);

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

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/subscribers');
      const data = await response.json();
      
      if (data.success) {
        setSubscribers(data.subscribers);
      } else {
        toast.error(data.error || "Failed to fetch subscribers");
      }
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      toast.error("Failed to fetch subscribers");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (subscriber: Subscriber) => {
    setSubscriberToDelete(subscriber);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (!subscriberToDelete) return;

    try {
      setDeleting(true);
      
      const response = await fetch(`/api/admin/subscribers?id=${subscriberToDelete._id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        // Remove the subscriber from the list
        setSubscribers(subscribers.filter(s => s._id !== subscriberToDelete._id));
        toast.success("Subscriber removed successfully");
        setShowDeleteConfirm(false);
        setSubscriberToDelete(null);
      } else {
        toast.error(data.error || "Failed to remove subscriber");
      }
    } catch (error) {
      console.error("Error removing subscriber:", error);
      toast.error("Failed to remove subscriber");
    } finally {
      setDeleting(false);
    }
  };

  const filteredSubscribers = subscribers.filter(subscriber =>
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {dictionary.admin?.subscribers?.title || "Newsletter Subscribers"}
          </h2>
          <p className="text-sm text-gray-600">
            {dictionary.admin?.subscribers?.subtitle || "Manage your newsletter subscribers"}
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder={dictionary.admin?.subscribers?.search?.placeholder || "Search subscribers..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            {dictionary.admin?.subscribers?.list?.title || "Subscribers"} ({filteredSubscribers.length})
          </h3>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
          </div>
        ) : filteredSubscribers.length === 0 ? (
          <div className="text-center py-12">
            <MailOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm 
                ? (dictionary.admin?.subscribers?.empty?.search || "No subscribers found")
                : (dictionary.admin?.subscribers?.empty?.noSubscribers || "No subscribers yet")
              }
            </h3>
            <p className="text-gray-600">
              {searchTerm 
                ? (dictionary.admin?.subscribers?.empty?.searchDesc || "Try adjusting your search terms")
                : (dictionary.admin?.subscribers?.empty?.noSubscribersDesc || "Newsletter subscribers will appear here")
              }
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {dictionary.admin?.subscribers?.table?.email || "Email"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {dictionary.admin?.subscribers?.table?.subscribed || "Subscribed"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {dictionary.admin?.subscribers?.table?.status || "Status"}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {dictionary.admin?.actions?.title || "Actions"}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSubscribers.map((subscriber) => (
                  <motion.tr
                    key={subscriber._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 text-gray-400 mr-3" />
                        <span className="text-sm font-medium text-gray-900">
                          {subscriber.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {formatDate(subscriber.subscribedAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        subscriber.status === 'active' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {subscriber.status === 'active' 
                          ? (dictionary.admin?.subscribers?.status?.active || "Active")
                          : (dictionary.admin?.subscribers?.status?.inactive || "Inactive")
                        }
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(subscriber)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              {dictionary.admin?.subscribers?.delete?.title || "Remove Subscriber"}
            </DialogTitle>
            <DialogDescription>
              {dictionary.admin?.subscribers?.delete?.description || "Are you sure you want to remove this subscriber? This action cannot be undone."}
              <br />
              <strong>{subscriberToDelete?.email}</strong>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(false)}
              disabled={deleting}
            >
              {dictionary.admin?.actions?.cancel || "Cancel"}
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {dictionary.admin?.actions?.removing || "Removing..."}
                </>
              ) : (
                dictionary.admin?.actions?.remove || "Remove"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}