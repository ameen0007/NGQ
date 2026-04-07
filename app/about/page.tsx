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

        {/* Founders Section */}
        <section className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 py-16 lg:py-24">
          <div className="text-center mb-16">
             <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#171717] mb-6">Founders</h2>
             <p className="text-neutral-500 text-[16px] md:text-[18px] max-w-2xl mx-auto">
               Guided by visionary experts committed to disciplined risk management and long-term financial growth.
             </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
             {/* Founder 1 */}
             <div className="flex flex-col items-center group text-center">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mb-6 shadow-xl border-4 border-white mx-auto flex items-center justify-center">
                   <Image src="/men1.jpg" alt="Abdul Rahim Nissar" width={224} height={224} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <h3 className="text-2xl font-bold text-[#171717]">Abdul Rahim Nissar</h3>
                <p className="text-[#A28822] font-bold text-[14px] uppercase tracking-wider mt-2">Founder</p>
             </div>
             {/* Founder 2 */}
             <div className="flex flex-col items-center group text-center">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mb-6 shadow-xl border-4 border-white mx-auto flex items-center justify-center">
                   <Image src="/men2.jpg" alt="Mehroof rahman" width={224} height={224} className="w-full h-full object-cover object-[center_top] transition-transform duration-700 group-hover:scale-110" />
                </div>
                <h3 className="text-2xl font-bold text-[#171717]">Mehroof rahman</h3>
                <p className="text-[#A28822] font-bold text-[14px] uppercase tracking-wider mt-2">Co-founder</p>
             </div>
             {/* Founder 3 */}
             <div className="flex flex-col items-center group text-center">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mb-6 shadow-xl border-4 border-white mx-auto flex items-center justify-center">
                   <Image src="/men3.jpg" alt="Abee sinan" width={224} height={224} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <h3 className="text-2xl font-bold text-[#171717]">Abee sinan</h3>
                <p className="text-[#A28822] font-bold text-[14px] uppercase tracking-wider mt-2">Co-founder</p>
             </div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section className="bg-[#F9FAFB] w-full py-16 lg:py-24">
           <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">
             <div className="text-center mb-16">
               <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#171717] mb-6">Our Approach</h2>
               <p className="text-neutral-500 text-[16px] md:text-[18px] max-w-2xl mx-auto">
                 Tailored investment strategies designed to balance stability with dynamic market growth.
               </p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
               
               {/* Low Risk Card */}
               <div className="bg-white border border-neutral-100 rounded-[2rem] p-10 flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFDD33]/10 rounded-bl-[80px] -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-500" />
                 <h3 className="text-3xl font-bold text-[#171717] mb-4 relative z-10">Low Risk</h3>
                 <div className="w-full h-px bg-neutral-100 my-4 relative z-10" />
                 <p className="text-xl font-medium text-emerald-600 mb-4 relative z-10">3% Fixed Return Per Month</p>
                 <p className="text-[15px] text-neutral-500 leading-relaxed max-w-[280px] relative z-10">
                   Highly secure allocation ensuring steady capital, absolute preservation, and absolutely no other risk exposure.
                 </p>
               </div>

               {/* Medium Risk Card */}
               <div className="bg-[#171717] rounded-[2rem] p-10 flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[80px] -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-500" />
                 <h3 className="text-3xl font-bold text-white mb-4 relative z-10">Medium Risk</h3>
                 <div className="w-full h-px bg-white/10 my-4 relative z-10" />
                 <p className="text-xl font-medium text-[#FFDD33] mb-4 relative z-10">10% - 13% Managed Return</p>
                 <p className="text-[15px] text-neutral-400 leading-relaxed max-w-[280px] relative z-10">
                   A balanced trajectory targeting higher yields while maintaining a maximum calculated 20% capital risk threshold.
                 </p>
               </div>

             </div>
           </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
