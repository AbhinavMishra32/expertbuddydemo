'use server';

import { analyzePdfFromUrl } from '@/utils/analyzePdfFromUrl';

export async function analyzePdf(pdfUrl: string) {
  try {
    const result = await analyzePdfFromUrl(pdfUrl);
    return result;
  } catch (error) {
    console.error('PDF analysis failed:', error);
    return null;
  }
}