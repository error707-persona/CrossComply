"use client"
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { exportIncentiveSchemes } from '@/utils/data'
import { Input } from './ui/input'
import { useRegion } from '@/store/region'
import { useProduct } from '@/store/product'
import { Spinner } from './ui/spinner'


const IncentiveAndGrants = () => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [incentiveList, setincentiveList] = useState<string[]>([]);
    const [productValue, setProductValue] = useState<Number>(0);
    const [curValue, setCurValue] = useState<any>(0);
    const [incentivesData, setIncentivesData] = useState<any[]>([]);
    const product = useProduct((state) => state.product)
    const region = useRegion((state) => state.region)
    console.log(incentivesData)

    useEffect(() => {
        const fetchIncentivesData = async () => {
            try {

                const response = await fetch('http://127.0.0.1:8000/get_incentives_data', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ query: `Give me list of all incentives and grants schemes granted by government applicable for ${product} and in this ${region} and write #Cost: followed by the final cost after applying for these schemes that I'm passing in Array with product value ${productValue}` }),
                });
                const data = await response.json();
                if (data) {
                    let displayData = data.detail.split("\n").filter((item:string) => item.trim() !== "").splice(3);
                    console.log(displayData);
                }
                setIncentivesData(data);

            } catch (error) {
                console.error("Error fetching incetives data:", error);
            }
        }
        fetchIncentivesData()
    }, [product, region]);
    return (
        <div className='w-full h-full overflow- p-5'>
            <div>
                <h1 className='font-bold'>Applicable Schemes</h1>
            </div>
            <div>
            {/* {['', '1. RoDTEP Scheme (Reduced Distribution and Transportation Incentive Policy)', '\t* Eligible products: Various agricultural product…broad beans, horse beans, guar seeds, and others.', '\t* Incentives:', '\t\t+ 0.8 cents/kg for lentil seeds', '\t\t+ 1.5 cents/kg for dried lentils, shelled', '\t\t+ 1.2 cents/kg for dried leguminous vegetables n…i, shelled (if entered during May 1 to August 31)', '\t\t+ 0.15 cents/kg for seeds of broad beans and horse beans', '\t* #Cost: Array with product value 0', '', '2. Free Incentives:', '\t* No cost associated with these incentives.', '', '3. Other Schemes:', '\t* No specific information is available about other schemes in the provided context.', '', "Please note that the RoDTEP Scheme's overall budge…sary calibrations and revisions made as required.", '', "To provide a more accurate response, I would need …ovide more details, I'd be happy to help further."].filter((item) => item.trim() !== "").map((item) => (
                    <div>
                        {item}
                    </div>
                ))} */}
                {(incentivesData.length === 0) ? <Spinner /> : incentivesData.filter((item) => item.trim() !== "").map((item) => (
                    <div>
                        { item.replace(/[^a-zA-Z0-9 ]/g, "")}
                    </div>
                ))}
            </div>
            <h1 className='font-bold my-5'>Cost Estimation After Incentives</h1>
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
                            : "Select Schemes you want to apply..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[500px] p-0">
                    <Command>
                        <CommandInput placeholder="Search Scheme..." className='w-full' />
                        <CommandList>
                            <CommandEmpty>No Scheme found.</CommandEmpty>
                            <CommandGroup>
                                {exportIncentiveSchemes.map((item) => (
                                    <CommandItem
                                        key={item}
                                        value={item}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue)
                                            setOpen(false)
                                            setincentiveList((prevValues) => [...prevValues, item])
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === item ? "opacity-100" : "opacity-0"
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
            <div className='flex items-center justify-center w-fit'>
                <Input type="number" onChange={(e) => setCurValue(e.target.value)} className='w-96 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' placeholder="Product Value" /> <Button className="ml-5" onClick={() => setProductValue(curValue)}>Calculate Cost</Button>
            </div>

            <Input type="text" className='w-96 mt-5' disabled placeholder={(curValue > 0) ? "Calculating cost..." : "Enter and click submit to start calculating.."} />
            <div className='mt-10 flex flex-col gap-5 w-28'>

                <Button>Next</Button>
            </div>
        </div>
    )
}

export default IncentiveAndGrants