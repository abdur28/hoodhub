// app/[lang]/(auth)/complete-profile/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getUser } from "@/lib/data";
import CompleteProfilePage from "./CompleteProfilePage";
import { getDictionary } from '../../dictionaries';

export default async function Page({
  params
}:  any) {
  const { lang } = await params;
  // Check if user is authenticated
  const { userId } = await auth();
  
  if (!userId) {
    redirect(`/${lang}/sign-in`);
  }

  // Check if user already has phone number
  const user = await getUser();
  
  if (user?.phoneNumber) {
    // User already completed profile, redirect to main app
    redirect(`/${lang}`);
  }

  const dictionary = await getDictionary(lang as 'en' | 'ru');

  return <CompleteProfilePage lang={lang} dictionary={dictionary} />;
}