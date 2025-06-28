"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";
import { 
  Users as UsersIcon,
  Calendar,
  Mail,
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

interface EmailResult {
  email: string;
  name: string;
  success: boolean;
  error?: string;
}

interface SendEmailsPageProps {
  lang: string;
  dictionary: Dictionary;
}

export default function SendEmailsPage({ lang, dictionary }: SendEmailsPageProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [activeTab, setActiveTab] = useState("emails");
  
  // Email form state
  const [recipients, setRecipients] = useState<string[]>([]);
  const [sendToAll, setSendToAll] = useState(false);
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

  const handleSelectAll = () => {
    if (recipients.length === users.length) {
      setRecipients([]);
    } else {
      setRecipients(users.map(user => user.id));
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
    
    if (!sendToAll && recipients.length === 0) {
      toast.error(dictionary.admin?.emails?.errors?.recipientsRequired || "Please select recipients or choose to send to all users");
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
          subject: subject.trim(),
          message: message.trim(),
          sendToAll
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
        setSendToAll(false);
        
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
            {dictionary.admin?.emails?.subtitle || "Send custom emails to your users"}
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
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={sendToAll}
                      onChange={(e) => setSendToAll(e.target.checked)}
                      className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {dictionary.admin?.emails?.compose?.sendToAll || "Send to all users"} ({users.length})
                    </span>
                  </label>
                  
                  {!sendToAll && (
                    <div className="text-sm text-gray-600">
                      {dictionary.admin?.emails?.compose?.selectedUsers || "Selected users"}: {recipients.length}/{users.length}
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
                  disabled={sending || (!sendToAll && recipients.length === 0) || !subject.trim() || !message.trim()}
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

        {/* User Selection Panel */}
        <div className="space-y-6">
          {!sendToAll && (
            <div className="bg-white p-6 rounded-lg border border-gray-200">
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
                <div className="space-y-2 max-h-96 overflow-y-auto">
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
                  {dictionary.admin?.emails?.stats?.selectedUsers || "Selected"}
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {sendToAll ? users.length : recipients.length}
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
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {result.name}
                      </p>
                      <p className="text-xs text-gray-500">{result.email}</p>
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