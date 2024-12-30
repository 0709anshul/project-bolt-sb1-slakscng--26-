// Common types for PDF generation
export type PdfDocument = any; // Replace with proper jsPDF type when available

export type HeaderConfig = {
  marginTop: number;
  marginLeft: number;
  logoWidth: number;
  logoHeight: number;
  brandNameSize: number;
  subtitleSize: number;
};

export type HeaderResult = {
  startY: number;
  success: boolean;
  error?: Error;
};