'use client';
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { UploadButton } from "@/utils/uploadthings";
import aiOnPdf from "@/utils/utils";
import { saveDoc } from "@/actions/saveDoc";

export default function Home() {
  const { isLoaded, user } = useUser();

  const [uploading, setUploading] = useState(false);
  const [analysing, setAnalysing] = useState(false);
  const [aiResponse, setAiResponse] = useState<any>(null);

  const handleDocumentUpload = async (textContent: string, tags: string[], category: string, subject: string, description: string, fileUrl: string, language: string) => {
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
      title: "Untitled Document", // Optional title
      language,
    });
    console.log("Document saved: ", doc);
    alert("Document saved successfully");
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
          setAnalysing(true);
          try {
            const text = await aiOnPdf(
              res[0].ufsUrl,
              "Give all the text that is present in the pdf but just the first 10 lines, also give the tags and the category of the pdf, tell the subject of the pdf and give a short description of the pdf, and the language of the pdf"
            );
            console.log("AI Response: ", text);
            setAiResponse(text || null);
            handleDocumentUpload(
              text.textContent,
              text.tags,
              text.category,
              text.subject,
              text.description,
              res[0].ufsUrl,
              text.language
            );
          } catch (error) {
            console.error("Error analyzing PDF:", error);
            setAiResponse(null);
          } finally {
            setAnalysing(false);
          }
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </>
  );
}
