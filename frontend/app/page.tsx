"use client";
import React from "react";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";
import { SignupFormDemo } from "@/components/signup";
import { AuthProvider } from "@/contexts/AuthContext";

export default function Home() {
  return (
    <AuthProvider>
    <main className=" min-h-screen min-w-screen">
    <div className="min-h-screen relative w-full overflow-hidden  rounded-lg bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-teal-300 via-blue-300 to-white">
      <div className=" inset-0 w-full h-full  pointer-events-none" />
      <Boxes />
      <div className="flex w-screen h-screen justify-between px-20 pt-30 items-center">
  <div>
    <p className={cn("md:text-5xl text-xl text-black font-bold relative z-20 pb-5")}>
      Welcome to <span className=" text-amber-600">EduVerse</span>
    </p>
    <p className={cn("md:text-3xl text-xl font-bold text-black relative z-20")}>
      Where <span className={cn("md:text-3xl text-xl font-bold  text-blue-700 relative z-20")}>
        Excellence
      </span> meets <span className={cn("md:text-3xl text-xl font-bold  text-blue-700 relative z-20")}>
        Companionship
      </span>
    </p>
  </div>
  <div className="z-20  justify-center items-center">
    <SignupFormDemo />
  </div>
</div>

    </div>
    </main>
    </AuthProvider>
  );
}
