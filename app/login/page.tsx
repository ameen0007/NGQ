"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Lock, AtSign, Eye, ShieldCheck, Loader2, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (!email || !password) {
        throw new Error("Please enter both email and password.");
      }

      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw new Error(authError.message);

      if (authData.user) {
        // Fetch role from profiles table
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", authData.user.id)
          .single();

        if (profileError) {
          throw new Error("Could not fetch user profile details.");
        }

        // Redirect based on role
        if (profileData?.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/portfolio");
        }
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-neutral-50 font-sans selection:bg-[#FFDD33] selection:text-black">
      {/* Background Blurs */}
      <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-gradient-to-tr from-cyan-200 via-emerald-100 to-rose-200 rounded-full blur-[100px] opacity-40 mix-blend-multiply pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-gradient-to-tr from-amber-200 to-orange-100 rounded-full blur-[100px] opacity-50 mix-blend-multiply pointer-events-none" />

      {/* Header */}
      <div className="z-10 flex flex-col items-center mb-8 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 flex items-center gap-3">
          <Image 
            src="/Mainlogo.png" 
            alt="NGQ Assets Logo" 
            width={40} 
            height={40} 
            className="drop-shadow-sm rounded-lg" 
          />
          NGQ Assets
        </h1>
        <p className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-neutral-500 mt-3 uppercase">
          The Lucid Atelier of Finance
        </p>
      </div>

      {/* Login Card */}
      <div className="z-10 w-full max-w-[440px] bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 md:p-10 shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-white/50 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 fill-mode-both box-border mx-4">
        <h2 className="text-2xl font-bold text-neutral-900 tracking-tight mb-2">Welcome Back</h2>
        <p className="text-[14px] text-neutral-500 mb-8">Sign in to your premium trading portal.</p>

        {error && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-3 flex gap-2 text-[12px] text-red-600 mb-6 items-center">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold tracking-[0.1em] text-neutral-500 uppercase">Email Address</label>
            <div className="relative group">
              <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-neutral-600 transition-colors" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@ngqassets.com"
                className="w-full bg-[#F3F4F6] border-2 border-transparent focus:bg-white focus:border-[#FFDD33] rounded-xl pl-11 pr-4 py-3.5 text-[14px] text-neutral-900 outline-none transition-all placeholder:text-neutral-400 ring-4 ring-transparent focus:ring-[#FFDD33]/20"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold tracking-[0.1em] text-neutral-500 uppercase">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-neutral-600 transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#F3F4F6] border-2 border-transparent focus:bg-white focus:border-[#FFDD33] rounded-xl pl-11 pr-11 py-3.5 text-[14px] text-neutral-900 outline-none transition-all placeholder:text-neutral-400 ring-4 ring-transparent focus:ring-[#FFDD33]/20"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                tabIndex={-1}
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Security Banner */}
          <div className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-xl p-4 flex gap-3 text-[11px] text-emerald-800 leading-relaxed mt-2 items-start">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p>Encryption active. Your session is protected by multi-layer biometric standards.</p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full relative flex items-center justify-center bg-[#FFDD33] text-neutral-900 font-bold text-[14px] py-4 rounded-xl hover:bg-[#EBC92C] transition-all duration-300 shadow-[0_4px_14px_rgba(255,221,51,0.39)] hover:shadow-[0_6px_20px_rgba(255,221,51,0.39)] active:scale-[0.98] mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin text-neutral-800" /> : "Sign In"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[13px] text-neutral-500">
            No Account?{" "}
            <a href="https://wa.me/918138058547?text=Hello!%20I%20am%20interested%20in%20learning%20more%20about%20NGQ%20Assets'%20trading%20services%20and%20investment%20portfolios." target="_blank" rel="noopener noreferrer" className="font-bold text-[#A28822] hover:text-[#8a731d] transition-colors">
              Chat With Us
            </a>
          </p>
        </div>
      </div>

      {/* Footer Links removed */}

      {/* Copyright */}
      <div className="z-10 mt-6 mb-12 text-[10px] font-bold tracking-[0.1em] text-neutral-400 uppercase animate-in fade-in duration-1000 delay-300 fill-mode-both">
        © {new Date().getFullYear()} NGQ ASSETS. MEMBER SIPC.
      </div>
      
      {/* Bottom Bar Pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-4 md:h-6 bg-neutral-900">
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#FFDD33] to-transparent opacity-50 absolute top-0" />
        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #444 1px, transparent 1px)', backgroundSize: '8px 8px' }} />
      </div>
    </div>
  );
}
