'use client';
import { useState } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface WhatsappPopUpProps {
  lang?: string;
  dictionary?: Dictionary;
}

const WhatsappPopUp = ({ lang, dictionary }: WhatsappPopUpProps) => {
    const [open, setOpen] = useState(false);

    // Fallback to English if no dictionary provided
    const whatsappTexts = dictionary?.whatsapp || {
        greeting: "Hello There",
        helpMessage: "How can We help you?",
        openChat: "Open Chat"
    };

    return (
        <div className="fixed bottom-5  right-5 z-30">
            <div className={open ? "block" : "hidden"}>
                <div className="flex flex-col w-96 h-64 rounded-3xl overflow-hidden bg-slate-200">
                    <div className="w-full h-1/5 flex flex-row justify-between bg-green-500 items-center px-5">
                        <div className="flex flex-row items-center gap-2">
                            <svg fill="white" viewBox="0 0 24 24" className=" w-8 h-8">
                                <path d="M24 11.7c0 6.45-5.27 11.68-11.78 11.68-2.07 0-4-.53-5.7-1.45L0 24l2.13-6.27a11.57 11.57 0 0 1-1.7-6.04C.44 5.23 5.72 0 12.23 0 18.72 0 24 5.23 24 11.7M12.22 1.85c-5.46 0-9.9 4.41-9.9 9.83 0 2.15.7 4.14 1.88 5.76L2.96 21.1l3.8-1.2a9.9 9.9 0 0 0 5.46 1.62c5.46 0 9.9-4.4 9.9-9.83a9.88 9.88 0 0 0-9.9-9.83m5.95 12.52c-.08-.12-.27-.19-.56-.33-.28-.14-1.7-.84-1.97-.93-.26-.1-.46-.15-.65.14-.2.29-.75.93-.91 1.12-.17.2-.34.22-.63.08-.29-.15-1.22-.45-2.32-1.43a8.64 8.64 0 0 1-1.6-1.98c-.18-.29-.03-.44.12-.58.13-.13.29-.34.43-.5.15-.17.2-.3.29-.48.1-.2.05-.36-.02-.5-.08-.15-.65-1.56-.9-2.13-.24-.58-.48-.48-.64-.48-.17 0-.37-.03-.56-.03-.2 0-.5.08-.77.36-.26.29-1 .98-1 2.4 0 1.4 1.03 2.76 1.17 2.96.14.19 2 3.17 4.93 4.32 2.94 1.15 2.94.77 3.47.72.53-.05 1.7-.7 1.95-1.36.24-.67.24-1.25.17-1.37"/>               
                            </svg>
                            <p className="text-white font-asap text-xl">WhatsApp</p>
                        </div>
                        <div 
                        onClick={() => setOpen(false)}
                        className="w-8 h-8 rounded-full bg-green-700 hover:bg-green-900">
                            <svg fill="white" viewBox="0 0 24 24" className=" w-8 h-8">
                                <path d="M16 8L8 16M8.00001 8L16 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="w-full h-2/5 flex ">
                        <div className="w-full h-[70%] m-5 px-4 flex flex-col justify-center rounded-2xl shadow-sm shadow-gray-400 bg-white">
                            <p className="font-asap ">{whatsappTexts.greeting} <span className="animate-wave">👋</span></p>
                            <p className="font-asap ">{whatsappTexts.helpMessage}</p>
                        </div>
                    </div>
                    <div className="w-full h-2/5 flex justify-end items-end p-2">
                    <button className="send-button w-36 h-12 bg-green-500 hover:bg-green-400 rounded-3xl justify-center items-center">
                    <a href="https://wa.me/+79776000146" target="_blank">
                    <div className="svg-wrapper-1">
                        <div className="svg-wrapper">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                        >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path
                            fill="currentColor"
                            d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                            ></path>
                        </svg>
                        </div>
                    </div>
                    </a>
                    <span>{whatsappTexts.openChat}</span>
                    </button>

                    </div>
                </div>
            </div>
            <button
            onClick={() => setOpen(true)}
            className={`${open ? "hidden" : "flex"} items-center justify-center  p-2 rounded-full bg-green-500 shadow shadow-black`}>
                <svg fill="white" viewBox="0 0 24 24" className=" w-8 h-8">
                  <path d="M24 11.7c0 6.45-5.27 11.68-11.78 11.68-2.07 0-4-.53-5.7-1.45L0 24l2.13-6.27a11.57 11.57 0 0 1-1.7-6.04C.44 5.23 5.72 0 12.23 0 18.72 0 24 5.23 24 11.7M12.22 1.85c-5.46 0-9.9 4.41-9.9 9.83 0 2.15.7 4.14 1.88 5.76L2.96 21.1l3.8-1.2a9.9 9.9 0 0 0 5.46 1.62c5.46 0 9.9-4.4 9.9-9.83a9.88 9.88 0 0 0-9.9-9.83m5.95 12.52c-.08-.12-.27-.19-.56-.33-.28-.14-1.7-.84-1.97-.93-.26-.1-.46-.15-.65.14-.2.29-.75.93-.91 1.12-.17.2-.34.22-.63.08-.29-.15-1.22-.45-2.32-1.43a8.64 8.64 0 0 1-1.6-1.98c-.18-.29-.03-.44.12-.58.13-.13.29-.34.43-.5.15-.17.2-.3.29-.48.1-.2.05-.36-.02-.5-.08-.15-.65-1.56-.9-2.13-.24-.58-.48-.48-.64-.48-.17 0-.37-.03-.56-.03-.2 0-.5.08-.77.36-.26.29-1 .98-1 2.4 0 1.4 1.03 2.76 1.17 2.96.14.19 2 3.17 4.93 4.32 2.94 1.15 2.94.77 3.47.72.53-.05 1.7-.7 1.95-1.36.24-.67.24-1.25.17-1.37"/>               
                </svg>
            </button>
        </div>  
    )
}

export default WhatsappPopUp