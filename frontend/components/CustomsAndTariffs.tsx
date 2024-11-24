import { useEffect, useState } from "react"
import { useProduct } from "@/store/product"
import { useRegion } from "@/store/region"; 
import { Spinner } from "./ui/spinner";

const CustomsAndTariffs = () => {
    const [dutiesTariffs, setDutiesTariffs] = useState('')
    const [potentialCostSavings, setPotentialCostSavings] = useState('')
    const [estimatedCosts, setEstimatedCosts] = useState('')
    const { region } = useRegion();

    const { product } = useProduct();

    console.log("Country and Product", region, product)

    useEffect(() => {
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

        fetchData()
    }, [product, region])

    useEffect(() => {
        const fetchData = async() => {
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

        fetchData()
    }, [product, region])

    useEffect(() => {
        const fetchData = async() => {
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

        fetchData()
    }, [product, region])
    return (
        <>
            <div className='flex w-[100%]'>
                <div className='flex flex-col border-2 m-4'>
                    <h1 className="p-2 font-bold">Breaked Down estimated customs duties and tariffs</h1>
                    <div>
                        {(dutiesTariffs!=='')?dutiesTariffs:<Spinner/>}
                    </div>
                </div>

                <div className='flex flex-col border-2 m-4'>
                    <h1 className="p-2 font-bold">Suggested Potential Cost Saving Measures</h1>
                    <div>
                        {(potentialCostSavings!=='')?potentialCostSavings:<Spinner/>}
                    </div>
                </div>

                <div className='flex flex-col border-2 m-4'>
                    <h1 className="p-2 font-bold">Estimated Costs</h1>
                    <div>
                        {(estimatedCosts)?estimatedCosts:<Spinner/>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomsAndTariffs