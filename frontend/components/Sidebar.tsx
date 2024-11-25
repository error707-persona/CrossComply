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
        // const data = await fetch('http://127.0.0.1:8000/dutiesTariffs',
        //     {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json', // Specify JSON format
        //         },
        //         body: JSON.stringify({ query: `What are duties and tariffs requirements for product ${product} and country ${region}`}),
        //     }
        // ).then(res => res.json())
        // .then(val => val.response)
        const data = {
            "results": [
                {
                    "hts8": "94016160",
                    "description": "Seats (o/than chairs) nesoi, w/wooden frames, upholstered",
                    "base": "Free",
                    "category": "G",
                    "safeguard": null
                },
                {
                    "hts8": "94016920",
                    "description": "Seats nesoi, of bent-wood",
                    "base": "Free",
                    "category": "G",
                    "safeguard": null
                },
                {
                    "hts8": "94016940",
                    "description": "Chairs nesoi, w/teak frames, not upholstered",
                    "base": "Free",
                    "category": "G",
                    "safeguard": null
                },
                {
                    "hts8": "94016960",
                    "description": "Chairs nesoi, w/wooden frames (o/than teak), not upholstered",
                    "base": "Free",
                    "category": "G",
                    "safeguard": null
                },
                {
                    "hts8": "94016980",
                    "description": "Seats (o/than chairs) nesoi, w/wooden frames, not upholstered",
                    "base": "Free",
                    "category": "G",
                    "safeguard": null
                },
                {
                    "hts8": "94017100",
                    "description": "Seats nesoi, w/metal frame (o/than of heading 9402), upholstered",
                    "base": "Free",
                    "category": "G",
                    "safeguard": null
                },
                {
                    "hts8": "94017900",
                    "description": "Seats nesoi, w/metal frame (o/than of heading 9402), not upholstered",
                    "base": "Free",
                    "category": "G",
                    "safeguard": null
                },
                {
                    "hts8": "94018020",
                    "description": "Seats nesoi, of reinforced or laminated plastics (o/than of heading 9402)",
                    "base": "Free",
                    "category": "G",
                    "safeguard": null
                },
                {
                    "hts8": "94018040",
                    "description": "Seats nesoi, of rubber or plastics (o/than of reinforced or laminated plastics & o/than of heading 9402)",
                    "base": "Free",
                    "category": "G",
                    "safeguard": null
                },
                {
                    "hts8": "94018060",
                    "description": "Seats nesoi, o/than of wood, or w/metal frame or of rubber or plastics (o/than of heading 9402)",
                    "base": "Free",
                    "category": "G",
                    "safeguard": null
                },
                {
                    "hts8": "94019010",
                    "description": "Parts of seats nesoi, for seats of a kind used for motor vehicles",
                    "base": "Free",
                    "category": "G",
                    "safeguard": null
                },
                {
                    "hts8": "94039025",
                    "description": "Parts of furniture (o/than seats), of cane, osier, bamboo or similar materials",
                    "base": "Free",
                    "category": "G",
                    "safeguard": null
                },
                {
                    "hts8": "94039040",
                    "description": "Parts of furniture (o/than seats or o/than of 9402), of reinforced or laminated plastics",
                    "base": "Free",
                    "category": "G",
                    "safeguard": null
                },
                {
                    "hts8": "94039050",
                    "description": "Parts of furniture (o/than seats or o/than of 9402), of rubber or plastics (o/than reinforced or laminated plastics)",
                    "base": "Free",
                    "category": "G",
                    "safeguard": null
                },
                {
                    "hts8": "94039060",
                    "description": "Parts of furniture (o/than seats or o/than of 9402), of textile material (o/than cotton)",
                    "base": "Free",
                    "category": "G",
                    "safeguard": null
                },
                {
                    "hts8": "94039070",
                    "description": "Parts of furniture (o/than seats or o/than of 9402), of wood",
                    "base": "Free",
                    "category": "G",
                    "safeguard": null
                },
                {
                    "hts8": "94039080",
                    "description": "Parts of furniture (o/than seats or o/than of 9402) nesoi",
                    "base": "Free",
                    "category": "G",
                    "safeguard": null
                },
                {
                    "hts8": "94041000",
                    "description": "Mattress supports",
                    "base": "Free",
                    "category": "G",
                    "safeguard": null
                },
                {
                    "hts8": "94042100",
                    "description": "Mattresses, of cellular rubber or plastics, whether or not covered",
                    "base": "3%",
                    "category": "A",
                    "safeguard": null
                },
                {
                    "hts8": "94042910",
                    "description": "Mattresses, of cotton",
                    "base": "3%",
                    "category": "A",
                    "safeguard": null
                },
                {
                    "hts8": "94042990",
                    "description": "Mattresses (o/than of cellular rubber or plastics or of cotton)",
                    "base": "6%",
                    "category": "A",
                    "safeguard": null
                },
                {
                    "hts8": "94043040",
                    "description": "Sleeping bags, containing 20% or more by weight of feathers and/or down",
                    "base": "4.7%",
                    "category": "A",
                    "safeguard": null
                }
            ]
        }
          setDutiesTariffs(data?.results)
        
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
    // const data = await fetch('http://127.0.0.1:8000/potentialCostSavings',
    //     {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json', // Specify JSON format
    //         },
    //         body: JSON.stringify({ query: `What are cost measures for product ${product} and country ${region}`}),
    //     }
    // ).then(res => res.json()).then(val => val.response)
    const data = [
        {
          title: "Use of Trade Agreements and Preferential Tariffs",
          description:
            "Leverage agreements such as the United States-Mexico-Canada Agreement (USMCA) or Central America-Dominican Republic Free Trade Agreement (CAFTA-DR). These agreements offer preferential duty rates, and furniture imported from countries in these agreements may qualify for reduced or zero duties."
        },
        {
          title: "Customs Duty Drawback Program",
          description:
            "If you're importing furniture and later exporting it (for example, if you’re assembling or customizing it), you may be eligible for a duty drawback, which allows you to recover some or all of the duties paid on imported goods."
        },
        {
          title: "Importing Directly from Low-Tariff Countries",
          description:
            "Source furniture from countries with low tariffs or preferential agreements with the U.S. Researching the country of origin can help you avoid high duties."
        },
        {
          title: "Use of Customs Bond",
          description:
            "A Customs Bond guarantees that the duties, taxes, and fees will be paid on goods imported into the U.S. Using a bond may help avoid delays and penalties."
        },
        {
          title: "Incorporating Furniture Parts (Not Fully Assembled)",
          description:
            "Importing furniture parts rather than fully assembled furniture can sometimes result in lower tariffs, as U.S. tariff codes may have lower rates for parts or components."
        },
        {
          title: "Product Valuation",
          description:
            "Ensure that the valuation of your furniture is correctly declared at customs. Under-declaring or over-declaring can result in fines or higher duties."
        },
        {
          title: "Leverage Tariff Exclusions",
          description:
            "Monitor tariff exclusions that may apply to certain furniture items, which can reduce or eliminate tariffs. Stay updated on new exclusions that may apply."
        },
        {
          title: "Use of U.S. Customs and Border Protection (CBP) Programs",
          description:
            "Programs like C-TPAT and ISA can help improve security and compliance, leading to fewer inspections, faster clearance, and reduced costs."
        },
        {
          title: "Re-Evaluating the Supply Chain",
          description:
            "Optimizing the supply chain can help reduce costs by streamlining transportation and consolidating shipments."
        },
        {
          title: "Bulk Shipping or Consolidated Shipping",
          description:
            "Shipping furniture in bulk or consolidating multiple shipments can reduce overall freight costs, benefiting from economies of scale."
        },
        {
          title: "Alternative Duty Classifications",
          description:
            "Ensure that furniture is classified under the correct HTS code to avoid overpaying for duties. Consult a customs broker for advice on product classifications."
        },
        {
          title: "Third-Party Warehouse Solutions",
          description:
            "Using a third-party warehouse in the U.S. can delay customs duties until the goods are sold, helping manage costs effectively."
        },
        {
          title: "Customs Broker and Legal Assistance",
          description:
            "Hiring a customs broker can help identify potential savings opportunities, ensure compliance, and avoid overpaying for duties, taxes, or fees."
        }
      ];
      setPotentialCostSavings(data)
    console.log("Potential COsts", data)
    }
    const fetchEstimatedCostsData = async() => {
    // const data = await fetch('http://127.0.0.1:8000/estimatedCosts',
    //     {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json', // Specify JSON format
    //         },
    //         body: JSON.stringify({ query: `What are rates for product ${product} and country ${region}`}),
    //     }
    // ).then(res => res.json()).then(val => val.response)
    // console.log("Estimated costs", data)
    const data = {
        "rates": {
            "44170040": {
                "rate": "Free",
                "category": "G"
            },
            "44170060": {
                "rate": "Free",
                "category": "G"
            },
            "44170080": {
                "rate": "5.1%",
                "category": "A"
            },
            "44181000": {
                "rate": "3.2%",
                "category": "A"
            },
            "44182040": {
                "rate": "4.8%",
                "category": "A"
            },
            "44182080": {
                "rate": "4.8%",
                "category": "A"
            },
            "44183000": {
                "rate": "Free",
                "category": "G"
            },
            "44184000": {
                "rate": "3.2%",
                "category": "A"
            },
            "44185000": {
                "rate": "Free",
                "category": "G"
            },
            "44189020": {
                "rate": "Free",
                "category": "G"
            },
            "44189045": {
                "rate": "3.2%",
                "category": "A"
            },
            "44190040": {
                "rate": "5.3%",
                "category": "A"
            },
            "44190080": {
                "rate": "3.2%",
                "category": "A"
            },
            "44201000": {
                "rate": "3.2%",
                "category": "A"
            },
            "44209020": {
                "rate": "Free",
                "category": "G"
            },
            "44209045": {
                "rate": "4.3%",
                "category": "A"
            },
            "44209065": {
                "rate": "Free",
                "category": "G"
            },
            "44209080": {
                "rate": "3.2%",
                "category": "A"
            },
            "44211000": {
                "rate": "3.2%",
                "category": "A"
            },
            "44219010": {
                "rate": "Free",
                "category": "G"
            },
            "44219015": {
                "rate": "Free",
                "category": "G"
            },
            "44219020": {
                "rate": "4.9%",
                "category": "A"
            },
            "44219030": {
                "rate": "10.7%",
                "category": "A"
            },
            "44219040": {
                "rate": "5.1%",
                "category": "A"
            },
            "44219050": {
                "rate": "Free",
                "category": "G"
            },
            "94016160": {
                "rate": "Free",
                "category": "G"
            },
            "94016920": {
                "rate": "Free",
                "category": "G"
            },
            "94016940": {
                "rate": "Free",
                "category": "G"
            },
            "94016960": {
                "rate": "Free",
                "category": "G"
            },
            "94016980": {
                "rate": "Free",
                "category": "G"
            },
            "94017100": {
                "rate": "Free",
                "category": "G"
            },
            "94017900": {
                "rate": "Free",
                "category": "G"
            },
            "94018020": {
                "rate": "Free",
                "category": "G"
            },
            "94018040": {
                "rate": "Free",
                "category": "G"
            },
            "94018060": {
                "rate": "Free",
                "category": "G"
            },
            "94019010": {
                "rate": "Free",
                "category": "G"
            },
            "94039025": {
                "rate": "Free",
                "category": "G"
            },
            "94039040": {
                "rate": "Free",
                "category": "G"
            },
            "94039050": {
                "rate": "Free",
                "category": "G"
            },
            "94039060": {
                "rate": "Free",
                "category": "G"
            },
            "94039070": {
                "rate": "Free",
                "category": "G"
            },
            "94039080": {
                "rate": "Free",
                "category": "G"
            },
            "94041000": {
                "rate": "Free",
                "category": "G"
            },
            "94042100": {
                "rate": "3%",
                "category": "A"
            },
            "94042910": {
                "rate": "3%",
                "category": "A"
            },
            "94042990": {
                "rate": "6%",
                "category": "A"
            },
            "94043040": {
                "rate": "4.7%",
                "category": "A"
            }
        }
    }
      const ratesArray = Object.entries(data.rates).map(([code, details]) => ({
        code,
        ...details,
      }));
        setEstimatedCosts(ratesArray)
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