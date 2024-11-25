"use client";
import { CircleUserRound, MoveLeft } from "lucide-react";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useCommonDataStore } from "@/store/CommonData";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useRegion } from "@/store/region";
import { useProduct } from "@/store/product";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
];

const Dashboard = () => {
  const router = useRouter();
  const { selectList } = useCommonDataStore();
  const { region } = useRegion();
  const { product } = useProduct();
  const { complianceData } = useCommonDataStore();
  const handleSubmit = async () => {
    // const result = await addDoc(collection(db, "applications"), {
    //   compliance: complianceData,
    //   cost: "18000",
    //   incentives: [],
    //   product:"Shoes",
    //   region:"India"
    // });
    // console.log(result)
  };
  const unsub = onSnapshot(collection(db, "applications"), (snapshot) => {
    snapshot.forEach((doc) => {
      const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      console.log(source, " data: ", doc.data());
    });
  });
  return (
    <div>
      <div className="p-2 flex sticky top-0 w-full bg-blue-600 text-white font-bold text-2xl">
        <span>CrossComply</span>
        <div className="mr-5 ml-auto">
          <CircleUserRound />
        </div>
      </div>
      <div className="flex flex-col mt-2 px-24">
        {/* <Button onClick={handleSubmit}>submit</Button> */}
        <Button
          className="w-6 border-none bg-transparent hover:bg-transparent"
          onClick={() => router.push("/")}
        >
          <MoveLeft className="text-black" />
        </Button>
        <div className="grid grid-cols-4 gap-6">
          <div className="rounded-lg p-4 text-center">
            <h1 className="text-lg font-bold mb-2">Total Submissions</h1>
            <p id="totalSubmissions" className="text-xl text-gray-700">
              --
            </p>
          </div>
          <div className=" rounded-lg p-4 text-center">
            <h1 className="text-lg font-bold mb-2">Approved Submissions</h1>
            <p id="approvedSubmissions" className="text-xl text-gray-700">
              --
            </p>
          </div>
          <div className=" rounded-lg p-4 text-center">
            <h1 className="text-lg font-bold mb-2">Pending Reviews</h1>
            <p id="pendingReviews" className="text-xl text-gray-700">
              --
            </p>
          </div>
          <div className=" rounded-lg p-4 text-center">
            <h1 className="text-lg font-bold mb-2">Rejected Submissions</h1>
            <p id="rejectedSubmissions" className="text-xl text-gray-700">
              --
            </p>
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
                <TableCell className="font-medium">
                  {invoice.applicationId}
                </TableCell>
                <TableCell
                  className={
                    invoice.paymentStatus === "Complete"
                      ? "text-green-500"
                      : "text-red-600"
                  }
                >
                  {invoice.paymentStatus}
                </TableCell>
                <TableCell>{invoice.product}</TableCell>
                <TableCell className="text-right">{invoice.region}</TableCell>
                <TableCell className="text-right">
                  {" "}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Check Uploads</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Documents Uploaded</DialogTitle>
                        <DialogDescription>
                          Check/Change your uploads
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex">
                        <div className="border border-black p-5 w-2/3 rounded"></div>
                        <Button
                          className="hover:bg-gray-400 ml-auto"
                          onClick={() => router.push("/pdfReview")}
                        >
                          Check
                        </Button>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <h1 className="font-bold m-4">Selected Compliance Requirements</h1>
        <hr></hr>
        {/* {selectList} */}
        {selectList?.length > 0 && (
          <ul style={{ listStyleType: "disc" }}>
            {selectList?.map((list, index) => <li key={index}>{list}</li>)}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
