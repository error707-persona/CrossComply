import React, { useState } from 'react'
import SelectBox from '../_components/SelectBox'
import {productItems, countryNames} from "../utils/data"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useProduct } from '@/app/store/product'
import { useRegion } from '../store/region'

const Sidebar = () => {
    const setProduct = useProduct((state)=>state.setProduct)
    const setRegion = useRegion((state)=>state.setRegion)
    return (
        <div className='p-5 gap-5 flex flex-col'>
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
        </div>
    )
}

export default Sidebar