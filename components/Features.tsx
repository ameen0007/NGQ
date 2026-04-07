"use client";

import Image from "next/image";
import { ArrowRight, Globe, Lock, SlidersHorizontal, CreditCard, LayoutGrid } from "lucide-react";
import FadeUp from "@/components/FadeUp";

export default function Features() {
  return (
    <section className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 py-7 lg:py-5">
      <FadeUp>
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-[2.75rem] md:text-5xl font-medium tracking-tight mb-2 text-neutral-950 leading-[1.1]">
            The NGQ Assets Advantage
          </h2>
        </div>
      </FadeUp>

      <div className="flex flex-col gap-6">
        {/* Top Two Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FadeUp delay={100}>
            <div className="bg-[#F9FAFB] rounded-[2rem] p-10 md:p-12 relative overflow-hidden group h-full">
              <div className="w-14 h-14 bg-[#FFDD33] rounded-full flex items-center justify-center mb-8 shadow-sm">
                <CreditCard className="w-6 h-6 text-neutral-900" />
              </div>
              <h3 className="text-[1.7rem] font-semibold mb-4 text-neutral-950 pr-8 leading-[1.2]">
                Global Market Access
              </h3>
              <p className="text-neutral-500 mb-12 pr-12 text-[15px] leading-relaxed">
                Diversified trading exposure across prominent Indian equities and international financial instruments, meticulously managed from our Dubai headquarters.
              </p>
              {/* Image Replacement */}
              <div className="w-full h-56 bg-transparent relative group-hover:-translate-y-2 transition-transform duration-500 overflow-hidden flex justify-center items-center mt-auto">
                <Image src="/globE.png" alt="Global Market Access" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover rounded-xl" />
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={200}>
            <div className="bg-[#F9FAFB] rounded-[2rem] p-10 md:p-12 relative overflow-hidden group h-full">
              <div className="w-14 h-14 bg-[#FFDD33] rounded-full flex items-center justify-center mb-8 shadow-sm">
                <SlidersHorizontal className="w-6 h-6 text-neutral-900" />
              </div>
              <h3 className="text-[1.7rem] font-semibold mb-4 text-neutral-950 pr-8 leading-[1.2]">
                Advanced Risk Management
              </h3>
              <p className="text-neutral-500 mb-12 pr-12 text-[15px] leading-relaxed">
                Strict allocation limits and active downside mitigation designed to protect your core investment against market volatility.
              </p>
              {/* Image Replacement */}
              <div className="w-[85%] h-56 mx-auto relative group-hover:-translate-y-2 transition-transform duration-500 flex justify-center items-center mt-auto">
                <Image src="/market.png" alt="Advanced Risk Management" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain" />
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Our Approach Section */}
        <div className="flex flex-col items-center justify-center my-6 py-6 border-y border-neutral-100">
             <div className="text-center mb-10">
               <h2 className="text-[2.2rem] md:text-4xl font-medium tracking-tight text-neutral-950 mb-3">Our Approach</h2>
               <p className="text-neutral-500 text-[15px] max-w-xl mx-auto">
                 Tailored investment strategies designed to balance stability with dynamic market growth.
               </p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
               {/* Low Risk Card */}
               <FadeUp delay={100}>
               <div className="bg-white border border-neutral-100 rounded-[2rem] p-8 md:p-10 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all duration-500 group relative overflow-hidden h-full">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFDD33]/10 rounded-bl-[80px] -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-500" />
                 <h3 className="text-2xl font-bold text-[#171717] mb-3 relative z-10">Low Risk</h3>
                 <div className="w-full h-px bg-neutral-100 my-4 relative z-10" />
                 <p className="text-lg font-bold text-emerald-600 mb-3 relative z-10">3% Fixed Return Per Month</p>
                 <p className="text-[14px] text-neutral-500 leading-relaxed max-w-[280px] relative z-10">
                   Highly secure allocation ensuring steady capital, absolute preservation, and absolutely no other risk exposure.
                 </p>
               </div>
               </FadeUp>

               {/* Medium Risk Card */}
               <FadeUp delay={200}>
               <div className="bg-[#171717] rounded-[2rem] p-8 md:p-10 flex flex-col items-center text-center shadow-md hover:shadow-xl transition-all duration-500 group relative overflow-hidden h-full">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[80px] -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-500" />
                 <h3 className="text-2xl font-bold text-white mb-3 relative z-10">Medium Risk</h3>
                 <div className="w-full h-px bg-white/10 my-4 relative z-10" />
                 <p className="text-lg font-bold text-[#FFDD33] mb-3 relative z-10">10% - 13% Managed Return</p>
                 <p className="text-[14px] text-neutral-400 leading-relaxed max-w-[280px] relative z-10">
                   A balanced trajectory targeting higher yields while maintaining a maximum calculated 20% capital risk threshold.
                 </p>
               </div>
               </FadeUp>
             </div>
        </div>

        {/* Wide Center Card */}
        <FadeUp delay={100}>
          <div className="bg-[#F9FAFB] rounded-[2rem] p-10 md:p-14 flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="w-full md:w-1/2 flex flex-col items-start md:pr-4">
              <div className="w-14 h-14 bg-[#FFDD33] rounded-full flex items-center justify-center mb-8 shadow-sm">
                <Globe className="w-6 h-6 text-neutral-900" />
              </div>
              <h3 className="text-[1.7rem] font-semibold mb-4 text-neutral-950 leading-[1.2]">
                Complete Clarity on Your Capital
              </h3>
              <p className="text-neutral-500 text-[15px] leading-relaxed max-w-[90%]">
                We believe you should always know exactly where your portfolio stands. Our commitment to radical transparency means you receive comprehensive, weekly performance updates detailing tactical shifts directly from our Dubai trading floor.
              </p>
            </div>
            {/* Image Replacement */}
            <div className="w-full md:w-1/2 h-[300px] relative flex items-center justify-center">
              <Image src="/clarity.png" alt="Complete Clarity" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain" />
            </div>
          </div>
        </FadeUp>

        {/* Bottom Two Cards - tighter gap on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <FadeUp delay={100}>
            <div className="md:col-span-1 bg-[#F9FAFB] rounded-[2rem] p-8 flex flex-col relative overflow-hidden h-full">
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="absolute w-14 h-10 bg-white shadow-sm border border-neutral-100 rounded-lg flex items-center justify-center top-10 right-10 z-20 -rotate-[6deg]">
                  <span className="text-xs font-bold text-blue-600">usd</span>
                </div>
                <div className="absolute w-14 h-10 bg-white shadow-sm border border-neutral-100 rounded-lg flex items-center justify-center right-24 top-16 z-10 rotate-[8deg]">
                  <span className="text-xs font-bold text-emerald-600">eur</span>
                </div>
                <div className="absolute w-14 h-10 bg-white shadow-sm border border-neutral-100 rounded-lg flex items-center justify-center left-20 z-30 rotate-[10deg]">
                  <span className="text-xs font-bold text-red-600">gbp</span>
                </div>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={200}>
            <div className="bg-[#F9FAFB] rounded-[2rem] p-10 flex flex-col h-full">
              <div className="w-12 h-12 bg-[#FFDD33] rounded-full flex items-center justify-center mb-10 shadow-sm shrink-0">
                <LayoutGrid className="w-5 h-5 text-neutral-900" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-neutral-950 leading-[1.3] pr-4">The Growth Portfolio</h3>
              <div className="mt-auto pt-8 flex flex-col gap-3 relative h-32 w-full">
                <Image src="/growth.png" alt="The Growth Portfolio" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain group-hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={300}>
            <div className="bg-neutral-950 rounded-[2rem] p-10 flex flex-col relative overflow-hidden group cursor-pointer h-full">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-500" />
              <h3 className="text-[1.7rem] font-semibold text-white leading-[1.2] mt-8 z-10">Ready to Optimize Your Portfolio?</h3>
              <a href="mailto:contact@ngqassets.com" className="group z-10 self-start mt-16 bg-[#FFDD33] text-neutral-950 px-7 py-3.5 rounded-full font-semibold flex items-center gap-2 hover:bg-[#ebc92c] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-md active:scale-[0.98] text-[15px] cursor-pointer">
                Send Message <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
