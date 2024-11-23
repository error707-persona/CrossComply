"use client"
import React, { useState } from 'react'
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


const IncentiveAndGrants = () => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [incentiveList, setincentiveList] = useState<string[]>([]);
    console.log(incentiveList)
    return (
        <div className='w-full overflow-auto mt-5'>
            <div>
                <h1 className='font-bold'>Applicable Schemes</h1>
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
                            : "Select Scheme..."}
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
           
            <div className='flex flex-col gap-5 my-5'>
                {incentiveList.map((item) => (
                    <div className='border border-black rounded p-2 w-[500px]'>{item}</div>
                ))}
            </div>

            <div className='mt-10'>
                <Button>Next</Button>
            </div>
        </div>
    )
}

export default IncentiveAndGrants