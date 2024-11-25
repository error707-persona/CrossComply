"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { exportIncentiveSchemes } from "@/utils/data";
import { Input } from "./ui/input";
import { useRegion } from "@/store/region";
import { useProduct } from "@/store/product";
import { Spinner } from "./ui/spinner";

const IncentiveAndGrants = () => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");
    const [incentiveList, setincentiveList] = useState<string[]>([]);
    const [productValue, setProductValue] = useState<Number>(0);
    const [curValue, setCurValue] = useState<any>(0);
    const [incentivesData, setIncentivesData] = useState<any[]>([]);
    const product = useProduct((state) => state.product);
    const region = useRegion((state) => state.region);
    console.log(incentivesData);
    const data = `1. RoDTEP Scheme (Reduced Distribution Tariff for Export Promotion):\n\t* Eligible products: Various agricultural products, including lentils, broad beans, horse beans, guar seeds, and more.\n\t* Incentive rate: 0.8-1.5 cents/kg\n\t* Eligibility criteria: Products must be used for sowing or consumed during a specific period (May 1 to August 31).\n2. Free imports:\n\t* Eligible products: Noils of wool or fine animal hair, carded wool, combed wool in fragments, and more.\n\t* Incentive rate: Free\n3. Grants for machinery and equipment:\n\t* Eligible products: Threshing machinery, root or tuber harvesting machines, harvesting machinery, and more.\n\t* Incentive rate: Free`
    const dummy = data.split("\n").filter((item) => item.trim() !== "").map((item)=>item)
    console.log(dummy)
    useEffect(() => {
        const fetchIncentivesData = async () => {
            
            try {
                const response = await fetch(
                    "http://127.0.0.1:8000/get_incentives_data",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            query: `Give me list of all incentives and grants schemes granted by government applicable for ${product} and in this ${region}`,
                        }),
                    },
                );
                let data = await response.json();
                if (data) {
                    if (data.details.error)
                        console.log(data)
                    else{
                        // console.log(data);
                      let displayData = data.detail.split("\n").splice(3);
                      console.log(displayData);
                    }
                    
                }
                setIncentivesData(data);
            } catch (error) {
                console.error("Error fetching incetives data:", error);
            }
        };
        fetchIncentivesData();
    }, [product, region]);
    return (
        <div className="w-full h-full overflow-y-auto p-5">
            <div>
                <h1 className="font-bold">Applicable Schemes</h1>
            </div>
            <div className="`">
                {dummy.map((item)=>(
                    <div>{item.replace("\t","")}</div>
                ))}
                {/* {incentivesData.length === 0 ? (
                    <Spinner />
                ) : (
                    incentivesData
                        .map((item: string) => item.trim())
                        .filter((item) => item.trim() !== "")
                        .map((item) => <div>{item}</div>)
                )} */}
            </div>
            <h1 className="font-bold my-5">Cost Estimation After Incentives</h1>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[500px] justify-between"
                    >
                        {value
                            ? exportIncentiveSchemes.find((item) => item === value)
                            : "Select Scheme..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[500px] p-0">
                    <Command>
                        <CommandInput placeholder="Search Scheme..." className="w-full" />
                        <CommandList>
                            <CommandEmpty>No Scheme found.</CommandEmpty>
                            <CommandGroup>
                                {exportIncentiveSchemes.map((item) => (
                                    <CommandItem
                                        key={item}
                                        value={item}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue);
                                            setOpen(false);
                                            setincentiveList((prevValues) => [...prevValues, item]);
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === item ? "opacity-100" : "opacity-0",
                                            )}
                                        />
                                        {item}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            <div className='flex flex-col gap-5 mt-5'>
                {incentiveList.map((item) => (
                    <div className='border border-black rounded p-2 w-[500px]'>{item}</div>
                ))}
            </div>
            <div className='flex items-center justify-center mt-5 w-fit'>
                <Input type="number" onChange={(e) => {
                    // @ts-expect-error
                    setCurValue((e.target.value) * (1 - 0.008))
                    
                    }} className='w-96 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' placeholder="Product Value" /> <Button className="ml-5" onClick={() => setProductValue(curValue)}>Calculate Cost</Button>
            </div>
            <Input type="text" className='w-96 mt-5' disabled placeholder={curValue} />
            <div className='mt-10 flex flex-col gap-5 w-28'>
                <Button>Next</Button>
            </div>
        </div>
    )
}

export default IncentiveAndGrants;
