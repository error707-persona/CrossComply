import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { useProduct } from '@/store/product'
import { useRegion } from '@/store/region'

interface ComboBoxProps {
    title: string;
    items: string[];
}

const ComboBox = ({ title, items }: ComboBoxProps) => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const setProduct = useProduct((state) => state.setProduct)
    const setRegion = useRegion((state) => state.setRegion)
    console.log(useProduct((state) => state.product))
    console.log(useRegion((state) => state.region))
    const prompt = `Select ${title}...`;
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? items.find((item) => item === value)
                        : prompt}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command >
                    <CommandInput placeholder={prompt} />
                    <CommandList>
                        <CommandEmpty>No {title} found.</CommandEmpty>
                        <CommandGroup>
                            {items.map((item) => (
                                <CommandItem
                                    key={item}
                                    value={item}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                        if (title === "Product")
                                            setProduct(item)
                                        else
                                            setRegion(item)
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
    )
}

export default ComboBox