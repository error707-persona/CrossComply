/**
 * v0 by Vercel.
 * @see https://v0.dev/t/F5rAty2B9hY
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileIcon } from "lucide-react"

export default function PdfReview() {
  return (
    <div className="flex w-full min-h-[400px] border">
      <div className="flex w-0 bg-gray-100 border-r">
        {/* <div className="flex w-[200px]">
          <div className="flex w-full p-2">
            <Button size="icon" variant="ghost" className="rounded-lg w-full">
              <ChevronUpIcon className="h-4" />
              <span className="sr-only">Page 1</span>
            </Button>
          </div>
          <div className="flex w-full p-2">
            <Button size="icon" variant="ghost" className="rounded-lg w-full">
              <ChevronDownIcon className="h-4" />
              <span className="sr-only">Page 2</span>
            </Button>
          </div>
          <div className="flex w-full p-2">
            <Button size="icon" variant="ghost" className="rounded-lg w-full">
              <ChevronDownIcon className="h-4" />
              <span className="sr-only">Page 3</span>
            </Button>
          </div>
          <div className="flex w-full p-2">
            <Button size="icon" variant="ghost" className="rounded-lg w-full">
              <ChevronDownIcon className="h-4" />
              <span className="sr-only">Page 4</span>
            </Button>
          </div>
          <div className="flex w-full p-2">
            <Button size="icon" variant="ghost" className="rounded-lg w-full">
              <ChevronDownIcon className="h-4" />
              <span className="sr-only">Page 5</span>
            </Button>
          </div>
        </div> */}
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center p-2 border-b">
          <Button size="sm" variant="ghost" className="mr-2">
            Previous Page
          </Button>
          <Button size="sm" variant="ghost" className="mr-2">
            Next Page
          </Button>
          <Button size="sm" variant="ghost" className="mr-2">
            Zoom In
          </Button>
          <Button size="sm" variant="ghost" className="mr-2">
            Zoom Out
          </Button>
          <div className="flex-1" />
          <Button size="sm">Download PDF</Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="grid w-full aspect-[1.41] place-items-center bg-gray-100">
            <div className="absolute inset-0 flex items-center justify-center text-9xl text-gray-300">
              <FileIcon className="w-20 h-20" />
            </div>
            <div className="grid w-full aspect-[1.41] place-items-center">
              <div className="absolute inset-0 flex items-center justify-center text-9xl text-gray-300">
                <FileIcon className="w-20 h-20" />
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

// function ChevronDownIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="m6 9 6 6 6-6" />
//     </svg>
//   )
// }


// function ChevronUpIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="m18 15-6-6-6 6" />
//     </svg>
//   )
// }


// function FileIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
//       <path d="M14 2v4a2 2 0 0 0 2 2h4" />
//     </svg>
//   )
// }