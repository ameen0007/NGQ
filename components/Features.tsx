"use client";

import Image from "next/image";
import { ArrowRight, PieChart, ShieldAlert, FileText, Target, Activity, Home, CreditCard, SlidersHorizontal } from "lucide-react";
import FadeUp from "@/components/FadeUp";
import Link from "next/link";

export default function Features() {
  return (
    <section className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 pb-16 pt-0 lg:pb-8 lg:pt-4">
      <FadeUp>
        <div className="text-center mb-10 lg:mb-12">
          <h2 className="text-[2.75rem] md:text-5xl font-medium tracking-tight mb-2 text-neutral-950 leading-[1.1]">
            The Finzavio Advantage
          </h2>
        </div>
      </FadeUp>

      <div className="flex flex-col gap-6">
        {/* Top Two Cards - KEPT INTACT AS REQUESTED */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FadeUp delay={100}>
            <div className="bg-[#F9FAFB] rounded-[2rem] p-10 md:p-12 relative overflow-hidden group h-full flex flex-col">
              <div className="w-14 h-14 bg-[#191970] rounded-full flex items-center justify-center mb-8 shadow-sm shrink-0">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[1.7rem] font-semibold mb-4 text-neutral-950 pr-8 leading-[1.2]">
                Structured Financial Wellness
              </h3>
              <p className="text-neutral-500 mb-12 pr-12 text-[15px] leading-relaxed">
                Helping individuals and families better understand their current financial position through organized reviews, wellness scoring, and goal-focused financial insights.
              </p>
              {/* Image Replacement */}
              <div className="w-full h-56 bg-transparent relative group-hover:-translate-y-2 transition-transform duration-500 overflow-hidden flex justify-center items-center mt-auto">
                <Image src="/globE.png" alt="Structured Financial Wellness" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover rounded-xl" />
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={200}>
            <div className="bg-[#F9FAFB] rounded-[2rem] p-10 md:p-12 relative overflow-hidden group h-full flex flex-col">
              <div className="w-14 h-14 bg-[#191970] rounded-full flex items-center justify-center mb-8 shadow-sm shrink-0">
                <SlidersHorizontal className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[1.7rem] font-semibold mb-4 text-neutral-950 pr-8 leading-[1.2]">
                Goal & Risk Alignment
              </h3>
              <p className="text-neutral-500 mb-12 pr-12 text-[15px] leading-relaxed">
                A structured approach to understanding financial priorities, protection gaps, risk behaviour, and long-term financial preparedness.
              </p>
              {/* Image Replacement */}
              <div className="w-[85%] h-56 mx-auto relative group-hover:-translate-y-2 transition-transform duration-500 flex justify-center items-center mt-auto">
                <Image src="/market.png" alt="Goal & Risk Alignment" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain" />
              </div>
            </div>
          </FadeUp>
        </div>

        {/* NEW "Our Financial Wellness Approach" Section */}
        <div className="flex flex-col items-center justify-center my-6 py-10 border-y border-neutral-100">
          <div className="text-center mb-10">
            <h2 className="text-[2.2rem] md:text-4xl font-medium tracking-tight text-neutral-950 mb-3">Our Financial Wellness Approach</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
            {/* Card 1 */}
            <FadeUp delay={100}>
              <div className="bg-white border border-neutral-100 rounded-[2rem] p-8 md:p-10 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all duration-500 group relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#191970]/5 rounded-bl-[80px] -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-500" />
                <div className="w-12 h-12 bg-[#191970] rounded-full flex items-center justify-center mb-6 shadow-sm relative z-10 text-white">
                  1
                </div>
                <h3 className="text-2xl font-bold text-[#171717] mb-3 relative z-10">Understand Your Current Position</h3>
                <p className="text-[14.5px] text-neutral-500 leading-relaxed max-w-[300px] relative z-10 mt-2">
                  We help organize and review income, expenses, liabilities, assets, and financial priorities to create a structured financial wellness snapshot.
                </p>
              </div>
            </FadeUp>

            {/* Card 2 */}
            <FadeUp delay={200}>
              <div className="bg-white border border-neutral-100 rounded-[2rem] p-8 md:p-10 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all duration-500 group relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#EAB308]/10 rounded-bl-[80px] -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-500" />
                <div className="w-12 h-12 bg-[#EAB308] rounded-full flex items-center justify-center mb-6 shadow-sm relative z-10 text-neutral-950 font-bold">
                  2
                </div>
                <h3 className="text-2xl font-bold text-[#171717] mb-3 relative z-10">Identify Financial Gaps</h3>
                <p className="text-[14.5px] text-neutral-500 leading-relaxed max-w-[300px] relative z-10 mt-2">
                  Our assessment models help highlight areas such as protection gaps, emergency readiness, debt pressure, and goal preparedness.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* Big Center Card (Glassmorphism & Dashboard Visuals) */}
        <FadeUp delay={100}>
          <div className="bg-[#191970] rounded-[2rem] p-10 md:p-14 flex flex-col md:flex-row items-center gap-10 md:gap-16 relative overflow-hidden text-white shadow-xl mt-4">
            {/* Background glowing effects */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#EAB308]/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />
            
            <div className="w-full md:w-[45%] flex flex-col items-start relative z-10">
              <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mb-8 backdrop-blur-sm shrink-0 border border-white/20 shadow-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[1.8rem] md:text-4xl font-semibold mb-6 leading-[1.2] text-white tracking-tight">
                Structured Financial Wellness Reports
              </h3>
              <p className="text-blue-100 text-[15px] md:text-[16px] leading-relaxed">
                Receive professionally organized financial wellness summaries with visual insights, scoring models, and goal-focused observations designed for better financial understanding.
              </p>
            </div>
            
            <div className="w-full md:w-[55%] relative z-10 flex flex-col justify-center items-center">
               <Image 
                 src="/report.png" 
                 alt="Structured Financial Wellness Report" 
                 width={500} 
                 height={350} 
                 className="w-full h-auto object-contain drop-shadow-2xl hover:-translate-y-2 transition-transform duration-500 rounded-xl" 
               />
            </div>
          </div>
        </FadeUp>

        {/* Bottom Three Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
          <FadeUp delay={100}>
            <div className="bg-[#F9FAFB] rounded-[2rem] p-8 md:p-10 flex flex-col h-full border border-neutral-100 hover:shadow-lg hover:border-neutral-200 transition-all duration-300 group">
              <div className="w-12 h-12 bg-[#191970] rounded-xl flex items-center justify-center mb-6 shadow-md shrink-0 group-hover:-translate-y-1 transition-transform">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-neutral-950 leading-[1.3]">Goal-Focused Reviews</h3>
              <p className="text-[14px] text-neutral-500 leading-relaxed">
                Track important financial priorities including education, retirement, home planning, family protection, and long-term preparedness.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={200}>
            <div className="bg-[#F9FAFB] rounded-[2rem] p-8 md:p-10 flex flex-col h-full border border-neutral-100 hover:shadow-lg hover:border-neutral-200 transition-all duration-300 group">
              <div className="w-12 h-12 bg-[#191970] rounded-xl flex items-center justify-center mb-6 shadow-md shrink-0 group-hover:-translate-y-1 transition-transform">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-neutral-950 leading-[1.3]">Financial Wellness Scoring</h3>
              <p className="text-[14px] text-neutral-500 leading-relaxed">
                A simplified wellness-based scoring model designed to help clients better understand overall financial preparedness and stability.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={300}>
            <div className="bg-[#F9FAFB] rounded-[2rem] p-8 md:p-10 flex flex-col h-full border border-neutral-100 hover:shadow-lg hover:border-neutral-200 transition-all duration-300 group">
              <div className="w-12 h-12 bg-[#191970] rounded-xl flex items-center justify-center mb-6 shadow-md shrink-0 group-hover:-translate-y-1 transition-transform">
                <Home className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-neutral-950 leading-[1.3]">Real Estate & Asset Understanding</h3>
              <p className="text-[14px] text-neutral-500 leading-relaxed">
                Understand how residential and commercial real estate may fit within broader financial priorities, long-term wealth structure, and asset diversification discussions.
              </p>
            </div>
          </FadeUp>
        </div>

        {/* CTA Card */}
        <FadeUp delay={400}>
            <div className="mt-4 bg-[#171717] rounded-[2rem] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between relative overflow-hidden group shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#191970]/30 pointer-events-none" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#EAB308]/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
              
              <div className="z-10 mb-8 md:mb-0 md:pr-8 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-semibold text-white leading-[1.2] mb-3">
                  Ready To Review Your Financial Wellness?
                </h3>
                <p className="text-neutral-400 text-[15px]">
                  Connect with our advisors to build your personalized snapshot today.
                </p>
              </div>
              
              <Link href="/contact" className="group z-10 shrink-0 bg-[#EAB308] text-neutral-950 px-6 py-3 md:px-8 md:py-4 rounded-full font-bold flex items-center gap-2 hover:bg-white hover:text-neutral-950 transition-all duration-300 hover:-translate-y-[2px] shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] active:scale-[0.98] text-[14px] md:text-[15px] cursor-pointer">
                Generate Wellness Snapshot <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
        </FadeUp>

      </div>
    </section>
  );
}
