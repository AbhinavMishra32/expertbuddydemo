'use client';
import {Document as PDFDocument, Page, pdfjs} from 'react-pdf';
import { Document } from '@prisma/client';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfView({ document }: { document: Document }) {
    return (
        <PDFDocument file={document.url} className="w-full h-full">
            <Page pageNumber={1} className="w-full h-full" />
        </PDFDocument>
    )
}