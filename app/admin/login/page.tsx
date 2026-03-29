import Image from "next/image";
import Link from "next/link";
import { Lock, Mail, Eye, ShieldAlert } from "lucide-react";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#0A0A0A] font-sans selection:bg-[#FFDD33] selection:text-black">
      {/* Background Deep Blurs */}
      <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-gradient-to-tr from-purple-900/40 via-blue-900/40 to-cyan-900/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-gradient-to-tr from-[#3f310b] to-[#1a1405] rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="z-10 flex flex-col items-center mb-8 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white flex items-center gap-3">
          <div className="bg-white rounded-lg p-1.5 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <Image 
              src="/Mainlogo.png" 
              alt="NGQ Assets Logo" 
              width={32} 
              height={32} 
              className="rounded-md" 
            />
          </div>
          NGQ Assets
        </h1>
        <div className="flex items-center gap-2 mt-4">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.6)]" />
          <p className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-neutral-400 uppercase">
            Sovereign Desk Access
          </p>
        </div>
      </div>

      {/* Login Card */}
      <div className="z-10 w-full max-w-[440px] bg-[#141414]/90 backdrop-blur-xl rounded-[2rem] p-8 md:p-10 shadow-[0_8px_40px_rgb(0,0,0,0.5)] border border-white/10 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 fill-mode-both box-border mx-4">
        <h2 className="text-2xl font-bold text-white tracking-tight mb-2">Admin Portal</h2>
        <p className="text-[14px] text-neutral-400 mb-8">Authenticate to access restricted network nodes.</p>

        <form className="flex flex-col gap-5">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold tracking-[0.1em] text-neutral-500 uppercase">Admin ID / Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-white transition-colors" />
              <input
                type="email"
                placeholder="sysadmin@ngqassets.com"
                className="w-full bg-[#1A1A1A] border-2 border-transparent focus:bg-[#222] focus:border-[#FFDD33]/50 rounded-xl pl-11 pr-4 py-3.5 text-[14px] text-white outline-none transition-all placeholder:text-neutral-600 ring-4 ring-transparent focus:ring-[#FFDD33]/10"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold tracking-[0.1em] text-neutral-500 uppercase">Secure Key</label>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-white transition-colors" />
              <input
                type="password"
                placeholder="••••••••••••"
                className="w-full bg-[#1A1A1A] border-2 border-transparent focus:bg-[#222] focus:border-[#FFDD33]/50 rounded-xl pl-11 pr-11 py-3.5 text-[14px] text-white outline-none transition-all placeholder:text-neutral-600 ring-4 ring-transparent focus:ring-[#FFDD33]/10"
              />
              <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors">
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Security Banner */}
          <div className="bg-red-950/20 border border-red-900/50 rounded-xl p-4 flex gap-3 text-[11px] text-red-200/90 leading-relaxed mt-2 items-start">
            <ShieldAlert className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <p>Restricted environment. Accessing this dashboard without authorization is strictly prohibited.</p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-white text-black font-bold text-[14px] py-4 rounded-xl hover:bg-neutral-200 transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_14px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.15)] active:scale-[0.98] mt-4"
          >
            Authenticate Node
          </button>
        </form>
      </div>

      {/* Bottom Legal / Version */}
      <div className="z-10 mt-12 mb-8 text-[10px] font-bold tracking-[0.1em] text-neutral-600 uppercase flex flex-col items-center gap-2 animate-in fade-in duration-1000 delay-300 fill-mode-both">
        <span>sys.admin.ver_2.4.1</span>
        <span>© {new Date().getFullYear()} NGQ ASSETS INTERNAL.</span>
      </div>
      
      {/* Bottom Bar Pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-neutral-900">
        <div className="w-full h-full bg-gradient-to-r from-red-500/0 via-red-500/50 to-red-500/0 opacity-50" />
      </div>
    </div>
  );
}
