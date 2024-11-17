"use client";
// app/page.js
import Image from "next/image";
import Dashboard from "../app/components/Dashboard";
import WelcomePage from "./WelcomePage";
import { useAuth } from "./context/AuthContext";

export default function Home() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <WelcomePage />;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Dashboard />
      </main>
    </div>
  );
}
