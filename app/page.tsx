import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import TradingViewTicker from "@/components/TradingViewTicker";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="font-sans antialiased text-neutral-900 selection:bg-[#FFDD33] selection:text-black">
      <main className="flex flex-col min-h-screen bg-white overflow-hidden">
        <Navbar />
        <Hero />
        <Features />
        <section className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-[#171717] mb-6 text-center">Global Market Overview</h2>
          <TradingViewTicker />
        </section>
        <Footer />
      </main>
    </div>
  );
}
