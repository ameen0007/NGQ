"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Settings, 
  Moon,
  Sun,
  LifeBuoy, 
  LogOut,
  Loader2,
  Activity
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import SkeletonLoader from "@/components/SkeletonLoader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isDark, setIsDark] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  // Skip auth check for the admin login page itself
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setAuthChecked(true);
      return;
    }

    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace("/login");
        return;
      }

      const { data: profileData } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (profileData?.role !== "admin") {
        router.replace("/portfolio");
        return;
      }

      setAuthChecked(true);
    }
    checkAuth();
  }, [isLoginPage, router]);

  // Show loading while auth is being verified (but not on login page)
  if (!authChecked && !isLoginPage) {
    return <SkeletonLoader />;
  }

  // For admin login page, just render children without the sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Client Updates", href: "/admin/updates", icon: Activity },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <div className={`flex min-h-screen font-sans antialiased selection:bg-[#FFDD33] selection:text-black transition-colors duration-500 ${isDark ? 'bg-[#0A0A0A] text-white' : 'bg-[#F9FAFB] text-[#171717]'}`}>
      
      {/* Sidebar - Desktop */}
      <aside className={`hidden md:flex flex-col w-64 lg:w-72 border-r shrink-0 transition-colors duration-500 ${isDark ? 'bg-[#141414] border-white/5' : 'bg-white border-neutral-100'}`}>
        
        {/* Logo Section */}
        <div className="p-8 pb-10">
          <Link href="/" className="flex flex-col gap-1 shrink-0 group">
            <div className="flex items-center gap-2">
              <Image src="/Mainlogo.png" alt="NGQ Assets" width={24} height={24} className="object-contain" />
              <span className={`font-bold text-[18px] tracking-tight group-hover:text-[#FFDD33] transition-colors ${isDark ? 'text-white' : 'text-[#171717]'}`}>
                NGQ Admin
              </span>
            </div>
            <span className="text-[9px] font-bold tracking-[0.15em] text-[#98A2B3] uppercase ml-8 mt-1 block">
              Premium Wealth
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2 px-4 flex-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-[12px] font-medium transition-all duration-300 ${
                  isActive 
                    ? "bg-[#FFDD33] text-[#171717] shadow-sm" 
                    : isDark ? "text-neutral-400 hover:bg-white/5 hover:text-white" : "text-neutral-500 hover:bg-[#F9FAFB] hover:text-[#171717]"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-[#171717]" : "text-neutral-400"}`} strokeWidth={2.5} />
                <span className="text-[14px]">{item.name}</span>
              </Link>
            );
          })}

          {/* Theme Toggle (Replaces Settings Page) */}
          <button
            onClick={() => setIsDark(!isDark)}
            className={`mt-4 flex items-center justify-between gap-3 px-4 py-3 rounded-[12px] font-medium transition-all duration-300 ${
              isDark ? "bg-[#1E1E1E] text-white border border-white/10" : "bg-neutral-100 text-[#171717] border border-neutral-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-neutral-400" strokeWidth={2.5} />
              <span className="text-[14px]">{isDark ? "Switch Light Mode" : "Switch Dark Mode"}</span>
            </div>
            <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0">
              {isDark ? <Sun className="w-4 h-4 text-orange-500" /> : <Moon className="w-4 h-4 text-[#FFDD33]" />}
            </div>
          </button>
        </nav>

        {/* Bottom Actions */}
        <div className={`p-4 mb-4 flex flex-col gap-2 border-t transition-colors duration-500 ${isDark ? 'border-white/5' : 'border-neutral-100'}`}>
           <Link href="#" className={`flex items-center gap-3 px-4 py-3 rounded-[12px] font-medium transition-all duration-300 ${isDark ? 'text-neutral-500 hover:bg-white/5 hover:text-white' : 'text-neutral-500 hover:bg-[#F9FAFB] hover:text-[#171717]'}`}>
             <LifeBuoy className="w-5 h-5 text-neutral-400" strokeWidth={2.5} />
             <span className="text-[14px]">Support</span>
           </Link>
           <button onClick={handleLogout} className={`flex items-center gap-3 px-4 py-3 rounded-[12px] font-medium text-red-500 transition-all duration-300 w-full text-left ${isDark ? 'hover:bg-red-500/10 hover:text-red-400' : 'hover:bg-red-50 hover:text-red-700'}`}>
             <LogOut className="w-5 h-5 text-red-400" strokeWidth={2.5} />
             <span className="text-[14px]">Logout</span>
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto relative">
        {/* Mobile Header (Visible only on small screens) */}
        <div className={`md:hidden flex items-center justify-between border-b p-4 sticky top-0 z-30 transition-colors duration-500 ${isDark ? 'bg-[#141414] border-white/5' : 'bg-white border-neutral-100'}`}>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/Mainlogo.png" alt="NGQ Assets" width={24} height={24} className="object-contain" />
            <span className={`font-bold text-[16px] tracking-tight ${isDark ? 'text-white' : 'text-[#171717]'}`}>NGQ Admin</span>
          </Link>
          <div className="flex gap-2">
            <button onClick={() => setIsDark(!isDark)} className={`w-10 h-10 flex items-center justify-center rounded-xl border ${isDark ? 'bg-[#1E1E1E] border-white/10' : 'bg-[#F9FAFB] border-neutral-100'}`}>
              {isDark ? <Moon className="w-5 h-5 text-[#FFDD33]" /> : <Sun className="w-5 h-5 text-orange-500" />}
            </button>
            <button className={`w-10 h-10 flex items-center justify-center rounded-xl border ${isDark ? 'bg-white/5 border-white/5 text-white' : 'bg-[#F9FAFB] border-neutral-100 text-[#171717]'}`}>
              <LayoutDashboard className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Page Content injected here (adding a special data attribute for child components to potentially read if they want to adapt) */}
        <div className="flex-1 overflow-x-hidden" data-theme={isDark ? "dark" : "light"}>
          {children}
        </div>
      </main>
    </div>
  );
}
