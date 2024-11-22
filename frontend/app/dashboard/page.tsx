"use client"
import { CircleUserRound, MoveLeft } from 'lucide-react'
import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useCommonDataStore } from '@/store/CommonData'
const applications = [
  {
    applicationId: "INV001",
    paymentStatus: "Complete",
    region: "Canada",
    product: "Frames",
  },
  {
    applicationId: "INV002",
    paymentStatus: "Pending",
    region: "Malaysia",
    product: "Parrels",
  },
  {
    applicationId: "INV003",
    paymentStatus: "Pending",
    region: "Indonesia",
    product: "Glasses",
  },
  {
    applicationId: "INV004",
    paymentStatus: "Complete",
    region: "England",
    product: "Soaps",
  },
  {
    applicationId: "INV005",
    paymentStatus: "Complete",
    region: "Singapore",
    product: "Tissues",
  },
  {
    applicationId: "INV006",
    paymentStatus: "Pending",
    region: "Malaysia",
    product: "Cosmetics",
  },
  {
    applicationId: "INV007",
    paymentStatus: "Pending",
    region: "Malaysia",
    product: "Skin Care",
  },
]
const Dashboard = () => {
  const router = useRouter();
  const { selectList } = useCommonDataStore();
  return (
    <div>
      <div className="p-2 flex bg-blue-600 text-white font-bold text-2xl">
        <span>CrossComply</span>
        <div className="mr-5 ml-auto">
          <CircleUserRound />
        </div>
      </div>
      <div className='flex flex-col mt-2 px-24'>
        <Button className='w-6 border-none bg-transparent hover:bg-transparent' onClick={()=>router.push('/')}><MoveLeft className='text-black'/></Button>
        <div className="grid grid-cols-4 gap-6">
          <div className="rounded-lg p-4 text-center">
            <h1 className="text-lg font-bold mb-2">Total Submissions</h1>
            <p id="totalSubmissions" className="text-xl text-gray-700">--</p>
          </div>
          <div className=" rounded-lg p-4 text-center">
            <h1 className="text-lg font-bold mb-2">Approved Submissions</h1>
            <p id="approvedSubmissions" className="text-xl text-gray-700">--</p>
          </div>
          <div className=" rounded-lg p-4 text-center">
            <h1 className="text-lg font-bold mb-2">Pending Reviews</h1>
            <p id="pendingReviews" className="text-xl text-gray-700">--</p>
          </div>
          <div className=" rounded-lg p-4 text-center">
            <h1 className="text-lg font-bold mb-2">Rejected Submissions</h1>
            <p id="rejectedSubmissions" className="text-xl text-gray-700">--</p>
          </div>
        </div>
        <Table>
      <TableCaption>A list of your recent applications.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Appl. Id</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Product</TableHead>
          <TableHead className="text-right">Region</TableHead>
          <TableHead className="text-right">Uploads</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((invoice) => (
          <TableRow key={invoice.applicationId}>
            <TableCell className="font-medium">{invoice.applicationId}</TableCell>
            <TableCell className={(invoice.paymentStatus==='Complete')?'text-green-500':'text-red-600'}>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.product}</TableCell>
            <TableCell className="text-right">{invoice.region}</TableCell>
            <TableCell className="text-right"><Button className='hover:bg-gray-400' onClick={()=>router.push('/pdfReview')}>Check Uploads</Button></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

    <h1 className='font-bold m-4'>Selected Compliance Requirements</h1>
    <hr></hr>
      {selectList}
      {selectList?.length > 0 && (
        <ul style={{ listStyleType: 'disc' }}>
          {selectList?.map((list, index) => (
            <li key={index}>{list}</li>
          ))}
        </ul>
      )}
      </div>
    </div>
  )
}

export default Dashboard