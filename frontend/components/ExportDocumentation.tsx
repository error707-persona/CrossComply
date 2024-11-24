import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function ExportDocumentation() {
    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger>Proforma Invoice</AccordionTrigger>
                <AccordionContent>
                A pro forma invoice is an important document used as a negotiating tool between the seller and the buyer prior to an export shipment.
                This document should be used by the seller to quote at the beginning of an export transaction and it will eventually become the final
                commercial invoice used when goods are cleared through customs in the importing country. The document contains a description of goods
                (e.g., quantity, price, weight, kind and other specifications) and is a declaration by the seller to provide the products and services to
                the buyer at the specified date and price.<br />

                <a style={{ color: 'blue', textDecoration: 'underline' }} href="/Documents/proforma_invoice.docx" download="Proforma_Invoice.docx">
                    Click here to download the Proforma Invoice
                </a>
                </AccordionContent>

            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Commercial Invoice</AccordionTrigger>
                <AccordionContent>
                The commercial invoice is a legal document between the exporter and the buyer (in this case, the foreign buyer) that clearly states the goods being sold and the amount
                the customer is to pay. The commercial invoice is one of the main documents used by customs in determining customs duties. A commercial invoice is a bill for the goods
                from the seller to the buyer. These documents are often used by governments to determine the true value of goods when assessing customs duties. Governments that use the
                commercial invoice to control imports will often specify its form, content, number of copies, language to be used and other characteristics.<br />
                <a style={{ color: 'blue', textDecoration: 'underline' }} href="/Documents/commercial_invoice.docx" download="Commercial_Invoice.docx">
                    Click here to download the Commercial Invoice
                </a>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>Packing List</AccordionTrigger>
                <AccordionContent>
                Considerably more detailed and informative than a standard domestic packing list, an export packing list lists seller, buyer, shipper, invoice number, date of shipment,
                mode of transport, carrier, and itemizes quantity, description, the type of package, such as a box, crate, drum, or carton, the quantity of packages, total net and gross weight
                (in kilograms), package marks and dimensions, if appropriate. Both commercial stationers and freight forwarders carry packing list forms. A packing list may serve as conforming document.
                It is not a substitute for a commercial invoice. In addition, U.S. and foreign customs officials may use the packing list to check the cargo so the commercial invoice should reflect the
                information shown on the packing list.<br />
                <a style={{ color: 'blue', textDecoration: 'underline' }} href="/Documents/packing_list.docx" download="Packing_List.docx">
                    Click here to download the Packing List
                </a>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
                <AccordionTrigger>Certificates Of Origin</AccordionTrigger>
                <AccordionContent>
                Some countries require a certificate of origin to identify in what country the goods originated.
                These certificates of origin usually need to be signed by some semi-official organization, like a chamber of commerce or a country&apos;s consulate office.
                A certificate of origin may be required even if you&apos;ve included the
                country of origin information on your commercial invoice.<br />
                <a style={{ color: 'blue', textDecoration: 'underline' }} href="/Documents/certificate_of_origin.docx" download="Certificates_of_origin.docx">
                    Click here to download the Certificates of Origin
                </a>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
                <AccordionTrigger>Certificate of Free Sale</AccordionTrigger>
                <AccordionContent>
                Sometimes called a Certificate for Export or Certificate to Foreign Governments, a Certificate of Free Sale is evidence that goods—such as food items, cosmetics, biologics or
                medical devices—are legally sold or distributed in the open market, freely without restriction, and approved by the regulatory authorities in the country of origin (the United States).
                A Certificate of Free Sale is used when you are registering a new product in a country.<br />
                <a style={{ color: 'blue', textDecoration: 'underline' }} href="/Documents/certificate_of_free_sale.docx" download="Certificate_of_Free_Sale.docx">
                    Click here to download the Certificate of Free Sale
                </a>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
                <AccordionTrigger>Letter Of Credit</AccordionTrigger>
                <AccordionContent>
                A Letter of Credit (LC) is a financial document issued by a bank on behalf of a buyer, guaranteeing payment to a seller for goods or services provided, as long as the seller meets specific terms and conditions
                outlined in the agreement. It ensures the seller that they will receive payment, provided they present the required documentation, such as invoices, shipping details, and other relevant papers, to the bank.
                Letters of Credit are commonly used in international trade to reduce the risks for both parties, offering security to the seller and assurance to the buyer that payment will only be made when the agreed-upon
                conditions are met.<br />
                <a style={{ color: 'blue', textDecoration: 'underline' }} href="/Documents/letter_of_credit.docx" download="Letter_of_credit.docx">
                    Click here to download the Letter Of Credit
                </a>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
                <AccordionTrigger>Inland Bill Of Lading</AccordionTrigger>
                <AccordionContent>
                An Inland Bill of Lading (IBL) is a transport document used in the shipping industry that serves as a receipt for goods being transported overland, typically within a country.
                It is issued by the carrier (often a trucking company or rail operator) to the shipper, confirming that the goods have been received for transport. The Inland Bill of Lading outlines the
                terms and conditions for the delivery of goods from one point to another within the same country or between neighboring countries. It is a key document in domestic trade or inland transportation
                and acts as proof of contract, receipt, and sometimes ownership of the goods during transit.<br />
                <a style={{ color: 'blue', textDecoration: 'underline' }} href="/Documents/bill_of_lading.docx" download="Bill_of_lading.docx">
                    Click here to download the Inland Bill Of Lading
                </a>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-8">
                <AccordionTrigger>Ocean Bill Of Lading</AccordionTrigger>
                <AccordionContent>
                If your goods are shipping by ocean vessel, you&apos;ll need an ocean bill of lading. An ocean bill of lading can serve as both a contract of carriage and a document of title for the cargo.<br />
                <a style={{ color: 'blue', textDecoration: 'underline' }} href="/Documents/ocean_bill_of_lading.docx" download="Ocean_bill_of_lading.docx">
                    Click here to download the Ocean Bill Of Lading
                </a>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-9">
                <AccordionTrigger>Air WayBill</AccordionTrigger>
                <AccordionContent>
                Goods shipped on a plane require an air waybill. It is a contract of carriage between the shipper and the carrier that is distributed by the International Air Transport Association (IATA).
                Unlike an ocean bill of lading, an air waybill cannot be negotiable.<br />
                <a style={{ color: 'blue', textDecoration: 'underline' }} href="/Documents/air_way_bill.docx" download="Air_wayBill.docx">
                    Click here to download the Air WayBill
                </a>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-10">
                <AccordionTrigger>Dangerous Goods Form</AccordionTrigger>
                <AccordionContent>
                If your products are considered dangerous goods by either the International Air Transport Association (IATA) or the International Maritime Organization (IMO), you need to include the appropriate dangerous goods form with your shipment. <br />
                <a style={{ color: 'blue', textDecoration: 'underline' }} href="/Documents/dangerous_goods_form.docx" download="Dangerous_goods_Form.docx">
                    Click here to download the Dangerous Goods Form
                </a>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-11">
                <AccordionTrigger>Bank Draft</AccordionTrigger>
                <AccordionContent>
                A bank draft is an important part of the international sales process for transferring control of the exported goods from the seller in exchange for funds from the buyer. It is often called a documentary collection, because the seller attaches various documents to a bank draft and a cover letter.<br />
                <a style={{ color: 'blue', textDecoration: 'underline' }} href="/Documents/bank_draft.docx" download="Bank_Draft.docx">
                    Click here to download the Bank Draft
                </a>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}