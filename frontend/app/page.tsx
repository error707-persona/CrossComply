import Image from "next/image";
import Sidebar from "./components/Sidebar";
import MainArea from "./components/MainArea";

export default function Home() {
  return (
    <div className="h-screen">
      <div className="p-2 bg-blue-600 text-white font-bold text-2xl">
        <span>CrossComply</span>
      </div>
      
      <div className="flex gap-10 h-4/5">
        <div className="w-1/5">
          <Sidebar/>
        </div>
      <MainArea/>
      </div>
    </div>
  );
}
