export const PDF_CONFIG = {
  header: {
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    brandNameSize: 16,
    subtitleSize: 10
  },
  colors: {
    gray: [128, 128, 128],
    separator: [229, 231, 235]
  },
  table: {
    headStyles: {
      fillColor: [63, 81, 181],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8
    },
    bodyStyles: {
      fontSize: 8,
      cellPadding: 2
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245]
    },
    columnWidths: {
      details: 0.5,    // 50% of available width
      status: 0.15,    // 15% of available width
      dueDate: 0.15,   // 15% of available width
      progress: 0.15   // 15% of available width
    }
  }
} as const;