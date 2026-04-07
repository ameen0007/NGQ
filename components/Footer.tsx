"use client";

import React, { useState } from "react";
import Image from "next/image";
import FadeUp from "@/components/FadeUp";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { sendContactEmail } from "@/app/actions/contact";

export default function Footer() {
  const [formPending, setFormPending] = useState(false);
  const [formMessage, setFormMessage] = useState({ text: "", type: "" });

  async function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormPending(true);
    setFormMessage({ text: "", type: "" });
    const formData = new FormData(e.currentTarget);
    
    const res = await sendContactEmail(formData);
    
    setFormPending(false);
    if (res?.error) {
       setFormMessage({ text: res.error, type: "error" });
    } else if (res?.success) {
       setFormMessage({ text: res.message || "Message sent securely.", type: "success" });
       (e.target as HTMLFormElement).reset();
       setTimeout(() => setFormMessage({ text: "", type: "" }), 5000);
    }
  }

  return (
    <footer className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 py-16 lg:py-24">
      <FadeUp>
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-[5.5rem] font-medium tracking-tight text-neutral-950">Ready to Optimize Your Portfolio?</h2>
        </div>
      </FadeUp>

      <div className="bg-[#111111] rounded-[2rem] p-10 md:p-16 text-white flex flex-col">
        {/* Top Contact Form Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start border-b border-white/[0.08] pb-14 mb-14 gap-10 lg:gap-20">
          <div className="max-w-md lg:mt-8">
            <div className="w-12 h-12 bg-[#FFDD33] rounded-xl flex items-center justify-center mb-6 shadow-sm">
               <svg className="w-6 h-6 text-neutral-900" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
               </svg>
            </div>
            <h3 className="text-[2rem] font-semibold mb-3 leading-tight">Connect With Us</h3>
            <p className="text-neutral-400 text-[15px]">Reach out directly to our operational desk for quick answers, seamless execution, and technical advisory.</p>
          </div>

          <form 
            onSubmit={handleContactSubmit}
            className="flex w-full lg:w-[500px] flex-col gap-4 bg-white/5 p-8 rounded-[2rem] border border-white/10 shrink-0"
          >
            {formMessage.text && (
               <div className={`p-4 rounded-xl flex gap-3 text-[13px] items-start ${
                  formMessage.type === "error" ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
               }`}>
                  {formMessage.type === "error" ? <AlertCircle className="w-5 h-5 shrink-0" /> : <CheckCircle2 className="w-5 h-5 shrink-0" />}
                  <p>{formMessage.text}</p>
               </div>
            )}
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <label className="text-[10px] font-bold tracking-[0.1em] text-neutral-400 uppercase mb-2 block">Your Name</label>
                <input type="text" name="name" required disabled={formPending} placeholder="John Doe" className="w-full bg-black/40 border border-white/10 focus:border-[#FFDD33] rounded-xl px-4 py-3.5 text-[14px] outline-none text-white placeholder:text-neutral-600 transition-all disabled:opacity-50" />
              </div>
              <div className="w-full">
                <label className="text-[10px] font-bold tracking-[0.1em] text-neutral-400 uppercase mb-2 block">Email Address</label>
                <input type="email" name="email" required disabled={formPending} placeholder="john@example.com" className="w-full bg-black/40 border border-white/10 focus:border-[#FFDD33] rounded-xl px-4 py-3.5 text-[14px] outline-none text-white placeholder:text-neutral-600 transition-all disabled:opacity-50" />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold tracking-[0.1em] text-neutral-400 uppercase mb-2 block">Subject</label>
              <input type="text" name="subject" required disabled={formPending} placeholder="How can we assist you?" className="w-full bg-black/40 border border-white/10 focus:border-[#FFDD33] rounded-xl px-4 py-3.5 text-[14px] outline-none text-white placeholder:text-neutral-600 transition-all disabled:opacity-50" />
            </div>
            <div>
              <label className="text-[10px] font-bold tracking-[0.1em] text-neutral-400 uppercase mb-2 block">Message</label>
              <textarea name="message" required disabled={formPending} placeholder="Tell us about your portfolio goals..." rows={4} className="w-full bg-black/40 border border-white/10 focus:border-[#FFDD33] rounded-xl px-4 py-3.5 text-[14px] outline-none text-white placeholder:text-neutral-600 resize-none transition-all disabled:opacity-50" />
            </div>
            <button type="submit" disabled={formPending} className="w-full bg-[#FFDD33] text-neutral-950 font-bold text-[14px] py-4 rounded-xl hover:bg-[#ebc92c] transition-all duration-300 hover:-translate-y-[2px] shadow-[0_4px_14px_rgba(255,221,51,0.39)] flex justify-center items-center mt-2 group disabled:opacity-70 disabled:cursor-not-allowed">
              {formPending ? <Loader2 className="w-5 h-5 animate-spin text-neutral-800" /> : <><span className="mr-2">Send Message</span> <span className="group-hover:translate-x-1 transition-transform">→</span></>}
            </button>
          </form>
        </div>

        {/* Links Grid Section - Simplified */}
        <div className="flex flex-col mb-16 text-[15px]">
           <div className="flex items-center gap-2.5 font-bold text-2xl mb-5 text-white tracking-tight">
             <Image src="/Mainlogo.png" alt="NGQ Assets" width={32} height={32} className="object-contain w-auto h-auto" />
             NGQ Assets
           </div>
           <p className="text-neutral-400 max-w-[280px] leading-relaxed">Precision Trading. Disciplined Asset Management.</p>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-white/[0.08] pt-10 pb-6 mb-4">
          <p className="text-neutral-500 text-[12px] leading-relaxed">
            <strong className="text-neutral-400">Disclaimer:</strong> Investments in financial markets are subject to market risks. Past performance and historical track records are not indicative of future results. All target returns and drawdown parameters mentioned are strategic objectives based on active risk management and historical modeling; they are not fixed or guaranteed. The value of investments can fluctuate depending on market conditions. Please carefully evaluate your financial position and risk tolerance, and consult with a financial advisor before investing.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between border-t border-white/[0.08] pt-8 gap-6">
           <p className="text-neutral-500 text-[15px]">© {new Date().getFullYear()} NGQ Assets Inc. All rights reserved.</p>
           <div className="flex items-center gap-4">
             <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#FFDD33] hover:bg-white/10 transition-colors text-[13px] font-bold">X</a>
             <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#FFDD33] hover:bg-white/10 transition-colors text-[13px] font-bold">In</a>
             <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#FFDD33] hover:bg-white/10 transition-colors text-[13px] font-bold">Ig</a>
             <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#FFDD33] hover:bg-white/10 transition-colors text-[13px] font-bold">Fb</a>
           </div>
        </div>
      </div>
    </footer>
  );
}
