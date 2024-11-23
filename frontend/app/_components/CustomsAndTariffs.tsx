import { useEffect, useState } from "react"

const CustomsAndTariffs = () => {
    const [dutiesTariffs, setDutiesTariffs] = useState('')
    const [potentialCostSavings, setPotentialCostSavings] = useState('')
    const [estimatedCosts, setEstimatedCosts] = useState('')

    useEffect(() => {
        const fetchData = async() => {
            const data = await fetch('http://127.0.0.1:8000/get_json',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Specify JSON format
                    },
                    body: JSON.stringify({ query: `What are compliance requirements for frames`}),
                }
            ).then(res => res.json())
            .then(val => setDutiesTariffs(val.response))
            console.log("data", data)
        }

        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async() => {
            const data = await fetch('http://127.0.0.1:8000/potentialCostSavings').then(res => res.json()).then(val => setPotentialCostSavings(val.data))
            console.log("data", data)
        }

        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async() => {
            const data = await fetch('http://127.0.0.1:8000/estimatedCosts').then(res => res.json()).then(val => setEstimatedCosts(val.data))
            console.log("data", data)
        }

        fetchData()
    }, [])
    return (
        <>
            <div className='flex w-[100%]'>
                <div className='flex flex-col border-2 m-4'>
                    <h1 className="p-2 font-bold">Breaked Down estimated customs duties and tariffs</h1>
                    <div>
                        {dutiesTariffs}
                    </div>
                </div>

                <div className='flex flex-col border-2 m-4'>
                    <h1 className="p-2 font-bold">Suggested Potential Cost Saving Measures</h1>
                    <div>
                        {potentialCostSavings}
                    </div>
                </div>

                <div className='flex flex-col border-2 m-4'>
                    <h1 className="p-2 font-bold">Estimated Costs</h1>
                    <div>
                        {estimatedCosts}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomsAndTariffs