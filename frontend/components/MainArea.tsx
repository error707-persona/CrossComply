import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CustomsAndTariffs from './CustomsAndTariffs'
import IncentiveAndGrants from './IncentiveAndGrants'


const MainArea = () => {
    return (
        <div className='w-full h-full mt-5'>
            <Tabs defaultValue="account" className="w-full">
                <TabsList>
                    <TabsTrigger value="compliance">Compliance Requirements</TabsTrigger>
                    <TabsTrigger value="incentives">Incentives and grants</TabsTrigger>
                    <TabsTrigger value="customs">Customs and tariffs</TabsTrigger>
                    <TabsTrigger value="exports">Exports Documentation and workflow</TabsTrigger>
                </TabsList>
                <TabsContent value="compliance">Compliance Requirements</TabsContent>
                <TabsContent value="incentives"><IncentiveAndGrants/></TabsContent>
                <TabsContent value="customs" className='w-full'>
                    <CustomsAndTariffs />
                </TabsContent>
                <TabsContent value="exports">Exports Documentation and workflow</TabsContent>
            </Tabs>

        </div>
    )
}

export default MainArea