import { saveAs } from 'file-saver';

export async function downloadPdf(blob: Blob, filename: string): Promise<void> {
  try {
    saveAs(blob, filename);
  } catch (error) {
    console.error('Error downloading PDF:', error);
    throw new Error('Failed to download PDF');
  }
}