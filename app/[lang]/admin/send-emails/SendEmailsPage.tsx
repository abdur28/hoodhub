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
  Send,
  Users,
  UserCheck,
  Loader2,
  CheckCircle,
  XCircle,
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

interface User {
  id: string;
  name: string;
  email: string;
  joinedDate: string;
}

interface Subscriber {
  id: string;
  name: string;
  email: string;
  joinedDate: string;
}

interface EmailResult {
  email: string;
  name: string;
  type: string;
  success: boolean;
  error?: string;
}

interface SendEmailsPageProps {
  lang: string;
  dictionary: Dictionary;
}

export default function SendEmailsPage({ lang, dictionary }: SendEmailsPageProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [activeTab, setActiveTab] = useState("emails");
  
  // Email form state
  const [recipients, setRecipients] = useState<string[]>([]);
  const [subscriberRecipients, setSubscriberRecipients] = useState<string[]>([]);
  const [sendToAll, setSendToAll] = useState(false);
  const [sendToAllSubscribers, setSendToAllSubscribers] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  
  // Results state
  const [showResults, setShowResults] = useState(false);
  const [emailResults, setEmailResults] = useState<EmailResult[]>([]);
  const [successCount, setSuccessCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

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
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/send-email');
      const data = await response.json();
      
      if (data.success) {
        setUsers(data.users);
        setSubscribers(data.subscribers || []);
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

  const handleUserSelection = (userId: string) => {
    if (recipients.includes(userId)) {
      setRecipients(recipients.filter(id => id !== userId));
    } else {
      setRecipients([...recipients, userId]);
    }
  };

  const handleSubscriberSelection = (subscriberId: string) => {
    if (subscriberRecipients.includes(subscriberId)) {
      setSubscriberRecipients(subscriberRecipients.filter(id => id !== subscriberId));
    } else {
      setSubscriberRecipients([...subscriberRecipients, subscriberId]);
    }
  };

  const handleSelectAll = () => {
    if (recipients.length === users.length) {
      setRecipients([]);
    } else {
      setRecipients(users.map(user => user.id));
    }
  };

  const handleSelectAllSubscribers = () => {
    if (subscriberRecipients.length === subscribers.length) {
      setSubscriberRecipients([]);
    } else {
      setSubscriberRecipients(subscribers.map(subscriber => subscriber.id));
    }
  };

  const handleSendEmail = async () => {
    // Validation
    if (!subject.trim()) {
      toast.error(dictionary.admin?.emails?.errors?.subjectRequired || "Subject is required");
      return;
    }
    
    if (!message.trim()) {
      toast.error(dictionary.admin?.emails?.errors?.messageRequired || "Message is required");
      return;
    }
    
    if (!sendToAll && !sendToAllSubscribers && recipients.length === 0 && subscriberRecipients.length === 0) {
      toast.error(dictionary.admin?.emails?.errors?.recipientsRequired || "Please select recipients or choose to send to all users/subscribers");
      return;
    }

    try {
      setSending(true);
      
      const response = await fetch('/api/admin/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipients: sendToAll ? null : recipients,
          subscriberRecipients: sendToAllSubscribers ? null : subscriberRecipients,
          subject: subject.trim(),
          message: message.trim(),
          sendToAll,
          sendToAllSubscribers
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setEmailResults(data.results.details);
        setSuccessCount(data.results.successCount);
        setTotalCount(data.results.totalCount);
        setShowResults(true);
        
        // Reset form
        setSubject("");
        setMessage("");
        setRecipients([]);
        setSubscriberRecipients([]);
        setSendToAll(false);
        setSendToAllSubscribers(false);
        
        toast.success(data.message);
      } else {
        toast.error(data.error || "Failed to send emails");
      }
    } catch (error) {
      console.error("Error sending emails:", error);
      toast.error("Failed to send emails");
    } finally {
      setSending(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
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

      {/* Email Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {dictionary.admin?.emails?.title || "Email Management"}
          </h2>
          <p className="text-sm text-gray-600">
            {dictionary.admin?.emails?.subtitle || "Send custom emails to your users and subscribers"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Email Composer */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {dictionary.admin?.emails?.compose?.title || "Compose Email"}
            </h3>
            
            <div className="space-y-4">
              {/* Recipients Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {dictionary.admin?.emails?.compose?.recipients || "Recipients"}
                </label>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={sendToAll}
                        onChange={(e) => setSendToAll(e.target.checked)}
                        className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {dictionary.admin?.emails?.compose?.sendToAllUsers || "Send to all users"} ({users.length})
                      </span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={sendToAllSubscribers}
                        onChange={(e) => setSendToAllSubscribers(e.target.checked)}
                        className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {dictionary.admin?.emails?.compose?.sendToAllSubscribers || "Send to all newsletter subscribers"} ({subscribers.length})
                      </span>
                    </label>
                  </div>
                  
                  {(!sendToAll || !sendToAllSubscribers) && (
                    <div className="text-sm text-gray-600">
                      {dictionary.admin?.emails?.compose?.selectedCount || "Selected"}: {recipients.length + subscriberRecipients.length} total
                      ({recipients.length} users, {subscriberRecipients.length} subscribers)
                    </div>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {dictionary.admin?.emails?.compose?.subject || "Subject"}
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={dictionary.admin?.emails?.compose?.subjectPlaceholder || "Enter email subject..."}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {dictionary.admin?.emails?.compose?.message || "Message"}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={dictionary.admin?.emails?.compose?.messagePlaceholder || "Enter your message..."}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>

              {/* Send Button */}
              <div className="flex justify-end">
                <Button
                  onClick={handleSendEmail}
                  disabled={sending || (!sendToAll && !sendToAllSubscribers && recipients.length === 0 && subscriberRecipients.length === 0) || !subject.trim() || !message.trim()}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white"
                >
                  {sending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {dictionary.admin?.emails?.compose?.sending || "Sending..."}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      {dictionary.admin?.emails?.compose?.send || "Send Email"}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* User and Subscriber Selection Panel */}
        <div className="space-y-6">
          {(!sendToAll || !sendToAllSubscribers) && (
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="space-y-6">
                
                {/* Users Section */}
                {!sendToAll && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {dictionary.admin?.emails?.users?.title || "Select Users"}
                      </h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSelectAll}
                      >
                        {recipients.length === users.length 
                          ? (dictionary.admin?.emails?.users?.deselectAll || "Deselect All")
                          : (dictionary.admin?.emails?.users?.selectAll || "Select All")
                        }
                      </Button>
                    </div>
                    
                    {loading ? (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {users.map((user) => (
                          <label
                            key={user.id}
                            className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={recipients.includes(user.id)}
                              onChange={() => handleUserSelection(user.id)}
                              className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                            />
                            <div className="ml-3 flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {user.name}
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                {user.email}
                              </p>
                            </div>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Subscribers Section */}
                {!sendToAllSubscribers && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {dictionary.admin?.emails?.subscribers?.title || "Select Subscribers"}
                      </h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSelectAllSubscribers}
                      >
                        {subscriberRecipients.length === subscribers.length 
                          ? (dictionary.admin?.emails?.subscribers?.deselectAll || "Deselect All")
                          : (dictionary.admin?.emails?.subscribers?.selectAll || "Select All")
                        }
                      </Button>
                    </div>
                    
                    {loading ? (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {subscribers.map((subscriber) => (
                          <label
                            key={subscriber.id}
                            className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={subscriberRecipients.includes(subscriber.id)}
                              onChange={() => handleSubscriberSelection(subscriber.id)}
                              className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                            />
                            <div className="ml-3 flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {subscriber.email}
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                Newsletter subscriber
                              </p>
                            </div>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Email Stats */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {dictionary.admin?.emails?.stats?.title || "Email Statistics"}
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {dictionary.admin?.emails?.stats?.totalUsers || "Total Users"}
                </span>
                <span className="text-sm font-medium text-gray-900">{users.length}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {dictionary.admin?.emails?.stats?.totalSubscribers || "Total Subscribers"}
                </span>
                <span className="text-sm font-medium text-gray-900">{subscribers.length}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {dictionary.admin?.emails?.stats?.selectedUsers || "Selected"}
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {sendToAll && sendToAllSubscribers 
                    ? users.length + subscribers.length 
                    : (sendToAll ? users.length : recipients.length) + (sendToAllSubscribers ? subscribers.length : subscriberRecipients.length)
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Results Modal */}
      <Dialog open={showResults} onOpenChange={setShowResults}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {dictionary.admin?.emails?.results?.title || "Email Campaign Results"}
            </DialogTitle>
            <DialogDescription>
              {dictionary.admin?.emails?.results?.description || "Summary of email delivery results"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Success Summary */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-sm font-medium">
                  {dictionary.admin?.emails?.results?.successful || "Successful"}: {successCount}/{totalCount}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {Math.round((successCount / totalCount) * 100)}% {dictionary.admin?.emails?.results?.successRate || "success rate"}
              </div>
            </div>

            {/* Detailed Results */}
            <div className="max-h-64 overflow-y-auto space-y-2">
              {emailResults.map((result, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    result.success ? 'bg-green-50' : 'bg-red-50'
                  }`}
                >
                  <div className="flex items-center">
                    {result.success ? (
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500 mr-2" />
                    )}
                    <div className="flex items-center">
                      {result.type === 'subscriber' && (
                        <MailOpen className="w-3 h-3 text-blue-500 mr-1" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {result.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {result.email} • {result.type === 'user' ? 'User' : 'Subscriber'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <span className={`text-xs font-medium ${
                    result.success ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {result.success 
                      ? (dictionary.admin?.emails?.results?.sent || "Sent")
                      : (dictionary.admin?.emails?.results?.failed || "Failed")
                    }
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setShowResults(false)}>
              {dictionary.admin?.actions?.close || "Close"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}