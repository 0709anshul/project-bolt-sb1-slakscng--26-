import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { addDocumentHeader } from './header';
import { addSideUpIcon } from './icons/sideUp';
import { PDF_CONFIG } from './config';
import type { ProductionOrder } from '../../types/orders';

const COPIES_PER_PAGE = 5;
const QR_SIZE = 30;
const MARGIN_RIGHT = 20;
const COPY_SPACING = 10;
const SIDE_UP_ICON_SIZE = 15;

async function generateQRCode(data: string): Promise<string> {
  try {
    return await QRCode.toDataURL(data, {
      width: QR_SIZE * 4,
      margin: 0
    });
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
}

async function addBatchRecordCopy(
  doc: jsPDF,
  order: ProductionOrder,
  details: string,
  startY: number
): Promise<number> {
  const pageWidth = doc.internal.pageSize.width;
  const marginLeft = PDF_CONFIG.header.marginLeft;
  
  // Add Leumasware header for each copy
  doc.setFontSize(PDF_CONFIG.header.brandNameSize);
  doc.setFont('helvetica', 'bold');
  doc.text('Leumasware®', marginLeft, startY + 6);

  doc.setFontSize(PDF_CONFIG.header.subtitleSize);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...PDF_CONFIG.colors.gray);
  doc.text('ISO 9001:2015 Company', marginLeft, startY + 12);
  doc.setTextColor(0);

  // Add THIS SIDE UP icon
  addSideUpIcon(
    doc,
    pageWidth - MARGIN_RIGHT - QR_SIZE - SIDE_UP_ICON_SIZE - 10,
    startY + 6,
    SIDE_UP_ICON_SIZE
  );

  // Add batch record title
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Batch Record', marginLeft, startY + 22);
  doc.setFont('helvetica', 'normal');

  // Add order details
  doc.setFontSize(10);
  const orderInfo = [
    `PO Number: ${order.po_number}`,
    `Product: ${order.product?.name || 'N/A'}`,
    `Quantity: ${order.quantity}`
  ];

  orderInfo.forEach((line, index) => {
    doc.text(line, marginLeft, startY + 32 + (index * 5));
  });

  // Generate and add QR code
  const qrData = JSON.stringify({
    po: order.po_number,
    product: order.product?.name,
    quantity: order.quantity
  });

  const qrCodeDataUrl = await generateQRCode(qrData);
  doc.addImage(
    qrCodeDataUrl,
    'PNG',
    pageWidth - MARGIN_RIGHT - QR_SIZE,
    startY + 6,
    QR_SIZE,
    QR_SIZE
  );

  // Add batch record details with preserved line breaks
  doc.setFontSize(10);
  const maxWidth = pageWidth - marginLeft - MARGIN_RIGHT - QR_SIZE - 10;
  
  // Split details by line breaks and remove HTML tags
  const lines = details
    .replace(/<\/?p>/g, '')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);

  // Process each line and wrap if needed
  let currentY = startY + 50;
  lines.forEach(line => {
    const wrappedLines = doc.splitTextToSize(line, maxWidth);
    wrappedLines.forEach(wrappedLine => {
      doc.text(wrappedLine, marginLeft, currentY);
      currentY += 5;
    });
  });

  // Return position for next copy with dynamic height
  return Math.max(currentY + COPY_SPACING, startY + 80);
}

export async function exportBatchRecord(
  order: ProductionOrder,
  details: string
): Promise<void> {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    let currentY = 20;

    // Add multiple copies
    for (let i = 0; i < COPIES_PER_PAGE; i++) {
      // Add page break if needed
      if (i > 0 && currentY > doc.internal.pageSize.height - 100) {
        doc.addPage();
        currentY = 20;
      }

      currentY = await addBatchRecordCopy(doc, order, details, currentY);
      
      // Add separator line between copies
      if (i < COPIES_PER_PAGE - 1) {
        doc.setDrawColor(...PDF_CONFIG.colors.separator);
        doc.line(
          PDF_CONFIG.header.marginLeft,
          currentY - 5,
          doc.internal.pageSize.width - PDF_CONFIG.header.marginLeft,
          currentY - 5
        );
      }
    }

    // Save the PDF
    doc.save(`batch_record_${order.po_number}.pdf`);
  } catch (error) {
    console.error('Error generating batch record PDF:', error);
    throw new Error('Failed to generate batch record PDF');
  }
}