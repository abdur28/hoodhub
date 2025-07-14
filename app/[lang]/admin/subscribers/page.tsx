// app/[lang]/admin/subscribers/page.tsx
import type { Metadata } from "next";
import SubscribersPage from "./SubscribersPage";
import { getDictionary } from '../../dictionaries';

export const metadata: Metadata = {
  title: "Newsletter Subscribers - Admin | HoodHub", 
  description: "Manage newsletter subscribers, view subscription stats, and export subscriber data.",
  keywords: "admin, newsletter, subscribers, email, marketing, HoodHub",
};

export default async function Subscribers({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as 'en' | 'ru');

  return (
    <SubscribersPage 
      lang={lang} 
      dictionary={dictionary}
    />
  );
}