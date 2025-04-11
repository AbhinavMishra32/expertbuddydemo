import pdf from 'pdf-parse-debugging-disabled';
import axios from 'axios';

export async function analyzePdfFromUrl(pdfUrl: string): Promise<{ text: string; pageCount: number; wordCount: number; }> {
  try {
    const response = await axios.get(pdfUrl, { responseType: 'arraybuffer' });

    if (!response.data || response.status !== 200) {
      throw new Error('Failed to fetch the PDF file.');
    }

    const data = await pdf(Buffer.from(response.data));

    const pageCount = data.numpages;
    const text = data.text;
    const wordCount = text.split(/\s+/).filter(Boolean).length;

    return {
      text,
      pageCount,
      wordCount,
    };
  } catch (error) {
    console.error('Error analyzing PDF:', error);
    throw new Error('Failed to analyze the PDF file.');
  }
}