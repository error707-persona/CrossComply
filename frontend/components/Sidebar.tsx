"use client"
import React, { useState, useEffect } from 'react';
import { productItems, countryNames } from "../utils/data"
import { Button } from './ui/button'
import ComboBox from './ComboBox'
import { useRouter } from 'next/navigation'
import { useRegion } from "@/store/region"
import { useProduct } from "@/store/product"
import { useResponse } from '@/store/response';
import { useCommonDataStore } from '@/store/CommonData';


const Sidebar = () => {
    const router = useRouter()
//     const [dutiesTariffs, setDutiesTariffs] = useState('')
//   const [potentialCostSavings, setPotentialCostSavings] = useState('')
//   const [estimatedCosts, setEstimatedCosts] = useState('')
//   const [complianceData, setComplianceData] = useState<any[]>([]);
const { setDutiesTariffs, dutiesTariffs, selectList, setComplianceData, complianceData, setPotentialCostSavings, potentialCostSavings, setEstimatedCosts, estimatedCosts } = useCommonDataStore();
  const { region } = useRegion();
  const { product } = useProduct();
  const {compliance} = useResponse();
  const productStore = useProduct();

  const structureComplianceData = (responseText:string) => {
    type currentSectionType = {
        id: string,
        label: string,
        items: any[]
      };
      type currentItemType = {
        label: string,
        options: string[]
      };
    const lines = responseText.split('\n');  // Split the response into lines
    let structuredData:currentSectionType[] = [];
    let currentSection:currentSectionType|null=null;
    let currentItem:currentItemType|null=null;
    

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
        // @ts-expect-error
        currentSection.items.push(currentItem);
    }
    if (currentSection) {
        structuredData.push(currentSection);
    }
    console.log(structuredData)
    return structuredData;
  }

    const fetchData = async() => {
        const data = await fetch('http://127.0.0.1:8000/dutiesTariffs',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Specify JSON format
                },
                body: JSON.stringify({ query: `What are duties and tariffs requirements for product ${product} and country ${region}`}),
            }
        ).then(res => res.json())
        .then(val => setDutiesTariffs(val.response))
        console.log("data", data)
    }
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
    } catch (error) {
        console.error("Error fetching compliance data:", error);
    }
    }
    const fetchPotentialCostSavingsData = async() => {
    const data = await fetch('http://127.0.0.1:8000/potentialCostSavings',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Specify JSON format
            },
            body: JSON.stringify({ query: `What are potential cost savings for product ${product} and country ${region}`}),
        }
    ).then(res => res.json()).then(val => setPotentialCostSavings(val.response))
    console.log("data", data)
    }
    const fetchEstimatedCostsData = async() => {
    const data = await fetch('http://127.0.0.1:8000/estimatedCosts',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Specify JSON format
            },
            body: JSON.stringify({ query: `What are rates for product ${product} and country ${region}`}),
        }
    ).then(res => res.json()).then(val => setEstimatedCosts(val.response))
    console.log("data", data)
    }
    const handleSubmit = () => {
        if(product && region) {
        fetchData();
        fetchComplianceData();
        fetchPotentialCostSavingsData();
        fetchEstimatedCostsData();
        }
        
    }
    const shouldClick = () => {
        if(selectList?.length) {
            return false
        } else {
            return true
        }
    }
    const checkSubmit = () => {
        if(product && region) {
            return false
        }
        return true
    }
    return (
        <div className='p-5 gap-5 flex flex-col h-full'>
            <ComboBox title='Product' items={productItems}/>
            <ComboBox title='Region' items={countryNames}/>
            <Button className='mt-auto' disabled={checkSubmit()} onClick={handleSubmit}>Submit</Button>
            <Button disabled={shouldClick()} className='mt-auto' onClick={() => router.push('/dashboard')}>Dashboard</Button>
        </div>
    )
}

export default Sidebar