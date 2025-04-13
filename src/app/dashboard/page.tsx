'use client';
import React, { useEffect, useState } from "react";
import { Upload, AlertCircle, Check, FileText, Loader } from "lucide-react";
import { DMSans, manrope } from "@/lib/fonts";
import Image from "next/image";
import { UploadDropzone } from "@/utils/uploadthings";
import { Subject, Tags } from "@prisma/client";
import aiOnPdf, { AIResponse, cleanText } from "@/utils/utils";
import { saveDoc } from "@/actions/saveDoc";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { analyzePdf } from "@/actions/analyzePdf";
import UserBar from "@/components/UserBar";

// Assuming UploadDropzone is imported from your library
const UploadPage = () => {
  const { isLoaded, user } = useUser();
  const [uploading, setUploading] = useState(false);
  const [uploadDone, setUploadDone] = useState(false);
  const [analysing, setAnalysing] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [manualPropSet, setManualPropSet] = useState(false);
  const [savingDocument, setSavingDocument] = useState(false);
  const [savedDocument, setSavedDocument] = useState(false);

  const router = useRouter();

  if (!user && isLoaded) {
    router.push("/signin");
  }
  const [pdfProperties, setPdfProperties] = useState({
    textContent: "",
    subject: "",
    tags: [] as Tags[],
    category: "",
    description: "",
    title: "",
    wordCount: 0,
    pageCount: 0,
    language: "English"
  });

  // useEffect(() => {
  //   console.log("PDF Properties: ", pdfProperties);
  // }, [pdfProperties]);

  const handleUserChoice = async (useAI: boolean) => {
    if (useAI) {
      setManualPropSet(false);
      setAnalysing(true);
      const result = await aiOnPdf(
        fileUrl,
        "Give all the text that is present in the pdf but just the first 10 lines, also give the tags and the category of the pdf, tell the subject of the pdf and give a short description of the pdf, and the language of the pdf"
      );
      const pdfAnalysis = await analyzePdf(fileUrl);
      if (result) {
        const { wordCount, pageCount, text } = pdfAnalysis || { wordCount: 0, pageCount: 0 };
        setPdfProperties({
          ...pdfProperties,
          wordCount: wordCount,
          pageCount: pageCount,
        });
        console.log("AI RESPONSE TEXT: ", pdfAnalysis?.text);
      } else {
        console.error("Failed to analyze PDF through pdf-parse: result is null");
      }
      setAnalysing(false);
      setAiResponse({
        category: result.category,
        description: result.description,
        language: result.language,
        subject: result.subject,
        tags: result.tags as Tags[],
        textContent: result.textContent
      });
    } else {
      setManualPropSet(true);
    }
  };

  const handleDocumentUpload = async () => {
    if (!user?.id) {
      console.error("User not authenticated");
      return;
    }
    setSavingDocument(true);
    if (manualPropSet) {
      const pdfAnalysis = await analyzePdf(fileUrl);
      const { wordCount, pageCount, text } = pdfAnalysis || { wordCount: 0, pageCount: 0 };
      setPdfProperties({
        ...pdfProperties,
        textContent: await cleanText(text) || "",
      });
      console.log("Saving document with manual properties: ", pdfProperties);
      const doc = await saveDoc(user.id, {
        textContent: text || "",
        tags: pdfProperties?.tags || [],
        category: pdfProperties?.category || "",
        subject: pdfProperties?.subject as Subject || "",
        description: pdfProperties?.description || "",
        fileUrl,
        title: pdfProperties.title || "Untitled Document",
        language: pdfProperties.language || "English",
        pageCount: pdfProperties.pageCount || 0,
        wordCount: pdfProperties.wordCount || 0,
      });
    } else {
      const savingDoc = {
        textContent: aiResponse?.textContent || "",
        tags: aiResponse?.tags || [],
        category: aiResponse?.category || "",
        subject: aiResponse?.subject as Subject || "",
        description: aiResponse?.description || "",
        fileUrl,
        title: pdfProperties.title || "Untitled Document",
        language: pdfProperties.language || "English",
        pageCount: pdfProperties.pageCount || 0,
        wordCount: pdfProperties.wordCount || 0,
      }
      const doc = await saveDoc(user.id, savingDoc);
    }
    setSavingDocument(false);
    setSavedDocument(true);
  };

  // useEffect(() => {
  //   console.log("savingDocument: ", savingDocument)
  // }, [savingDocument]);

  // useEffect(() => {
  //   if (savedDocument) {
  //     console.log("Document saved successfully!");
  //   }
  // }, [savedDocument]);

  const subjects = Object.values(Subject);
  const tagOptions = Object.values(Tags);

  return (
    <div className="min-h-screen bg-[#F5F3EF]">
      {user && (
        <UserBar />
      )}
      <header className="relative bg-[#A414D5] text-white pt-6 h-[350px] lg:px-[140px] px-4 pb-10 overflow-hidden">
        <Image
          src="/headerimg.png"
          alt="Header background"
          fill
          className="object-cover mix-blend-multiply pointer-events-none opacity-90 z-0"
        />
        {/* <div className={`${manrope.className} relative z-10 text-black flex justify-between sm:h-16 h-14 w-full bg-white rounded-full`}>
          <div className="xl:w-full w-[40%] h-full flex items-center px-6">
            <Image className="object-cover mix-blend-multiply pointer-events-none opacity-90 z-0" src="/logo.png" alt="Logo" width={135} height={60} />
          </div>
          <div className="w-full flex md:justify-between justify-end items-center p-2">
            <p className='md:inline hidden'>Find Tutor</p>
            <p className='md:inline hidden'>Become Tutor</p>
            <p className='md:inline hidden'>Sign In</p>
            <button className="rounded-full sm:text-base text-sm bg-black hover:bg-[#A414D5] text-white h-full px-8">
              Get Started For Free
            </button>
          </div>
        </div> */}

        <div className="max-w-4xl mt-14 mx-auto px-4">
          <h1 className={`${DMSans.className} text-5xl font-bold text-white mb-2`}>Upload Document</h1>
          <p className={`${DMSans.className} text-white font-light text-lg`}>Share your study materials with our community</p>
        </div>
      </header>

      {/* Upload Section */}
      <div
        className={`${DMSans.className} absolute w-3/4 h-fit max-w-4xl mx-auto -mt-4 bg-white rounded-[25px] shadow-lg overflow-hidden mb-8 sm:mx-auto top-[280px] left-1/2 transform -translate-x-1/2`}
        style={{ transformOrigin: "top center" }}
      >
        <div className="absolute -top-20 left-0 max-w-4xl mx-auto px-4">
          <h1 className={`${DMSans.className} text-5xl font-bold text-white mb-2`}>Upload Document</h1>
          <p className={`${DMSans.className} text-white font-light text-lg`}>Share your study materials with our community</p>
        </div>
        {/* Progress Indicator */}
        <div className={`${DMSans.className} bg-[#F5F3EF] px-6 py-4 border-b`}>
          <div className="flex items-center justify-between max-w-md mx-auto">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${uploadDone ? 'bg-green-500' : 'bg-[#A414D5]'} text-white`}>
                {uploadDone ? <Check size={18} /> : '1'}
              </div>
              <span className="text-xs mt-1">Upload</span>
            </div>
            <div className={`h-1 flex-1 mx-2 ${uploadDone ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${(aiResponse || manualPropSet) ? 'bg-green-500' : (uploadDone ? 'bg-[#A414D5]' : 'bg-gray-300')} text-white`}>
                {(aiResponse || manualPropSet) ? <Check size={18} /> : '2'}
              </div>
              <span className="text-xs mt-1">Details</span>
            </div>
            <div className={`h-1 flex-1 mx-2 ${savedDocument ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${savedDocument ? 'bg-green-500' : 'bg-gray-300'} text-white`}>
                {(aiResponse || manualPropSet) ? <Check size={18} /> : '2'}
              </div>
              <span className="text-xs mt-1">Complete</span>
            </div>
          </div>
        </div>

        {/* Upload Dropzone */}
        {!uploadDone && (
          <div className="p-6">
            <h2 className={"text-xl font-semibold text-gray-800 mb-4" + DMSans.className}>Upload Your Document</h2>

            <div className="border-2 border-dashed rounded-lg">
              <UploadDropzone
                className="bg-gray-50 hover:bg-gray-100 p-10 ut-label:text-lg ut-allowed-content:ut-uploading:text-[#A414D5]"
                endpoint="imageUploader"
                onUploadBegin={() => setUploading(true)}
                onClientUploadComplete={async (res) => {
                  setUploading(false);
                  setUploadDone(true);
                  setFileUrl(res[0].ufsUrl);
                }}
                onUploadError={(error) => {
                  alert(`ERROR! ${error.message}`);
                }}
              />
            </div>

            {uploading && (
              <div className={"flex items-center justify-center mt-4 text-[#A414D5]" + DMSans.className}>
                <Loader className="animate-spin mr-2" size={20} />
                <span>Uploading your document...</span>
              </div>
            )}
          </div>
        )}

        {/* Choose AI or Manual */}
        {uploadDone && !manualPropSet && !aiResponse && !analysing && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Document Details</h2>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="mb-6">
                <FileText className="h-12 w-12 mx-auto text-[#A414D5] mb-2" />
                <p className="text-center text-gray-600">Your document has been uploaded successfully!</p>
                <p className="text-center text-gray-500 text-sm">Now, let's fill in the document details</p>
              </div>

              <h3 className="text-lg font-medium mb-4">How would you like to proceed?</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => handleUserChoice(true)}
                  className="bg-[#A414D5] text-white p-4 rounded-lg hover:bg-purple-700 transition-colors flex flex-col items-center"
                >
                  <svg className="w-8 h-8 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 8V16M8 12H16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="font-medium">Use AI Assistant</span>
                  <span className="text-xs mt-1">Let our AI analyze and extract details</span>
                </button>

                <button
                  onClick={() => handleUserChoice(false)}
                  className="bg-white text-gray-800 p-4 rounded-lg border-2 border-gray-300 hover:border-[#A414D5] hover:text-[#A414D5] transition-colors flex flex-col items-center"
                >
                  <svg className="w-8 h-8 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 5H6C4.89543 5 4 5.89543 4 7V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V13M17.5858 3.58579C18.3668 2.80474 19.6332 2.80474 20.4142 3.58579C21.1953 4.36683 21.1953 5.63316 20.4142 6.41421L11.8284 15H9V12.1716L17.5858 3.58579Z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="font-medium">Fill Details Manually</span>
                  <span className="text-xs mt-1">Enter document information yourself</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* AI Analysis In Progress */}
        {analysing && (
          <div className="p-6">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center">
              <div className="animate-pulse flex flex-col items-center justify-center p-8">
                <Loader size={40} className="text-[#A414D5] mb-4 animate-spin" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">Analyzing Your Document</h3>
                <p className="text-gray-500">Our AI is extracting information and categorizing your document...</p>
              </div>
            </div>
          </div>
        )}

        {/* AI Results */}
        {aiResponse && !savedDocument && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Document Details (AI Generated)</h2>

            <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-6 flex items-start">
              <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" />
              <div>
                <p className="text-green-700 font-medium">AI analysis complete!</p>
                <p className="text-green-600 text-sm">You can review and edit the extracted information below.</p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Document Title</label>
                  <input
                    type="text"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#A414D5] focus:ring focus:ring-[#A414D5] focus:ring-opacity-50"
                    placeholder="Enter document title"
                    value={pdfProperties.title || "Untitled Document"}
                    onChange={(e) => setPdfProperties({ ...pdfProperties, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <select
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#A414D5] focus:ring focus:ring-[#A414D5] focus:ring-opacity-50"
                    value={aiResponse.subject}
                    onChange={(e) => setAiResponse({ ...aiResponse, subject: e.target.value as Subject })}
                  >
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#A414D5] focus:ring focus:ring-[#A414D5] focus:ring-opacity-50"
                    value={aiResponse.category}
                    onChange={(e) => setAiResponse({ ...aiResponse, category: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                  <input
                    type="text"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#A414D5] focus:ring focus:ring-[#A414D5] focus:ring-opacity-50"
                    value={aiResponse.language}
                    onChange={(e) => setAiResponse({ ...aiResponse, language: e.target.value })}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {aiResponse.tags.map((tag, index) => (
                      <span key={index} className="bg-[#A414D5] bg-opacity-10 text-[#A414D5] text-sm px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                    <button className="bg-gray-200 text-gray-600 text-sm px-3 py-1 rounded-full">
                      + Add Tag
                    </button>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#A414D5] focus:ring focus:ring-[#A414D5] focus:ring-opacity-50"
                    value={aiResponse.description}
                    onChange={(e) => setAiResponse({ ...aiResponse, description: e.target.value })}
                  ></textarea>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  className="px-6 py-2 bg-[#A414D5] text-white rounded-md hover:bg-purple-700"
                  onClick={handleDocumentUpload}
                >
                  {savingDocument ? <Loader className="animate-spin" size={16} /> : 'Save Document'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Manual Entry Form */}
        {manualPropSet && !savedDocument && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Document Details (Manual Entry)</h2>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Document Title</label>
                  <input
                    type="text"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#A414D5] focus:ring focus:ring-[#A414D5] focus:ring-opacity-50"
                    placeholder="Enter document title"
                    value={pdfProperties.title}
                    onChange={(e) => setPdfProperties({ ...pdfProperties, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <select
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#A414D5] focus:ring focus:ring-[#A414D5] focus:ring-opacity-50"
                    value={pdfProperties.subject}
                    onChange={(e) => setPdfProperties({ ...pdfProperties, subject: e.target.value as Subject })}
                  >
                    <option value="">Select subject</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#A414D5] focus:ring focus:ring-[#A414D5] focus:ring-opacity-50"
                    placeholder="e.g. Academic, Research, Tutorial"
                    value={pdfProperties.category}
                    onChange={(e) => setPdfProperties({ ...pdfProperties, category: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                  <input
                    type="text"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#A414D5] focus:ring focus:ring-[#A414D5] focus:ring-opacity-50"
                    placeholder="e.g. English, Spanish, French"
                    value={pdfProperties.language}
                    onChange={(e) => setPdfProperties({ ...pdfProperties, language: e.target.value })}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags (select all that apply)</label>
                  <div className="flex flex-wrap gap-2">
                    {tagOptions.map((tag: Tags, index: number) => (
                      <button
                        key={index}
                        className={`text-sm px-3 py-1 rounded-full transition-colors ${pdfProperties.tags.includes(tag)
                          ? 'bg-[#A414D5] text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        onClick={() => {
                          const updatedTags = pdfProperties.tags.includes(tag)
                            ? pdfProperties.tags.filter(t => t !== tag)
                            : [...pdfProperties.tags, tag];
                          setPdfProperties({ ...pdfProperties, tags: updatedTags });
                        }}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#A414D5] focus:ring focus:ring-[#A414D5] focus:ring-opacity-50"
                    placeholder="Briefly describe what this document contains"
                    value={pdfProperties.description}
                    onChange={(e) => setPdfProperties({ ...pdfProperties, description: e.target.value })}
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Word Count</label>
                  <input
                    type="number"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#A414D5] focus:ring focus:ring-[#A414D5] focus:ring-opacity-50"
                    value={pdfProperties.wordCount}
                    onChange={(e) => setPdfProperties({ ...pdfProperties, wordCount: parseInt(e.target.value) || 0 })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Page Count</label>
                  <input
                    type="number"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#A414D5] focus:ring focus:ring-[#A414D5] focus:ring-opacity-50"
                    value={pdfProperties.pageCount}
                    onChange={(e) => setPdfProperties({ ...pdfProperties, pageCount: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  className="px-6 py-2 bg-[#A414D5] text-white rounded-md hover:bg-purple-700"
                  onClick={handleDocumentUpload}
                >
                  {savingDocument ? <Loader className="animate-spin" size={16} /> : 'Save Document'}
                </button>
              </div>
            </div>
          </div>
        )}

        {savedDocument && (
          <div className="p-6 text-center">
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-6 flex items-start">
              <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" />
              <div className="flex flex-col items-start">
                <p className="text-green-700 font-medium">Document saved successfully!</p>
                <p className="text-green-600 text-sm">Thank you for sharing your document with us.</p>
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <button
                className="bg-[#A414D5] text-white px-8 py-3 rounded-full font-medium hover:bg-purple-700 transition-colors shadow-sm flex items-center justify-center"
                onClick={() => router.push('/home')}
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPage;