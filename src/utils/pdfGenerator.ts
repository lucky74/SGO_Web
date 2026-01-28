
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = async (elementId: string, title: string) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found`);
    alert('Error: Element not found for PDF generation');
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2, // Higher quality
      logging: false,
      useCORS: true, // Handle cross-origin images if any
      allowTaint: true,
      backgroundColor: '#0f172a', // Ensure background color is captured (slate-900)
      onclone: (clonedDoc) => {
        // Hide elements with 'hide-on-pdf' class
        const hiddenElements = clonedDoc.getElementsByClassName('hide-on-pdf');
        Array.from(hiddenElements).forEach((el) => {
          (el as HTMLElement).style.display = 'none';
        });

        // Force specific styles for PDF layout
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          clonedElement.style.width = '1200px'; // Force desktop width for consistent layout
          clonedElement.style.padding = '40px'; // Add padding
          clonedElement.style.margin = '0';
          
          // Ensure all text is visible and properly colored
          const allText = clonedElement.querySelectorAll('*');
          allText.forEach((el) => {
            if (el instanceof HTMLElement) {
              // Ensure text color is light for dark background
               // We don't force it here because Tailwind classes usually handle it, 
               // but if there are issues, we can uncomment:
               // el.style.color = '#e2e8f0'; 
            }
          });
        }
      }
    });

    const imgData = canvas.toDataURL('image/png');
    // Landscape A4
    const pdf = new jsPDF('l', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    // Add subsequent pages if content is long
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    // Add Footer to all pages
    const pageCount = (pdf as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.setFontSize(10);
      pdf.setTextColor(150); // Light gray for footer on dark bg? No, PDF footer is on top of image? 
      // Wait, if image covers the whole page, footer might be covered or invisible.
      // If we use landscape, the image might fit better.
      // Let's make footer white/light gray
      pdf.setTextColor(200, 200, 200); 
      pdf.text(
        'Laporan di buat oleh SGO Intelijen',
        pdfWidth / 2,
        pdfHeight - 10,
        { align: 'center' }
      );
    }

    pdf.save(`${title.replace(/\s+/g, '_')}_Report.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. Please check console for details.');
  }
};
