"use client"
import React, { useState, useEffect } from 'react';
import { Checkbox } from "@/components/ui/checkbox"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { useProduct } from "@/store/product"
import { useRegion } from "@/store/region";
import { Spinner } from '@/components/ui/spinner';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useResponse } from '@/store/response';
import { doc, setDoc } from "firebase/firestore";
import {db} from "../firebase"
import { useCommonDataStore } from "@/store/CommonData";

const FormSchema = z.object({
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
    }),
})

export default function ComplianceRequirements() {
    // const [selectList, setselectList] = useState<string[]>([]);
    // console.log(selectList, "selected items");
    const [checkedItems, setCheckedItems] = useState([]);
    const {complianceData, selectList, setSelectList} = useCommonDataStore();

    const form = useForm<z.infer<typeof FormSchema>>({
            resolver: zodResolver(FormSchema),
            defaultValues: {
                items: [],
            },
        })

        const { region } = useRegion();
        const { product } = useProduct();
        const {compliance} = useResponse();

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        console.log(data, "complaince data")
        await setDoc(doc(db, "cities", "LA"), {
            name: "Los Angeles",
            state: "CA",
            country: "USA"
          });
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    // Function to structure the response data
function structureComplianceData(responseText) {
    const lines = responseText.split('\n');  // Split the response into lines
    let structuredData = [];
    let currentSection = null;
    let currentItem = null;


    // Loop through each line of the response text
    lines.forEach((line) => {
        line = line.trim();  // Trim leading and trailing spaces

        if (line.startsWith("**")) {
            // Section title (e.g., **Pre-Export Compliance Requirements**)
            if (currentSection) {
                structuredData.push(currentSection);  // Push the previous section
            }
            currentSection = {
                id: line.replace(/[^\w\s]/g, '').toLowerCase(), // Remove special chars and make it lowercase
                label: line.replace(/[\*\*]/g, '').trim(), // Remove asterisks and trim
                items: []
            };
        } else if (line.startsWith("1.") || line.startsWith("2.") || line.startsWith("3.")) {
            // Compliance points like "Check product classification"
            if (currentSection && currentItem) {
                currentSection.items.push(currentItem);  // Add the current item to the section
            }
            currentItem = {
                label: line.replace(/^\d+\./, '').trim(),  // Clean up the numbering and trim spaces
                options: []  // Initialize an empty array for options
            };
        } else if (line.startsWith("*")) {
            // Options listed with a bullet point (e.g., HS Codes, flame retardants, etc.)
            if (currentItem) {
                const optionText = line.replace(/^\*+/, '').trim();  // Clean up the leading '*' and trim
                currentItem.options.push(optionText);
            }
        }
    });

    // Add the last section/item to the structured data
    if (currentItem && currentSection) {
        currentSection.items.push(currentItem);
    }
    if (currentSection) {
        structuredData.push(currentSection);
    }
    console.log(structuredData)
    return structuredData;
}

    const [complianceData, setComplianceData] = useState<any[]>([]);

    useEffect(() => {
        const fetchComplianceData = async () => {

            try {
                const response = await fetch('http://127.0.0.1:8000/get_compliance_data',{
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body:JSON.stringify({ query:`Give me a checklist if i want to export ${product} in ${region}` }),
                });
                const data = await response.json();
                // Structuring the response
                const structuredComplianceData = structureComplianceData(data.complianceData);
                // Log the structured data to see the result
                console.log("Compliance Data:", structuredComplianceData);
                setComplianceData(structuredComplianceData);
            }catch (error) {
                console.error("Error fetching compliance data:", error);
            }
        }

        fetchComplianceData()
    }, [product, region]);

    return(
        <>
            <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
            control={form.control}
            name="items"
            render={() => (
                <FormItem>
                    <div className="mb-4">
                        <FormLabel className="text-base">Compliance Requirements</FormLabel>
                        <FormDescription>
                            Ensure your product matches these regulations for a smooth export process.
                        </FormDescription>
                    </div>
                    {complianceData?.length > 0 ? (
                        complianceData.map((section) => (
                            <div key={section.id} className="space-y-4">
                                {/* Section Header */}
                                <h3 className="text-lg font-semibold">{section.label}</h3>

                                {/* Render Items within the Section */}
                                {section.items.map((item) => (
                                    <FormField
                                        key={item.label}
                                        control={form.control}
                                        name={`items.${section.id}.${item.label}`}
                                        render={({ field }) => {
                                            const value = field.value || []; // Ensure field.value is an array

                                            return (
                                                <div key={item.label} className="space-y-2">
                                                    {/* Item Checkbox */}
                                                    <FormItem className="flex items-start space-x-3">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={value.includes(item.label)} // Check if item is in the value array
                                                                onCheckedChange={(checked) => {
                                                                    // Update field value based on checkbox status

                                                                    if (checked) {
                                                                        setCheckedItems((prev)=>[...prev, item.label])
                                                                        field.onChange([...value, item.label]);
                                                                    } else {
                                                                        field.onChange(value.filter((val) => val !== item.label));
                                                                    }
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">{item.label}</FormLabel>
                                                    </FormItem>

                                                    {/* Sub-options as Checkboxes (if any) */}
                                                    {item.options?.length > 0 && (
                                                        <div className="ml-6 space-y-2">
                                                            {item.options.map((option, idx) => {
                                                                return (
                                                                    <FormField
                                                                        key={idx}
                                                                        control={form.control}
                                                                        name={`items.${section.id}.${item.label}.options.${idx}`}
                                                                        render={({ field }) => {
                                                                            const subValue = field.value || []; // Default to empty array if no value exists
                                                                            return (
                                                                                <FormItem className="flex items-center space-x-3">
                                                                                    <FormControl>
                                                                                        <Checkbox
                                                                                            checked={subValue.includes(option)} // Dynamically check if option is selected
                                                                                            onCheckedChange={(checked) => {
                                                                                                let updatedSubValue;

                                                                                                if (checked) {
                                                                                                    // Add the option to the subValue array
                                                                                                    updatedSubValue = [...subValue, option];
                                                                                                } else {
                                                                                                    // Remove the option from the subValue array
                                                                                                    updatedSubValue = subValue.filter(
                                                                                                        (val) => val !== option
                                                                                                    );
                                                                                                }

                                                                                                // Update the form field value
                                                                                                field.onChange(updatedSubValue);

                                                                                                // Update the checked items
                                                                                                setCheckedItems((prev) => {
                                                                                                    const newCheckedItems = checked
                                                                                                        ? [...prev, option] // Add new option
                                                                                                        : prev.filter((item) => item !== option); // Remove option
                                                                                                    setSelectList(newCheckedItems); // Synchronize selectList
                                                                                                    return newCheckedItems;
                                                                                                });
                                                                                            }}
                                                                                        />
                                                                                    </FormControl>
                                                                                    <FormLabel className="font-normal">{option}</FormLabel>
                                                                                </FormItem>
                                                                            );
                                                                        }}
                                                                    />
                                                                );
                                                            })}
                                                        </div>
                                                    )}

                                                </div>
                                            );
                                        }}
                                    />
                                ))}
                            </div>
                        ))
                    ) : (
                        <Spinner><p>Loading compliance requirements...</p></Spinner>

                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
        <Button type="submit">Submit</Button>
    </form>
            </Form>

        </>
    )
}