'use client';
import { useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface BookPopUpProps {
  lang?: string;
  dictionary?: Dictionary;
}

const BookPopUp = ({ lang, dictionary }: BookPopUpProps) => {
    const [open, setOpen] = useState(false);

    // Fallback to English if no dictionary provided
    const bookTexts = dictionary?.bookingButton || {
        greeting: "Ready for a fresh look?",
        helpMessage: "Book your appointment now!",
        bookNow: "Book Now",
        quickBook: "Quick Booking"
    };

    return (
        <div className="fixed bottom-5 right-20 z-30">
            <div className={open ? "block" : "hidden"}>
                <div className="flex flex-col w-80 h-72 rounded-3xl overflow-hidden bg-gradient-to-br from-yellow-50 to-amber-50 shadow-2xl border border-yellow-200">
                    {/* Header */}
                    <div className="w-full h-1/4 flex flex-row justify-between bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 items-center px-5">
                        <div className="flex flex-row items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white">
                                    <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M15.6947 13.7002H15.7037M11.9955 13.7002H12.0045M8.29431 13.7002H8.30329M15.6947 17.0002H15.7037M11.9955 17.0002H12.0045M8.29431 17.0002H8.30329" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <p className="text-white font-franklin text-lg font-semibold">{bookTexts.quickBook}</p>
                        </div>
                        <button 
                            onClick={() => setOpen(false)}
                            className="w-8 h-8 rounded-full bg-yellow-600 hover:bg-yellow-700 transition-colors duration-200 flex items-center justify-center"
                        >
                            <svg fill="none" viewBox="0 0 24 24" className="w-5 h-5 text-white">
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="w-full flex-1 flex flex-col justify-center items-center p-6">
                        <div className="text-center mb-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mb-3 mx-auto animate-pulse">
                                <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-white">
                                    <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="currentColor"/>
                                </svg>
                            </div>
                            <h3 className="font-franklin text-lg font-semibold text-gray-800 mb-1">
                                {bookTexts.greeting} ✨
                            </h3>
                            <p className="font-franklin text-sm text-gray-600">
                                {bookTexts.helpMessage}
                            </p>
                        </div>

                        {/* Book Button */}
                        <Link href={`/${lang}/book`} className="group w-full">
                            <button className="w-full h-12 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 text-black font-franklin font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2">
                                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300">
                                    <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>{bookTexts.bookNow}</span>
                                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300">
                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Floating Book Button */}
            <button
                onClick={() => setOpen(true)}
                className={`${open ? "hidden" : "flex"} items-center justify-center p-3 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 group`}
            >
                <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-black group-hover:rotate-12 transition-transform duration-300">
                    <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15.6947 13.7002H15.7037M11.9955 13.7002H12.0045M8.29431 13.7002H8.30329M15.6947 17.0002H15.7037M11.9955 17.0002H12.0045M8.29431 17.0002H8.30329" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {/* Notification dot */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </button>
        </div>  
    )
}

export default BookPopUp;