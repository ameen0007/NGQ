"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, ChevronDown } from "lucide-react";

export default function ContactPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="font-sans antialiased text-white selection:bg-[#191970] selection:text-white">
      <main className="flex flex-col min-h-screen bg-white overflow-hidden">
        <Navbar />
        
        <section className="relative w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 py-16 lg:py-28">
          
          <div 
            className="mb-16 lg:mb-24 flex flex-col lg:flex-row gap-10 lg:gap-20 items-end"
            style={{
              transition: "all 1.0s ease-out 0.2s",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(40px)",
            }}
          >
            <div className="flex-1">
              <span className="text-[#A28822] bg-[#FFF8D6] px-4 py-1.5 rounded-full text-[12px] font-bold tracking-[0.1em] uppercase mb-8 border border-[#191970]/30 shadow-sm inline-block">
                Connect With FINZAVIO
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-medium tracking-tight leading-[1.05] text-[#171717]">
                Connect With FINZAVIO For Structured Financial Insights
              </h1>
              <p className="text-neutral-500 text-[16px] md:text-[18px] leading-relaxed max-w-xl mt-8">
                Our team is here to help you better understand your financial position, review your financial wellness snapshot, and answer questions related to your financial goals and priorities.
              </p>
            </div>
            <div className="w-full lg:w-[450px] flex justify-center lg:justify-end">
              <img src="/contact.png" alt="Contact Us" className="w-full h-auto object-contain drop-shadow-xl" />
            </div>
          </div>

          <div 
            className="flex flex-col gap-8 max-w-4xl mx-auto"
            style={{
              transition: "all 1.2s ease-out 0.4s",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(40px)",
            }}
          >
            {/* WhatsApp Card */}
            <a 
              href="https://wa.me/919061607577?text=Hello!%20I%20am%20interested%20in%20learning%20more%20about%20Finzavio's%20financial%20wellness%20reviews%20and%20structured%20insights."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#171717] rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between text-white relative overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-transparent hover:border-[#191970]/20"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#191970]/5 rounded-bl-[150px] -mr-10 -mt-10 transition-transform group-hover:scale-110 duration-500" />
              
              <div className="flex items-center gap-6 relative z-10 w-full mb-8 md:mb-0">
                <div className="w-16 h-16 bg-[#191970] rounded-2xl flex items-center justify-center shrink-0 shadow-lg border border-white/10">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">Talk With FINZAVIO</h3>
                  <p className="text-sm md:text-base text-neutral-400 font-medium max-w-[300px]">Connect with our team for guidance, financial wellness reviews, and structured financial understanding.</p>
                </div>
              </div>
              
              <div className="relative z-10 shrink-0 bg-white text-neutral-900 px-8 py-4 rounded-full font-bold flex flex-col md:flex-row items-center gap-3 shadow-lg group-hover:scale-105 transition-transform duration-300 w-full md:w-auto mt-4 md:mt-0 justify-center">
                Chat With Us
              </div>
            </a>

            {/* General Phone Call */}
            <div className="bg-[#F9FAFB] border border-neutral-100 rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between text-[#171717] relative overflow-hidden group hover:shadow-lg transition-shadow duration-300">
               <div className="flex items-center gap-6 relative z-10 w-full">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shrink-0 border border-neutral-200 shadow-sm transition-transform duration-300 group-hover:scale-110">
                  <Phone className="w-6 h-6 text-neutral-900" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Talk With FINZAVIO</h3>
                  <a href="tel:+919061607577" className="text-lg text-neutral-500 font-medium hover:text-[#171717] transition-colors">+91 90616 07577</a>
                </div>
              </div>
            </div>

          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
