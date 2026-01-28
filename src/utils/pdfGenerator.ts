
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
      backgroundColor: '#ffffff', // Force white background
      onclone: (clonedDoc) => {
        // Inject Print Styles
        const style = clonedDoc.createElement('style');
        style.innerHTML = `
          /* General Reset */
          * {
            color: #1e293b !important; /* Dark Slate Text */
            text-shadow: none !important;
            font-family: 'Times New Roman', Times, serif !important; /* Document Font */
          }
          
          /* Container Background */
          #trend-analysis-report, #market-intelligence-report, .glass-card {
            background: #ffffff !important;
            background-color: #ffffff !important;
            border: none !important;
            box-shadow: none !important;
          }

          /* Sections */
          .glass-card {
            border-bottom: 1px solid #cbd5e1 !important;
            margin-bottom: 2rem !important;
            padding: 1rem 0 !important;
            border-radius: 0 !important;
          }

          /* Headers */
          h2, h3 {
            color: #0f172a !important; /* Very Dark Slate */
            font-weight: bold !important;
            text-transform: uppercase;
            border-left: 5px solid #3b82f6;
            padding-left: 10px;
          }

          /* Tables */
          table {
            width: 100% !important;
            border-collapse: collapse !important;
            margin-top: 1rem !important;
          }
          th {
            background-color: #f1f5f9 !important;
            color: #0f172a !important;
            font-weight: bold !important;
            border-bottom: 2px solid #334155 !important;
            text-transform: uppercase;
            font-size: 0.8rem !important;
          }
          td {
            border-bottom: 1px solid #e2e8f0 !important;
            padding: 8px !important;
          }
          tr:nth-child(even) {
            background-color: #f8fafc !important;
          }

          /* Charts (SVG) Fixes */
          text {
            fill: #334155 !important; /* Axis labels */
            font-family: sans-serif !important;
            font-size: 12px !important;
          }
          .recharts-cartesian-grid-horizontal line, .recharts-cartesian-grid-vertical line {
            stroke: #e2e8f0 !important; /* Lighter grid lines */
          }
          
          /* Hide Elements */
          .hide-on-pdf {
            display: none !important;
          }
        `;
        clonedDoc.head.appendChild(style);

        // Hide elements with 'hide-on-pdf' class
        const hiddenElements = clonedDoc.getElementsByClassName('hide-on-pdf');
        Array.from(hiddenElements).forEach((el) => {
          (el as HTMLElement).style.display = 'none';
        });

        // Force specific styles for PDF layout
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          clonedElement.style.width = '1400px'; // Wider for Landscape
          clonedElement.style.padding = '40px';
          clonedElement.style.margin = '0 auto';
          clonedElement.style.color = '#1e293b';
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
      // pdf.setTextColor(200, 200, 200); 
      // Changed to dark gray for white background report
      pdf.setTextColor(100, 100, 100);
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
