"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function FounderProfilePage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const coreExpertise = [
    "Wealth Management",
    "Investment Advisory",
    "Portfolio Management",
    "Stock Market Investments",
    "Wealth Preservation",
    "Retirement Solutions",
    "Risk Management",
    "Investor Education"
  ];

  return (
    <div className="font-sans antialiased text-[#171717] selection:bg-[#191970] selection:text-white bg-white min-h-screen">
      <main className="flex flex-col min-h-screen overflow-hidden">
        <Navbar />

        {/* Breadcrumb / Top Spacing */}
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 pt-32 pb-8 flex items-center gap-2 text-sm text-neutral-500">
          <Link href="/" className="hover:text-[#191970] transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/about" className="hover:text-[#191970] transition-colors">About Us</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#191970] font-medium">Founder Profile</span>
        </div>

        {/* Profile Hero Section */}
        <section className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 pb-16 lg:pb-24">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            
            {/* Left Column: Image & Quick Info */}
            <div 
              className="w-full lg:w-[400px] flex-shrink-0"
              style={{
                transition: "all 1s ease-out 0.2s",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(40px)",
              }}
            >
              <div className="sticky top-32">
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl mb-8 group">
                  <div className="absolute inset-0 bg-[#191970]/10 mix-blend-multiply z-10 rounded-[2rem]"></div>
                  <Image 
                    src="/Founder & CEO.jpeg" 
                    alt="Mahin Ahmad, CWM" 
                    width={500} 
                    height={600} 
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 z-20">
                    <h1 className="text-3xl font-bold text-white mb-1">Mahin Ahmad, CWM</h1>
                    <p className="text-[#A28822] font-semibold text-sm uppercase tracking-widest">Founder & CEO</p>
                  </div>
                </div>

                <div className="bg-[#F9FAFB] rounded-3xl p-8 border border-neutral-100 shadow-sm">
                  <h3 className="text-lg font-bold text-[#191970] mb-6 flex items-center gap-2">
                    <span className="w-8 h-[2px] bg-[#A28822]"></span>
                    Core Expertise
                  </h3>
                  <ul className="space-y-4">
                    {coreExpertise.map((expertise, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-neutral-600">
                        <CheckCircle2 className="w-5 h-5 text-[#A28822] shrink-0 mt-0.5" />
                        <span className="leading-tight">{expertise}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column: Bio Details */}
            <div 
              className="w-full lg:flex-1"
              style={{
                transition: "all 1s ease-out 0.4s",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(40px)",
              }}
            >
              <div className="mb-10">
                <span className="text-[#A28822] font-bold tracking-[0.15em] uppercase text-sm mb-4 block">FINZAVIO Financial Services LLP</span>
                <h2 className="text-4xl md:text-5xl font-bold text-[#171717] tracking-tight mb-8 leading-[1.1]">
                  Chartered Wealth Manager committed to ethical wealth advisory.
                </h2>
                
                <div className="prose prose-lg text-neutral-500 max-w-none space-y-6 leading-relaxed">
                  <p>
                    <strong className="text-[#171717] font-semibold">Mahin Ahmad</strong> is a Chartered Wealth Manager (CWM) with over 16 years of experience in the financial services, investment, and stock market industry. As the Founder of FINZAVIO Financial Services LLP, he is committed to helping individuals, families, and businesses build, preserve, and grow wealth through disciplined investment strategies and ethical wealth advisory.
                  </p>
                  <p>
                    Guided by ethical principles and inspired by Sufi values of integrity, sincerity, trust, and service, Mahin believes that wealth should be managed responsibly to create lasting prosperity. His client-first philosophy emphasizes transparency, long-term value creation, and informed decision-making over short-term speculation.
                  </p>
                  <p>
                    His expertise spans wealth management, investment advisory, portfolio management, stock market investments, retirement solutions, wealth preservation, and risk management. He works closely with clients to develop investment strategies that align with their long-term objectives while upholding the highest standards of professionalism and ethics.
                  </p>
                  
                  <div className="my-10 p-8 bg-[#191970] text-white rounded-3xl relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                    <p className="text-xl leading-relaxed italic font-light relative z-10 border-l-4 border-[#A28822] pl-6">
                      "Beyond his advisory practice, Mahin is a passionate financial educator and public speaker dedicated to improving financial literacy. Through seminars, digital content, and investor education initiatives, he empowers individuals to make informed investment decisions with confidence."
                    </p>
                  </div>

                  <p>
                    At FINZAVIO, Mahin leads with excellence, combining more than sixteen years of market experience with ethical leadership to deliver trusted wealth management solutions and enduring client relationships built on integrity and confidence.
                  </p>
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
