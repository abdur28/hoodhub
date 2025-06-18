import type { Metadata } from "next";
import BookPage from "./BookPage";
import { getUser } from "@/lib/data";

export const metadata: Metadata = {
  title: "Book Appointment - HoodHub | Schedule Your Service",
  description: "Book your appointment at HoodHub for premium barbering, tattoo artistry, and lifestyle services.",
  keywords: "book appointment, booking, barbering, tattoo, lifestyle services, HoodHub",
};

export default async function Book({
  searchParams,
}: {
  searchParams: { service?: string };
}) {
  const user = await getUser();
  const selectedService = searchParams.service;

  return <BookPage userAsString={JSON.stringify(user)} selectedService={selectedService} />;
}