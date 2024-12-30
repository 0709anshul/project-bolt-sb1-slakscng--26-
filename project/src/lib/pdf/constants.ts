export const PDF_STYLES = {
  header: {
    fontSize: 20,
    startY: 20,
    startX: 20
  },
  info: {
    fontSize: 12,
    startX: 20,
    lineHeight: 10
  },
  progressBar: {
    width: 150,
    height: 10,
    startX: 20,
    startY: 105,
    colors: {
      background: [240, 240, 240],
      progress: [75, 150, 75]
    }
  },
  table: {
    startY: 130,
    headStyles: {
      fillColor: [63, 81, 181],
      textColor: [255, 255, 255]
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245]
    }
  }
} as const;