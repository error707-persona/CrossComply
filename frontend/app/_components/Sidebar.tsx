import React from 'react'
import SelectBox from '../_components/SelectBox'
import {productItems, countryNames} from "../utils/data"
const Sidebar = () => {
    return (
        <div className='p-5 gap-5 flex flex-col'>
            <SelectBox title="Select Product" items={productItems}/>
            <SelectBox title="Select Region" items={countryNames}/>
        </div>
    )
}

export default Sidebar