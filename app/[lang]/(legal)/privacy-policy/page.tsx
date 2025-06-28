import type { Metadata } from "next";
import PrivacyPolicyPage from "./PrivacyPolicyPage";
import { getDictionary } from '../../dictionaries';

export const metadata: Metadata = {
  title: "Privacy Policy - HoodHub | Data Protection & Privacy",
  description: "Learn about HoodHub's privacy policy, including how we collect, use, and protect your personal information.",
  keywords: "privacy policy, data protection, personal information, GDPR, data security",
};

export default async function PrivacyPolicy({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as 'en' | 'ru');
  
  return <PrivacyPolicyPage lang={lang} dictionary={dictionary} />;
}