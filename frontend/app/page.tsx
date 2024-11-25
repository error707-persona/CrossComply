"use client";

import MainArea from "@/components/MainArea";
import Sidebar from "@/components/Sidebar";
import { CircleUserRound } from "lucide-react";

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <div className="p-2 flex fixed w-full bg-blue-600 text-white font-bold text-2xl">
        <span>CrossComply</span>
        <div className="mr-5 ml-auto">
           <CircleUserRound/>
        </div>
      </div>
      <div className="flex mt-10 flex-col md:flex-row gap-16 h-full">
        <div className=" flex items-center w-1/5">
          <Sidebar />
        </div>
        <MainArea />
      </div>
    </div>
  );
}

