// app/[lang]/(auth)/complete-profile/CompleteProfilePage.tsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { 
  Phone, 
  Loader2, 
  User,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useUser } from "@clerk/nextjs";
import type { Dictionary } from "../../dictionaries";

interface CompleteProfilePageProps {
  lang: string;
  dictionary: Dictionary;
}

export default function CompleteProfilePage({ lang, dictionary }: CompleteProfilePageProps) {
  const [phoneNumber, setPhoneNumber] = useState("+7");
  const [consentChecked, setConsentChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  // Phone number validation
  const validatePhoneNumber = (phone: string): boolean => {
    // Must start with + and have at least 10 digits total
    if (!phone.startsWith('+')) return false;
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 15;
  };

  // Format phone number as user types
  const formatPhoneNumber = (value: string): string => {
    // Always ensure it starts with +
    if (!value.startsWith('+')) {
      value = '+' + value.replace(/^\+*/, '');
    }
    
    // Remove all non-digit characters except the leading +
    const cleaned = value.slice(1).replace(/\D/g, '');
    
    // Limit to 15 digits after the +
    if (cleaned.length > 15) {
      return phoneNumber;
    }

    // Return simple format: + followed by digits
    return '+' + cleaned;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber.trim() || phoneNumber === '+') {
      toast.error(dictionary.completeProfile?.errors?.phoneRequired || "Please enter your phone number");
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      toast.error(dictionary.completeProfile?.errors?.phoneInvalid || "Please enter a valid phone number");
      return;
    }

    if (!consentChecked) {
      toast.error(dictionary.completeProfile?.errors?.consentRequired || "Please agree to data processing");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/user/complete-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber, // Send as-is (already clean format)
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(dictionary.completeProfile?.success || "Profile completed successfully!");
        // Redirect to main app after a brief delay
        setTimeout(() => {
          router.push(`/${lang}`);
        }, 1000);
      } else {
        toast.error(data.error || dictionary.completeProfile?.errors?.updateFailed || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(dictionary.completeProfile?.errors?.updateFailed || "Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md p-8"
    >
      <div>
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            {user?.imageUrl ? (
              <img 
                src={user.imageUrl} 
                alt={user.firstName || 'User'}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-10 h-10 text-black" />
            )}
          </motion.div>
          
          <h1 className="text-2xl font-franklin font-bold text-gray-900 mb-2">
            {dictionary.completeProfile?.title || "Complete Your Profile"}
          </h1>
          <p className="text-gray-600 font-franklin">
            {dictionary.completeProfile?.description?.replace('{name}', user?.firstName || '') || `Hi ${user?.firstName}! We need your phone number to complete your booking experience.`}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="phone" 
              className="block text-sm font-franklin font-medium text-gray-700 mb-2"
            >
              {dictionary.completeProfile?.phoneLabel || "Phone Number"}
            </label>
            
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder={dictionary.completeProfile?.phonePlaceholder || "+7 123 456 7890"}
                className="w-full h-12 pl-10 font-franklin text-lg border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:ring-0"
                required
              />
            </div>
            
            <p className="text-xs text-gray-500 mt-1 font-franklin">
              {dictionary.completeProfile?.phoneHelp || "We'll use this to send you booking confirmations and updates"}
            </p>
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-start space-x-3">
            <Checkbox
              id="consent"
              checked={consentChecked}
              onCheckedChange={setConsentChecked as any}
              className="mt-1"
            />
            <label
              htmlFor="consent"
              className="text-sm font-franklin text-gray-700 leading-relaxed cursor-pointer"
            >
              {dictionary.completeProfile?.consentText || "I agree to the processing of my personal data for booking management and service communication purposes"}
            </label>
          </div>

          <Button
            type="submit"
            disabled={loading || phoneNumber.trim() === '+' || !consentChecked}
            className="w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-franklin font-semibold text-lg rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                {dictionary.completeProfile?.submitting || "Completing Profile..."}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {dictionary.completeProfile?.submit || "Complete Profile"}
                <ArrowRight className="w-5 h-5" />
              </div>
            )}
          </Button>
        </form>
      </div>
    </motion.div>
  );
}