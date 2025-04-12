'use client';
import { Document } from '@prisma/client';
// Core viewer
import { Viewer, Worker } from '@react-pdf-viewer/core';

// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Create new plugin instance

export default function PdfView({ document }: { document: Document }) {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const pdfUrl = document.url;
    const fileName = pdfUrl.split('/').pop() || 'document.pdf';

    return (
        <div className="w-full h-[90vh] overflow-hidden bg-white">
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer
                fileUrl={pdfUrl}
                enableSmoothScroll={true}
                // defaultScale={1.5}
                plugins={[defaultLayoutPluginInstance]}
            />
            </Worker>
        </div>
    )
}