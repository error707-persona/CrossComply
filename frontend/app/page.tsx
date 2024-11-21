import Image from "next/image";
import Sidebar from "./components/Sidebar";
import MainArea from "./components/MainArea";

export default function Home() {
  return (
    <div className="p-5 h-screen">
      <span>CrossComply</span>
      <div className="flex gap-10">
        <div className="w-1/5">
          <Sidebar/>
        </div>
      
      <div className=""><MainArea/></div>
      </div>
      
      
      
    </div>
  );
}
