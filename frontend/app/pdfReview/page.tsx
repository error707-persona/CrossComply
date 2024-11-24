/**
 * v0 by Vercel.
 * @see https://v0.dev/t/F5rAty2B9hY
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { File } from "lucide-react"

export default function PdfReview() {
    return (
        <div className="flex w-full min-h-[400px] border">
            <div className="flex w-0 bg-gray-100 border-r">
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
                            <File className="w-20 h-20" />
                        </div>
                        <div className="grid w-full aspect-[1.41] place-items-center">
                            <div className="absolute inset-0 flex items-center justify-center text-9xl text-gray-300">
                                <File className="w-20 h-20" />
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}
