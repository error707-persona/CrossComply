"use client"
import React from 'react'
import { productItems, countryNames } from "../utils/data"
import { Button } from './ui/button'
import ComboBox from './ComboBox'
import { useRouter } from 'next/navigation'


const Sidebar = () => {
    const router = useRouter()
    return (
        <div className='p-5 gap-5 flex flex-col h-full'>
            <ComboBox title='Product' items={productItems}/>
            <ComboBox title='Region' items={countryNames}/>
            <Button className='mt-auto' onClick={() => router.push('/dashboard')}>Dashboard</Button>
        </div>
    )
}

export default Sidebar