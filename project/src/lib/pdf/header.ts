import type { jsPDF } from 'jspdf';
import { PDF_CONFIG } from './config';

export function addDocumentHeader(doc: jsPDF): { startY: number } {
  try {
    // Add letterhead text
    doc.setFontSize(PDF_CONFIG.header.brandNameSize);
    doc.setFont('helvetica', 'bold');
    doc.text(
      'Leumasware®',
      PDF_CONFIG.header.marginLeft,
      PDF_CONFIG.header.marginTop
    );

    // Add subtitle
    doc.setFontSize(PDF_CONFIG.header.subtitleSize);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...PDF_CONFIG.colors.gray);
    doc.text(
      'ISO 9001:2015 Company',
      PDF_CONFIG.header.marginLeft,
      PDF_CONFIG.header.marginTop + 8
    );

    // Reset text color and add separator line
    doc.setTextColor(0, 0, 0);
    doc.setDrawColor(...PDF_CONFIG.colors.separator);
    doc.line(
      PDF_CONFIG.header.marginLeft,
      PDF_CONFIG.header.marginTop + 12,
      doc.internal.pageSize.width - PDF_CONFIG.header.marginLeft,
      PDF_CONFIG.header.marginTop + 12
    );

    return { startY: PDF_CONFIG.header.marginTop + 25 };
  } catch (error) {
    console.error('Header generation error:', error);
    // Return a safe fallback position
    return { startY: PDF_CONFIG.header.marginTop + 10 };
  }
}