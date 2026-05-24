export default function ComingSoonPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
        <div className="mb-8">
          <span className="px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 text-sm font-medium tracking-wide text-zinc-400 uppercase shadow-lg backdrop-blur-sm">
            Exciting Updates Ahead
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
          We're building something <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">extraordinary</span>.
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-xl mx-auto leading-relaxed">
          Our team is working hard behind the scenes to bring you a completely revamped, premium experience. We can't wait to share it with you.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
          <p className="text-sm font-semibold tracking-widest text-zinc-500 uppercase">Coming Very Soon</p>
          <div className="h-1 w-16 bg-gradient-to-l from-blue-500 to-purple-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
