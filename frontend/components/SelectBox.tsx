import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface SelectProps {
    title: string;
    items: string[];
}
const SelectBox = ({ title, items }: SelectProps) => {
    return (
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={title} />
            </SelectTrigger>
            <SelectContent>
                {items.map((value) =>
                    <SelectItem value="apple">{value}</SelectItem>
                )}
            </SelectContent>
        </Select>
    )
}

export default SelectBox