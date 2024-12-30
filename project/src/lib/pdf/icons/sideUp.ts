import type { jsPDF } from 'jspdf';

// Arrow icon coordinates
const ARROW_COORDS = [
  [10, 0],   // Top point
  [20, 20],  // Bottom right
  [16, 20],  // Inner right
  [10, 8],   // Inner top
  [4, 20],   // Inner left
  [0, 20]    // Bottom left
];

export function addSideUpIcon(
  doc: jsPDF,
  x: number,
  y: number,
  size: number = 20
): void {
  try {
    // Input validation
    if (!doc || typeof x !== 'number' || typeof y !== 'number') {
      throw new Error('Invalid parameters for side up icon');
    }

    // Save graphics state
    doc.saveGraphicsState();

    // Calculate scale
    const scale = size / 20;

    // Set styles
    doc.setFillColor(0);
    doc.setDrawColor(0);

    // Draw filled triangle
    doc.triangle(
      x + ARROW_COORDS[0][0] * scale, y + ARROW_COORDS[0][1] * scale,
      x + ARROW_COORDS[1][0] * scale, y + ARROW_COORDS[1][1] * scale,
      x + ARROW_COORDS[5][0] * scale, y + ARROW_COORDS[5][1] * scale,
      'F'
    );

    // Add text below icon
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text(
      'THIS SIDE UP',
      x + (size / 2),
      y + size + 8,
      { align: 'center' }
    );

    // Restore graphics state
    doc.restoreGraphicsState();
  } catch (error) {
    console.error('Error adding side up icon:', error);
    // Continue without icon if there's an error
  }
}