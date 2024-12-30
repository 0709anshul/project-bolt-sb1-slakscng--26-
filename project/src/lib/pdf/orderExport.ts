import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { addDocumentHeader } from './header';
import { addOrderInfo } from './sections/orderInfo';
import { addProgressBar } from './sections/progressBar';
import { addTasksTable } from './sections/tasksTable';
import { PDF_CONFIG } from './config';
import type { ProductionOrder } from '../../types/orders';

export function exportOrderToPdf(order: ProductionOrder): void {
  if (!order) {
    throw new Error('Order is required for PDF export');
  }

  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Add header
    const { startY } = addDocumentHeader(doc);

    // Add order details
    doc.setFontSize(14);
    doc.text('Production Order Details', PDF_CONFIG.header.marginLeft, startY);

    // Add order info section
    const infoEndY = addOrderInfo(doc, order, startY + 10);

    // Add progress bar if there are tasks
    let nextY = infoEndY + 10;
    if (order.tasks?.length) {
      nextY = addProgressBar(doc, order.tasks, nextY);
      
      // Add tasks table with order reference
      addTasksTable(doc, order.tasks, nextY + 5, order);
    }

    // Save the PDF
    doc.save(`${order.po_number}_details.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
}