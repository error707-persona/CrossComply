"use client";

import MainArea from "@/components/MainArea";
import Sidebar from "@/components/Sidebar";
import { useProduct } from "@/store/product";
import Dashboard from "./dashboard/page";

export default function Home() {
  const productStore = useProduct();
  return (
    <div className="h-screen border-2 flex flex-col">
      <div className="p-2 bg-blue-600 text-white font-bold text-2xl">
        <span>CrossComply</span>
      </div>
      <div className="flex gap-16 relative h-full">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <MainArea />
      </div>
      {/* <Dashboard/> */}
    </div>
  );
}

