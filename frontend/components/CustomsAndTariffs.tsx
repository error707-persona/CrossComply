import { useEffect, useState } from "react";
import { useProduct } from "@/store/product";
import { useRegion } from "@/store/region";
import { Spinner } from "./ui/spinner";
import { useCommonDataStore } from "@/store/CommonData";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CustomsAndTariffs = () => {
  const { region } = useRegion();
  const { product } = useProduct();
  const { dutiesTariffs, potentialCostSavings, estimatedCosts } = useCommonDataStore();

  return (
    <div className="flex flex-wrap justify-between">
      {/* Customs Duties and Tariffs */}
      <div className="flex flex-col border-2 m-4 w-full sm:w-[48%] lg:w-[30%]">
        <h1 className="p-2 font-bold">Breaked Down estimated customs duties and tariffs</h1>
        <div>
       
          {// @ts-expect-error
          dutiesTariffs?.length > 0 ? (
            // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div>
                
              {// @ts-expect-error
              dutiesTariffs.map((item:any) => (
              
                <Card key={item.hts8} className="m-2 hover:shadow-lg transition">
                  <CardHeader>
                
                    <CardTitle>{item.hts8}</CardTitle>
                 
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                 
                      <span className="font-semibold">Base Rate:</span> {item.base}
                    </p>
                    <p>
                   
                      <span className="font-semibold">Category:</span> {
                      item.category}
                    </p>
                    
                    {
                    item.safeguard && (
                      <p>
                        
                        <span className="font-semibold">Safeguard:</span> {
                        item.safeguard}
                      </p>
                    )}
                  </CardContent>
                  <CardFooter>
                 
                    <p className="text-sm text-gray-500">Details for HTS Code {
                    item.hts8}</p>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Spinner />
          )}
        </div>
      </div>

      {/* Suggested Potential Cost Saving Measures */}
      <div className="flex flex-col border-2 m-4 w-full sm:w-[48%] lg:w-[30%]">
        <h1 className="p-2 font-bold">Suggested Potential Cost Saving Measures</h1>
        <div>
        
          {// @ts-expect-error
          potentialCostSavings?.length > 0
            ? (
                <div className="">
                {potentialCostSavings?.map((item) => (
                    <div className="p-4 m-2 border rounded-md shadow-sm hover:shadow-lg transition">
                      
                    <h2 className="font-bold text-xl">{ // @ts-expect-error 
                    item.title}</h2>
                    <p className="mt-2">{ // @ts-expect-error
                    item.description}</p>
                </div>
      ))}
    </div>
            )
            : <Spinner />}
        </div>
      </div>

      {/* Estimated Costs Table */}
      <div className="flex flex-col border-2 m-4 w-full sm:w-[48%] lg:w-[30%]">
        <h1 className="p-2 font-bold">Estimated Costs</h1>
        <div>
          {estimatedCosts ? (
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Code</TableHead>
                    <TableHead className="text-left">Rate</TableHead>
                    <TableHead className="text-left">Category</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {estimatedCosts.map((item) => (
                    // @ts-expect-error
                    <TableRow key={item.code}>
                
                      <TableCell className="font-medium">{// @ts-expect-error
                      item.code}</TableCell>
                      <TableCell>{// @ts-expect-error
                      item.rate}</TableCell>
                      
                      <TableCell>{// @ts-expect-error
                      item.category}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomsAndTariffs;
