"use client";

export default function SkeletonLoader() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center relative overflow-hidden w-full inset-0">
      {/* Background glowing orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#FFDD33]/20 rounded-full blur-[100px] animate-pulse" />
      
      <div className="z-10 flex flex-col items-center gap-6 w-full max-w-2xl px-6">
        
        {/* Abstract Header Skeleton */}
        <div className="flex flex-col items-center gap-4 w-full animate-pulse">
           <div className="w-16 h-16 bg-white border border-neutral-200 shadow-sm rounded-3xl flex items-center justify-center">
             <div className="w-8 h-8 bg-neutral-200/50 rounded-xl" />
           </div>
           <div className="h-5 w-40 bg-neutral-200/80 rounded-full mt-2" />
           <div className="h-3 w-56 bg-neutral-200/50 rounded-full" />
        </div>

        {/* Cards Skeleton */}
        <div className="grid grid-cols-2 gap-4 w-full animate-pulse delay-75">
          <div className="h-28 bg-white border border-neutral-200 shadow-sm rounded-3xl" />
          <div className="h-28 bg-white border border-neutral-200 shadow-sm rounded-3xl" />
        </div>

        {/* Main Content Skeleton */}
        <div className="w-full h-40 bg-white border border-neutral-200 shadow-sm rounded-[2rem] animate-pulse delay-150" />
      </div>
    </div>
  );
}
