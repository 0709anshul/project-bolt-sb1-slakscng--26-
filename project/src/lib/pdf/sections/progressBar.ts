import type { jsPDF } from 'jspdf';
import { calculateTasksProgress } from '../../utils/progress';
import { formatProgress } from '../formatting';
import { PDF_CONFIG } from '../config';
import type { Task } from '../../../types/orders';

export function addProgressBar(doc: jsPDF, tasks: Task[], startY: number): number {
  const progress = calculateTasksProgress(tasks);
  const barWidth = 150;
  const barHeight = 10;
  const marginLeft = PDF_CONFIG.header.marginLeft;

  // Add progress label
  doc.setFontSize(11);
  doc.text(`Overall Progress: ${formatProgress(progress)}`, marginLeft, startY);

  // Draw background bar
  doc.setFillColor(245, 245, 245);
  doc.rect(marginLeft, startY + 5, barWidth, barHeight, 'F');

  // Draw progress bar
  doc.setFillColor(39, 174, 96); // Green
  doc.rect(marginLeft, startY + 5, (barWidth * progress) / 100, barHeight, 'F');

  return startY + barHeight + 15; // Return next Y position
}