"use client";

import MainArea from "@/components/MainArea";
import Sidebar from "@/components/Sidebar";
import { useProduct } from "@/store/product";
import Dashboard from "./dashboard/page";
import { CircleUserRound } from "lucide-react";

export default function Home() {
  const productStore = useProduct();
  return (
    <div className="h-screen flex flex-col">
      <div className="p-2 flex bg-blue-600 text-white font-bold text-2xl">
        <span>CrossComply</span>
        <div className="mr-5 ml-auto">
           <CircleUserRound/>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-16 relative h-full">
        <div className=" flex items-center w-1/5">
          <Sidebar />
        </div>
        <MainArea />
      </div>
    </div>
  );
}

