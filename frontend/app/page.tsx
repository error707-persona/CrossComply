"use client";

import Image from "next/image";
import EmptySVG from "@/assets/empty.svg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HomeSidebar } from "./_components/HomeSidebar";
import { useProduct } from "@/store/product";
import { Button } from "@/components/ui/button";

export default function Home() {
  const productStore = useProduct();

  return (
    <HomeSidebar breadcrumbs={[{ title: "Dashboard" }]}>
      {!productStore.product && <Empty />}
    </HomeSidebar>
  );
}

export function Empty() {
  return (
    <div className="pt-8 pb-16 rounded flex flex-col items-center justify-center">
      <Image className="max-w-[300px]" src={EmptySVG} alt="Empty" />
      <div className="text-center mb-8">
        <h1 className="text-3xl tracking-tight font-bold mb-2">
          No Product Found
        </h1>
        <p>Sorry, no product was added.</p>
        <p>Please add product details and try again.</p>
      </div>
      <Button size={"lg"}>Add Product Details</Button>
    </div>
  );
}
