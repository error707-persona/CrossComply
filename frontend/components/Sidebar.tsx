import React, { useState } from 'react'
import {productItems, countryNames} from "../utils/data"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Link from 'next/link'
import { useProduct } from '@/store/product'
import { useRegion } from '@/store/region'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import Dashboard from '@/app/dashboard/page'


const Sidebar = () => {
    const setProduct = useProduct((state)=>state.setProduct)
    const setRegion = useRegion((state)=>state.setRegion)
    const router = useRouter();
    return (
        <div className='p-5 gap-5 flex flex-col h-full'>
           <Select  onValueChange={(value)=>setProduct(value)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Product" />
            </SelectTrigger>
            <SelectContent>
                {productItems.map((value) =>
                    <SelectItem value={value}>{value}</SelectItem>
                )}
            </SelectContent>
        </Select>
        <Select onValueChange={(value)=>setRegion(value)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent>
                {countryNames.map((value) =>
                    <SelectItem value={value}>{value}</SelectItem>
                )}
            </SelectContent>
        </Select>
        <Button className='mt-auto' onClick={()=> <Link href="/dashboard">Dashboard</Link>}>Dashboard</Button>
        </div>
    )
}

export default Sidebar