import { Progress } from '@/components/ui/progress'
import React from 'react'

const Dashboard = () => {
  return (
    <div className='flex flex-col mt-10 p-5 px-24'>
        <Progress value={45} />
        <div className=' gap-1/3 flex'>
          <div>Apply</div>
          <div>Application submitted</div>
          <div>Application Approved</div>
        </div>
        
    </div>
  )
}

export default Dashboard