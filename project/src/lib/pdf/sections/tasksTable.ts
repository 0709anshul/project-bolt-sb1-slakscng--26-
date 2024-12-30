import type { jsPDF } from 'jspdf';
import { formatDate } from '../../utils/date';
import { calculateTasksProgress } from '../../utils/progress';
import { formatProgress } from '../formatting';
import { PDF_CONFIG } from '../config';
import type { Task, ProductionOrder } from '../../../types/orders';

export function addTasksTable(
  doc: jsPDF, 
  tasks: Task[], 
  startY: number,
  order: ProductionOrder
): void {
  try {
    const pageWidth = doc.internal.pageSize.width;
    const margins = PDF_CONFIG.header.marginLeft + PDF_CONFIG.header.marginRight;
    const tableWidth = pageWidth - margins;

    // Calculate column widths based on available space
    const columnWidths = {
      details: Math.floor(tableWidth * 0.55), // 55% for details
      status: Math.floor(tableWidth * 0.15),  // 15% for status
      dueDate: Math.floor(tableWidth * 0.15), // 15% for due date
      progress: Math.floor(tableWidth * 0.15) // 15% for progress
    };

    (doc as any).autoTable({
      startY,
      head: [['Task Details', 'Status', 'Due Date', 'Progress']],
      body: tasks.map(task => [
        task.details,
        task.status.replace(/_/g, ' '),
        formatDate(task.due_date),
        formatProgress(calculateTasksProgress([task]))
      ]),
      headStyles: PDF_CONFIG.table.headStyles,
      bodyStyles: PDF_CONFIG.table.bodyStyles,
      alternateRowStyles: PDF_CONFIG.table.alternateRowStyles,
      margin: { left: PDF_CONFIG.header.marginLeft },
      columnStyles: {
        0: { cellWidth: columnWidths.details },
        1: { cellWidth: columnWidths.status },
        2: { cellWidth: columnWidths.dueDate },
        3: { cellWidth: columnWidths.progress }
      },
      didDrawPage: (data: any) => {
        // Add header on each new page
        doc.setFontSize(8);
        doc.setTextColor(128);
        doc.text(
          `${order.po_number} - Page ${data.pageNumber}`,
          PDF_CONFIG.header.marginLeft,
          doc.internal.pageSize.height - 10
        );
      }
    });
  } catch (error) {
    console.error('Error adding tasks table:', error);
    throw new Error('Failed to add tasks table to PDF');
  }
}