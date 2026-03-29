import React from "react";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 py-16 lg:py-24">
      <div className="text-center mb-20">
        <h2 className="text-5xl md:text-[5.5rem] font-medium tracking-tight text-neutral-950">Ready to Optimize Your Portfolio?</h2>
      </div>

      <div className="bg-[#111111] rounded-[2rem] p-10 md:p-16 text-white flex flex-col">
        {/* Top Newsletter Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-white/[0.08] pb-14 mb-14 gap-10">
          <div className="max-w-md">
            <div className="w-12 h-12 bg-[#FFDD33] rounded-xl flex items-center justify-center mb-6 shadow-sm">
               <svg className="w-6 h-6 text-neutral-900" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
               </svg>
            </div>
            <h3 className="text-[2rem] font-semibold mb-3 leading-tight">Connect With Us</h3>
            <p className="text-neutral-400 text-[15px]">Reach out directly to our operational desk for quick answers, seamless execution, and technical advisory.</p>
          </div>

          <div className="flex w-full lg:w-auto flex-col sm:flex-row gap-3">
             <a 
               href="https://wa.me/918138058547?text=Hello!%20I%20am%20interested%20in%20learning%20more%20about%20NGQ%20Assets'%20trading%20services%20and%20investment%20portfolios." 
               target="_blank" 
               rel="noopener noreferrer" 
               className="group bg-[#FFDD33] text-neutral-950 px-8 py-4 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-[#ebc92c] transition-all duration-300 hover:-translate-y-[2px] shadow-[0_0_0_4px_rgba(255,221,51,0.1)] active:scale-[0.98] text-[16px] whitespace-nowrap"
             >
               Chat With Us
             </a>
          </div>
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
