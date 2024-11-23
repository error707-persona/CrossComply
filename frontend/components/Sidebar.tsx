import React from 'react'
import { productItems, countryNames } from "../utils/data"
import Link from 'next/link'
import { Button } from './ui/button'
import ComboBox from './ComboBox'

const Sidebar = () => {
    return (
        <div className='p-5 gap-5 flex flex-col h-full'>
            <ComboBox title='Product' items={productItems}/>
            <ComboBox title='Region' items={countryNames}/>
            <Button className='mt-auto' onClick={() => <Link href="/dashboard">Dashboard</Link>}>Dashboard</Button>
        </div>
    )
}

export default Sidebar