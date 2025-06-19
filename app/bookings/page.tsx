import type { Metadata } from "next";
import BookingsPage from "./BookingsPage";
import { getUser } from "@/lib/data";

export const metadata: Metadata = {
  title: "My Bookings - HoodHub | Manage Your Appointments",
  description: "View and manage your upcoming and past appointments at HoodHub. Cancel or reschedule your bookings for barbering, tattoo, and lifestyle services.",
  keywords: "my bookings, appointments, manage bookings, cancel appointment, HoodHub",
};

export default async function Bookings() {
  const user = await getUser();

  if (!user) {
    // Redirect to sign-in if not authenticated
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-franklin mb-4">Please sign in to view your bookings</h1>
          <a href="/sign-in" className="text-yellow-500 hover:text-yellow-600">Sign In</a>
        </div>
      </div>
    );
  }

  return <BookingsPage userAsString={JSON.stringify(user)} />;
}