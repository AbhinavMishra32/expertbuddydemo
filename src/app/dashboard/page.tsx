'use client';
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { UploadButton } from "@/utils/uploadthings";
import aiOnPdf from "@/utils/utils";
import { saveDoc } from "@/actions/saveDoc";
import { Subject, Tags } from "@prisma/client";
import { analyzePdf } from "@/actions/analyzePdf";
import { Select, SelectItem, SelectValue } from "@/components/ui/select";
import { SelectContent, SelectTrigger } from "@radix-ui/react-select";

export default function Home() {
  const { isLoaded, user } = useUser();

  const [uploading, setUploading] = useState(false);
  const [uploadDone, setUploadDone] = useState(false);
  const [analysing, setAnalysing] = useState(false);
  const [aiResponse, setAiResponse] = useState<any>(null);
  const [manualPropSet, setManualPropSet] = useState(false);
  const [fileUrl, setFileUrl] = useState<string>("");

  const [pdfProperties, setPdfProperties] = useState({
    textContent: "",
    subject: "" as Subject,
    tags: [] as Tags[],
    category: "",
    description: "",
    title: "",
    wordCount: 0,
    pageCount: 0,
  })

  const handleDocumentUpload = async (textContent: string, tags: Tags[], category: string, subject: Subject, description: string, fileUrl: string, language: string) => {
    if (!user?.id) {
      console.error("User not authenticated");
      return;
    }

    const doc = await saveDoc(user.id, {
      textContent,
      tags,
      category,
      subject,
      description,
      fileUrl,
      title: pdfProperties.title || "Untitled Document", // Optional title
      language,
    });
    console.log("Document saved: ", doc);
    alert("Document saved successfully");
  };

  const analyzeWithAI = async () => {
    if (!fileUrl) return;

    
    setAnalysing(true);
    try {
      const result = await aiOnPdf(
        fileUrl,
        "Give all the text that is present in the pdf but just the first 10 lines, also give the tags and the category of the pdf, tell the subject of the pdf and give a short description of the pdf, and the language of the pdf"
      );
      const { wordCount, pageCount } = await analyzePdf(fileUrl);
      console.log("AI Response: ", result);
      setAiResponse(result || null);
      handleDocumentUpload(
        result.textContent,
        result.tags.map(tag => tag as Tags),
        result.category,
        result.subject as Subject,
        result.description,
        fileUrl,
        result.language
      );
    } catch (error) {
      console.error("Error analyzing PDF:", error);
      setAiResponse(null);
    } finally {
      setAnalysing(false);
    }
  };

  const handleUserChoice = (useAI: boolean) => {
    if (useAI) {
      setManualPropSet(false);
      analyzeWithAI();
    } else {
      setManualPropSet(true);
      // Show form for manual input
    }
  };

  return (
    <>
      <p>Dashboard Page</p>
      {uploading && <p>Uploading...</p>}
      {analysing && <p>Analysing...</p>}
      {aiResponse && (
        <div className="mt-4 p-4 border rounded">
          <h3 className="font-bold">AI Response:</h3>
          <p><strong>Category:</strong> {aiResponse.category}</p>
          <p><strong>Description:</strong> {aiResponse.description}</p>
          <p><strong>Language:</strong> {aiResponse.language}</p>
          <p><strong>Subject:</strong> {aiResponse.subject}</p>
          <p><strong>Tags:</strong> {aiResponse.tags.join(", ")}</p>
          <p><strong>Text Content:</strong> {aiResponse.textContent}</p>
        </div>
      )}
      <UploadButton
        endpoint="imageUploader"
        onUploadBegin={() => setUploading(true)}
        onClientUploadComplete={async (res) => {
          setUploading(false);
          setUploadDone(true);
          setFileUrl(res[0].ufsUrl);
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
      {uploadDone && !manualPropSet && !analysing && !aiResponse && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Do you want to fill details manually?</h2>
          <div className="mt-2 space-x-4">
            <button onClick={() => handleUserChoice(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
              No, use AI
            </button>
            <button onClick={() => handleUserChoice(false)} className="bg-gray-300 text-black px-4 py-2 rounded">
              Yes, I'll fill them
            </button>
          </div>
        </div>
      )}
      {manualPropSet && (
        <div className="mt-4">
          <p>Manual form implementation needed here</p>
          <input placeholder="Description" onChange={(e) => setPdfProperties({ ...pdfProperties, description: e.target.value })} />
          <input placeholder="Title" onChange={(e) => setPdfProperties({ ...pdfProperties, title: e.target.value })} />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Choose Category" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(Subject).map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Choose Subject" />
              </SelectTrigger>
            <SelectContent>
              {Object.values(Tags).map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <button onClick={() => handleDocumentUpload(
            "No text detected with non AI solution (pdf parsing)",
            pdfProperties.tags || [], // tags
            pdfProperties.category || "Uncategorized", // category
            pdfProperties.subject || "OTHER", // subject
            pdfProperties.description, // description
            fileUrl, // fileUrl
            "English" // language
          )}>Upload</button>
        </div>
      )}
    </>
  );
}