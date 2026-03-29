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
    <div className="font-sans antialiased text-neutral-900 selection:bg-[#FFDD33] selection:text-black">
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
              <span className="text-[#A28822] bg-[#FFF8D6] px-4 py-1.5 rounded-full text-[12px] font-bold tracking-[0.1em] uppercase mb-8 border border-[#FFDD33]/30 shadow-sm inline-block">
                Direct Execution
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-medium tracking-tight leading-[1.05] text-[#171717]">
                Connect with the Institutional Desk
              </h1>
            </div>
            <div className="w-full lg:w-[400px]">
              <p className="text-neutral-500 text-[16px] md:text-[18px] leading-relaxed">
                Our sovereign ledger team provides bespoke liquidity solutions and
                technical advisory for institutional capital managers globally.
              </p>
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
              href="https://wa.me/918138058547?text=Hello!%20I%20am%20interested%20in%20learning%20more%20about%20NGQ%20Assets'%20trading%20services%20and%20investment%20portfolios."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#171717] rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between text-white relative overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-transparent hover:border-[#FFDD33]/20"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFDD33]/5 rounded-bl-[150px] -mr-10 -mt-10 transition-transform group-hover:scale-110 duration-500" />
              
              <div className="flex items-center gap-6 relative z-10 w-full mb-8 md:mb-0">
                <div className="w-16 h-16 bg-[#25D366]/20 rounded-full flex items-center justify-center shrink-0 border border-[#25D366]/30">
                  <svg className="w-8 h-8 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">Chat With Us</h3>
                  <p className="text-sm md:text-base text-neutral-400 font-medium max-w-[300px]">Instant replies from our executive team regarding operations and queries.</p>
                </div>
              </div>
              
              <div className="relative z-10 shrink-0 bg-[#FFDD33] text-[#171717] px-8 py-4 rounded-full font-bold flex flex-col md:flex-row items-center gap-3 shadow-[0_0_0_4px_rgba(255,221,51,0.1)] group-hover:scale-105 transition-transform duration-300 w-full md:w-auto mt-4 md:mt-0 justify-center">
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
                  <h3 className="text-xl font-bold mb-1">Direct Trading Block</h3>
                  <a href="tel:+918138058547" className="text-lg text-neutral-500 font-medium hover:text-[#171717] transition-colors">+91 8138 058 547</a>
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
