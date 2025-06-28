import { redirect } from "next/navigation";

export default async function AdminPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  
  // Redirect to users page by default
  redirect(`/${lang}/admin/users`);
}