"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Target, Eye, ShieldCheck, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="font-sans antialiased text-neutral-900 selection:bg-[#FFDD33] selection:text-black">
      <main className="flex flex-col min-h-screen bg-white overflow-hidden">
        <Navbar />
        
        {/* Hero Section of About */}
        <section className="relative w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 py-16 lg:py-28 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Column (Text) */}
          <div 
            className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-10"
            style={{
              transition: "all 1.2s ease-out 0.2s",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(50px)",
            }}
          >
            <span className="text-[#A28822] bg-[#FFF8D6] px-4 py-1.5 rounded-full text-[12px] font-bold tracking-[0.1em] uppercase mb-8 border border-[#FFDD33]/30 shadow-sm">
              Established Precision
            </span>
            <h1 className="text-6xl md:text-[4.5rem] font-medium tracking-tight leading-[1.05] mb-8 text-[#171717]">
              Built on Discipline.<br />Defined by Transparency.
            </h1>
            <p className="text-neutral-500 text-[16px] md:text-[18px] leading-relaxed max-w-[480px] mb-12">
              Operating from the global financial epicenter of Dubai, NGQ Assets brings over three years of proven market experience and institutional-grade active trading to your portfolio. We operate seamlessly across Indian and global financial markets, replacing speculation with rigorous, data-backed frameworks. We firmly believe that strict risk management and absolute transparency are the true cornerstones of long-term financial success.
            </p>

            {/* Removed Institutional Presence block */}
          </div>

          {/* Right Column (Visual) */}
          <div className="w-full lg:w-1/2 relative min-h-[400px] md:min-h-[500px] flex items-center justify-center mt-10 lg:mt-0">
             <div className="absolute inset-0 bg-[#F9FAFB] rounded-[3rem] -rotate-3 transition-transform duration-700 hover:rotate-0" />
             <div 
                className="relative z-10 w-[60%] md:w-[50%]"
                style={{
                  transition: "all 1.2s ease-out 0.4s",
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? "scale(1) translateY(0)" : "scale(0.95) translateY(40px)",
                }}
             >
                <div className="absolute -inset-4 bg-[#FFDD33] rounded-3xl blur-2xl opacity-20" />
                <Image
                  src="/mobilefrontcard.png"
                  alt="Market Reach card"
                  width={300}
                  height={400}
                  className="w-full h-auto drop-shadow-2xl rounded-2xl relative z-10"
                  priority
                />
             </div>
          </div>
        </section>

        {/* Feature Cards Section (Matches Homepage Features.tsx) */}
        <section className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 py-16 lg:py-24 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Mission */}
            <div className="bg-[#F9FAFB] rounded-[2rem] p-10 flex flex-col relative overflow-hidden group hover:shadow-lg transition-all duration-500 hover:-translate-y-2 border border-transparent hover:border-neutral-100">
              <div className="w-14 h-14 bg-[#FFDD33] rounded-full flex items-center justify-center mb-10 shadow-sm shrink-0 transition-transform duration-500 group-hover:scale-110">
                <Target className="w-6 h-6 text-neutral-900" strokeWidth={2.5} />
              </div>
              <h3 className="text-[1.5rem] font-bold text-[#171717] mb-4 leading-[1.2]">Our Mission</h3>
              <p className="text-[15px] text-neutral-500 leading-relaxed pr-2">
                To democratize institutional-grade execution through a pristine digital interface that prioritizes data integrity over aesthetic noise.
              </p>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-bl-[80px] -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-500" />
            </div>

            {/* Vision */}
            <div className="bg-[#171717] rounded-[2rem] p-10 flex flex-col relative overflow-hidden group hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-500" />
              <div className="w-14 h-14 bg-[#FFDD33] rounded-full flex items-center justify-center mb-10 shadow-sm shrink-0 transition-transform duration-500 group-hover:scale-110 relative z-10">
                <Eye className="w-6 h-6 text-neutral-900" strokeWidth={2.5} />
              </div>
              <h3 className="text-[1.5rem] font-bold text-white mb-4 leading-[1.2] relative z-10">Our Vision</h3>
              <p className="text-[15px] text-neutral-400 leading-relaxed pr-2 relative z-10">
                A global financial ecosystem where every transaction is settled with architectural precision and absolute transparency.
              </p>
            </div>

            {/* Trust Pillars */}
            <div className="bg-[#F9FAFB] rounded-[2rem] p-10 flex flex-col relative overflow-hidden group hover:shadow-lg transition-all duration-500 hover:-translate-y-2 border border-transparent hover:border-neutral-100">
              <div className="w-14 h-14 bg-[#FFDD33] rounded-full flex items-center justify-center mb-10 shadow-sm shrink-0 transition-transform duration-500 group-hover:scale-110">
                <ShieldCheck className="w-6 h-6 text-neutral-900" strokeWidth={2.5} />
              </div>
              <h3 className="text-[1.5rem] font-bold text-[#171717] mb-4 leading-[1.2]">Trust Pillars</h3>
              <p className="text-[15px] text-neutral-500 leading-relaxed pr-2">
                Built upon the foundation of ISO-certified security protocols and deep-liquidity institutional partnerships.
              </p>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-bl-[80px] -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-500" />
            </div>

          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
