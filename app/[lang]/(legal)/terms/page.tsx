import type { Metadata } from "next";
import TermsPage from "./TermsPage";
import { getDictionary } from '../../dictionaries';

export const metadata: Metadata = {
  title: "Terms of Service - HoodHub | Legal Terms & Conditions",
  description: "Read HoodHub's terms of service, including our policies for barbering, tattoo artistry, and lifestyle services.",
  keywords: "terms of service, legal, conditions, policies, barbering, tattoo, lifestyle services",
};

export default async function Terms({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as 'en' | 'ru');
  
  return <TermsPage lang={lang} dictionary={dictionary} />;
}