"use client";
// app/page.js
import Image from "next/image";
import Dashboard from "../app/components/Dashboard";
import WelcomePage from "./WelcomePage";
import { useAuth } from "./context/AuthContext";
import ChatBox from './components/Chat/ChatBox.js';
import { useState } from 'react';

import { systemState } from "./data/system_state";

export default function Home() {
  const { isAuthenticated } = useAuth();

  const [state, setState] = useState(systemState);


  if (!isAuthenticated) {
    return <WelcomePage />;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        <Dashboard state={state} setState={setState}/>
      </main>
      <ChatBox state={state} setState={setState}/>
    </div>
  );
}
