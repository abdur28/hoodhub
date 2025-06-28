import type { Metadata } from "next";
import SendEmailsPage from "./SendEmailsPage";
import { getDictionary } from '../../dictionaries';

export const metadata: Metadata = {
  title: "Email Management - Admin | HoodHub", 
  description: "Send custom emails to users, manage email campaigns, and communicate with customers.",
  keywords: "admin, email, marketing, campaigns, communication, HoodHub",
};

export default async function SendEmails({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as 'en' | 'ru');

  return (
    <SendEmailsPage 
      lang={lang} 
      dictionary={dictionary}
    />
  );
}