import type { jsPDF } from 'jspdf';
import type { ProductionOrder } from '../../../types/orders';
import { PDF_CONFIG } from '../config';

export function addOrderInfo(doc: jsPDF, order: ProductionOrder, startY: number): number {
  doc.setFontSize(11);
  
  const infoLines = [
    `PO Number: ${order.po_number}`,
    `Product: ${order.product?.name || 'N/A'}`,
    `Order Type: ${order.order_type}`,
    `Quantity: ${order.quantity}`,
    `Priority: ${order.is_priority ? 'Yes' : 'No'}`,
    order.organization ? `Brand: ${order.organization.name}` : null
  ].filter(Boolean);

  infoLines.forEach((line, index) => {
    if (line) {
      doc.text(line, PDF_CONFIG.header.marginLeft, startY + (index * 6));
    }
  });

  return startY + (infoLines.length * 6);
}