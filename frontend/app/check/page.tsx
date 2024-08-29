"use client";
import React from "react";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";
import { SignupFormDemo } from "@/components/signup";
import AuthPage from "@/components/AuthPage";
import { AuthProvider } from "@/contexts/AuthContext";

export default function Home() {
  return (
    <main className=" min-h-screen min-w-screen">
        <AuthProvider>
    <AuthPage />
    </AuthProvider>
    </main>
  );
}
