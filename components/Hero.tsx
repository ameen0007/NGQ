"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 py-8 lg:py-28 flex flex-col lg:flex-row items-center gap-0 lg:gap-10">
      {/* Left: Mockup Composition — percentage-based for responsiveness */}
      <div className="w-full lg:w-[55%] relative aspect-square md:aspect-[5/4]">

        {/* Phone Mockup - fades UP */}
        <div
          className="absolute left-[8%] md:left-[10%] top-[-1%] md:top-[-6%] w-[55%] md:w-[52%] z-10"
          style={{
            transition: "all 1.2s ease-out",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(60px)",
          }}
        >
          <Image
            src="/mobilemockup.png"
            alt="NGQ Assets mobile app"
            width={400}
            height={650}
            className="w-full h-auto drop-shadow-2xl"
            priority
          />
        </div>

        {/* Market Reach Card - fades DOWN */}
        <div
          className="absolute right-[7%] md:right-[10%] top-[15%] md:top-[8%] w-[41%] md:w-[42%] z-20"
          style={{
            transition: "all 1.2s ease-out 0.3s",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(-60px)",
          }}
        >
          <Image
            src="/mobilefrontcard.png"
            alt="Market Reach card"
            width={250}
            height={310}
            className="w-full h-auto drop-shadow-2xl rounded-2xl"
            priority
          />
        </div>
      </div>

      {/* Right: Content side (Header & Text) */}
      <div
        className="w-full lg:w-[45%] flex flex-col items-center lg:items-start text-center lg:text-left mt-8 lg:mt-0"
        style={{
          transition: "all 1.2s ease-out 0.2s",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(60px)",
        }}
      >
        <h1 className="text-4xl md:text-[3.5rem] font-medium tracking-tight leading-[1.15] mb-6 text-[#171717]">
          Precision Trading.<br />Disciplined Asset<br className="hidden md:block"/> Management.
        </h1>
        <p className="text-[#98A2B3] text-base md:text-xl max-w-[420px] mb-10 leading-relaxed mx-auto lg:mx-0">
          Headquartered in Dubai, we navigate Indian and international markets with risk-managed, data-driven trading strategies designed for consistent wealth accumulation.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start mb-14 w-full gap-4">
          <Link href="/portfolio" className="group flex items-center justify-center gap-2 bg-[#FFDD33] text-[#171717] px-8 py-3.5 sm:px-10 sm:py-4 rounded-full font-semibold hover:bg-[#ebc92c] transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-[2px] active:scale-[0.98] text-[15px] sm:text-[16px] whitespace-nowrap">
            Explore My Portfolio <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <a href="https://wa.me/918138058547?text=Hello!%20I%20am%20interested%20in%20learning%20more%20about%20NGQ%20Assets'%20trading%20services%20and%20investment%20portfolios." target="_blank" rel="noopener noreferrer" className="bg-[#F9FAFB] border border-neutral-200 text-[#171717] px-8 py-3.5 sm:px-10 sm:py-4 rounded-full font-semibold hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-[2px] active:scale-[0.98] text-[15px] sm:text-[16px] whitespace-nowrap">
            Chat With Us
          </a>
        </div>

        {/* Social Proof */}
        <div className="flex items-center justify-center lg:justify-start gap-4 sm:gap-5">
          <div className="flex -space-x-3 text-sm font-semibold text-[#171717]">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-[3px] border-white overflow-hidden shadow-sm relative shrink-0 bg-[#B5E4CA] flex items-center justify-center pt-px pr-px">N</div>
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-[3px] border-white overflow-hidden shadow-sm relative shrink-0 bg-[#FFBC99] flex items-center justify-center pt-px pr-px">S</div>
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-[3px] border-white overflow-hidden shadow-sm relative shrink-0 bg-[#CABDFF] flex items-center justify-center pt-px pr-px">K</div>
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-2 text-lg sm:text-xl font-bold text-[#171717]">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400" />
              3 Years+ Experience
            </div>
            <p className="text-[12px] sm:text-[13px] text-[#98A2B3] font-medium leading-tight mt-1">
              Trusted by clients &<br />experienced professionals
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
