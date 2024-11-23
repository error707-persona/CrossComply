"use client";

import { useProduct } from "@/store/product";
import Sidebar from "./_components/Sidebar";
import MainArea from "./_components/MainArea";

export default function Home() {
  const productStore = useProduct();
  return (
    <div className="h-screen">
      <div className="p-2 bg-blue-600 text-white font-bold text-2xl">
        <span>CrossComply</span>
      </div>
      {/* <HomeSidebar/> */}
      <div className="flex gap-10 h-4/5">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <MainArea />
      </div>
    </div>
  );
}

