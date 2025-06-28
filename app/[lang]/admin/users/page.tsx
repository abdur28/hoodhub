import type { Metadata } from "next";
import UsersPage from "./UsersPage";
import { getDictionary } from '../../dictionaries';

export const metadata: Metadata = {
  title: "User Management - Admin | HoodHub",
  description: "Manage users, view statistics, and administer customer accounts.",
  keywords: "admin, users, management, customers, HoodHub",
};

export default async function Users({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as 'en' | 'ru');

  return (
    <UsersPage 
      lang={lang} 
      dictionary={dictionary}
    />
  );
}