"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 50);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => { clearTimeout(t); window.removeEventListener("scroll", handleScroll); };
  }, []);

  return (
    <>
      <div className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.04)]" : "bg-transparent"}`}>
      <nav 
        className="w-full max-w-[1280px] mx-auto px-6 md:px-16 lg:px-20 h-18 md:h-26 flex items-center justify-between relative"
        style={{
          transition: "all 1.2s ease-out",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(-20px)",
        }}
      >
        {/* Logo - Left */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/Mainlogo.png" alt="NGQ Assets" width={28} height={28} className="object-contain w-auto h-auto" />
          <span className={`${inter.className} font-bold text-base text-[#171717] tracking-tight`}>NGQ Assets</span>
        </Link>

        {/* Center Nav Links - Desktop only */}
        <div className="hidden md:flex items-center gap-10 text-[15px] font-medium text-[#98A2B3]">
          <Link href="/" className={`${pathname === '/' ? 'text-[#171717] font-semibold' : ''} hover:text-[#171717] transition-colors`}>
            Home
          </Link>
          <Link href="/about" className={`${pathname === '/about' ? 'text-[#171717] font-semibold' : ''} hover:text-[#171717] transition-colors`}>
            About Us
          </Link>
          <Link href="/contact" className={`${pathname === '/contact' ? 'text-[#171717] font-semibold' : ''} hover:text-[#171717] transition-colors`}>
            Contact Us
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* My Portfolio - Desktop only */}
          <Link
            href="/portfolio"
            className="hidden md:inline-flex bg-[#171717] text-white px-5 py-2 rounded-full font-semibold text-[12px] hover:bg-[#2a2a2a] transition-all duration-300 shadow-[0_0_0_3px_rgba(23,23,23,0.08)] hover:shadow-[0_0_0_5px_rgba(23,23,23,0.12)] hover:-translate-y-[2px] active:scale-[0.98]"
          >
            My Portfolio
          </Link>

          {/* Hamburger - Mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 rounded-xl bg-[#F9FAFB] border border-neutral-100"
            aria-label="Menu"
          >
            <span className={`block w-5 h-[2px] bg-[#171717] rounded-full transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-5 h-[2px] bg-[#171717] rounded-full transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-[2px] bg-[#171717] rounded-full transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-[75%] max-w-[300px] bg-white z-50 shadow-2xl transition-transform duration-300 ease-out ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full pt-20 px-8 pb-10 relative">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-xl bg-[#F9FAFB] border border-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors"
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>

          <div className="flex flex-col gap-6 text-[17px] font-medium text-[#98A2B3]">
            <Link href="/" onClick={() => setMenuOpen(false)} className={`${pathname === '/' ? 'text-[#171717] font-semibold' : ''} py-2 border-b border-neutral-100 hover:text-[#171717] transition-colors`}>
              Home
            </Link>
            <Link href="/about" onClick={() => setMenuOpen(false)} className={`${pathname === '/about' ? 'text-[#171717] font-semibold' : ''} py-2 border-b border-neutral-100 hover:text-[#171717] transition-colors`}>
              About Us
            </Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className={`${pathname === '/contact' ? 'text-[#171717] font-semibold' : ''} py-2 border-b border-neutral-100 hover:text-[#171717] transition-colors`}>
              Contact Us
            </Link>
          </div>

          <Link
            href="/portfolio"
            onClick={() => setMenuOpen(false)}
            className="mt-8 flex items-center justify-center bg-[#171717] text-white px-6 py-3 rounded-full font-semibold text-[14px] hover:bg-[#2a2a2a] transition-all duration-300 shadow-[0_0_0_4px_rgba(23,23,23,0.08)] hover:shadow-lg hover:-translate-y-[2px] active:scale-[0.98] w-full"
          >
            My Portfolio
          </Link>
        </div>
      </div>
    </>
  );
}
