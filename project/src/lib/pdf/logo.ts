// Logo dimensions and positioning
const LOGO_WIDTH = 30;
const LOGO_HEIGHT = 15;
const MARGIN_TOP = 15;
const MARGIN_LEFT = 20;

// SVG path for Leumasware logo
const LOGO_PATH = `
M66.82,38.34c-1.02.43-1.76.62-2.37,1.01-14.15,9-22.68,21.8-25.48,38.31-.93,5.47-1.12,11.07-2.04,16.55-.48,2.86-1.74,5.6-2.8,8.34-4.16,10.76-8.38,21.5-12.58,32.24-.22.57-.53,1.1-1.15,2.35-1.46-4.89-2.77-9.12-3.99-13.37-4.28-14.92-6.87-30.12-6.8-45.66.07-14.81,2.53-29.17,9.94-42.3,4.32-7.66,10.09-14.03,16.99-19.5,6.01-4.76,12.01-9.45,19.15-12.45,7.88-3.31,16.01-4.93,24.48-3.11,10.51,2.25,19.8,10.49,21.51,24.12,1.22,9.72-.55,18.88-3.83,27.86-8.63,23.62-18.48,46.74-29.43,69.38-10.52,21.75-21.23,43.42-31.48,65.29-4.51,9.63-8.13,19.68-12.06,29.57-1.23,3.08-1.53,6.32-.83,9.62.72,3.38,2.79,4.5,5.72,2.71,3.67-2.23,7.15-4.77,10.71-7.17,4.35-2.93,8.71-5.86,13.29-8.93,5.61,5.09,11.19,10.14,17.23,15.62-8.66,4.34-16.85,8.53-25.13,12.55-7.73,3.76-15.66,7.01-24.1,8.91-12.04,2.71-22.46-5.11-21.75-17.48.49-8.4,2.42-16.8,4.5-25,4.62-18.23,12.11-35.44,19.51-52.68,5.11-11.92,9.98-23.94,14.94-35.92,3.65-8.8,7.63-17.48,10.82-26.45,4.84-13.61,9.17-27.41,13.62-41.15,1.22-3.77,2.13-7.65,3.16-11.48.11-.43.12-.88.23-1.8Z
M131.31,196.11c-1.12.55-1.98.92-2.79,1.36-5.99,3.3-11.98,6.6-17.94,9.96-1.4.79-2.49.76-3.91-.13-7.05-4.37-13.94-8.93-20.02-15.16.77-.67,1.44-1.41,2.26-1.94,13.95-9.06,27.91-18.08,41.86-27.13,3.63-2.36,7.36-2.3,11.11-.48,7.27,3.52,10.7,9.73,11.74,17.43,1.49,11.03,2.93,22.07,4.25,33.13.52,4.34.71,8.73.93,13.1.25,4.84.46,9.68.51,14.53.07,6.13-3.9,10.48-10.02,10.29-4.88-.15-9.81-.93-14.59-2.02-8.12-1.84-16.32-3.62-24.13-6.41-6.38-2.28-12.41-5.72-18.3-9.15-13.67-7.98-26.51-17.13-37-29.13-3.22-3.68-5.68-8.03-8.33-12.18-.51-.81-.75-2.29-.36-3.1,3.45-7.06,7.08-14.04,10.79-21.31.6.87,1.05,1.49,1.46,2.14,8.29,12.93,17.49,25.22,29.73,34.62,6.88,5.28,14.68,9.51,22.44,13.48,6.25,3.2,13.1,5.22,19.62,7.93,2.11.87,2.9.08,2.96-1.78.07-2.13-.09-4.28-.28-6.41-.63-7.11-1.31-14.22-2-21.65Z
`;

// Convert SVG path to data URL with error handling
function getSvgDataUrl(): string {
  try {
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
      <svg width="159.32" height="251.08" viewBox="0 0 159.32 251.08" xmlns="http://www.w3.org/2000/svg">
        <path fill="#000000" d="${LOGO_PATH}"/>
      </svg>`;
    
    // Ensure proper encoding
    const encoded = encodeURIComponent(svg)
      .replace(/'/g, '%27')
      .replace(/"/g, '%22');
      
    return `data:image/svg+xml;charset=UTF-8,${encoded}`;
  } catch (error) {
    console.error('Error creating SVG data URL:', error);
    throw new Error('Failed to create logo');
  }
}

export function addLogoHeader(doc: any): number {
  try {
    // Add logo
    const logoUrl = getSvgDataUrl();
    doc.addImage(logoUrl, 'SVG', MARGIN_LEFT, MARGIN_TOP, LOGO_WIDTH, LOGO_HEIGHT);
    
    // Add brand name
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Leumasware®', MARGIN_LEFT + LOGO_WIDTH + 5, MARGIN_TOP + 8);
    
    // Add subtitle
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(128, 128, 128);
    doc.text('ISO 9001:2015 Company', MARGIN_LEFT + LOGO_WIDTH + 5, MARGIN_TOP + 15);
    
    // Reset text color
    doc.setTextColor(0, 0, 0);
    
    // Add separator line
    doc.setDrawColor(229, 231, 235);
    doc.line(MARGIN_LEFT, MARGIN_TOP + 20, doc.internal.pageSize.width - MARGIN_LEFT, MARGIN_TOP + 20);
    
    // Return Y position after header
    return MARGIN_TOP + 35;
  } catch (error) {
    console.error('Error adding logo header:', error);
    // Continue without logo if there's an error
    return MARGIN_TOP + 10;
  }
}