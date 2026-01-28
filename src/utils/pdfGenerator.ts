
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
        const element = clonedDoc.getElementById(elementId);
        
        // --- 1. INJECT KOP SURAT (HEADER) ---
        if (element) {
          const headerDiv = clonedDoc.createElement('div');
          headerDiv.style.textAlign = 'center';
          headerDiv.style.marginBottom = '30px';
          headerDiv.style.borderBottom = '3px double #1e293b'; // Garis ganda formal
          headerDiv.style.paddingBottom = '20px';
          headerDiv.style.fontFamily = 'Arial, Helvetica, sans-serif';
          
          headerDiv.innerHTML = `
            <h1 style="margin: 0; font-size: 28px; font-weight: 800; color: #1e293b; letter-spacing: 2px;">SGO INTELIJEN</h1>
            <p style="margin: 8px 0 0; font-size: 14px; color: #64748b; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">Hotel Market Intelligence & Trend Analysis Report</p>
            <div style="margin-top: 15px; font-size: 12px; color: #94a3b8; display: flex; justify-content: space-between;">
              <span>Report Date: ${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span>Confidential Document</span>
            </div>
          `;
          
          element.insertBefore(headerDiv, element.firstChild);
        }

        // --- 2. INJECT PRINT STYLES ---
        const style = clonedDoc.createElement('style');
        style.innerHTML = `
          /* Reset & Base Fonts */
          * {
            color: #0f172a !important; /* Slate 900 */
            text-shadow: none !important;
            font-family: 'Arial', 'Helvetica', sans-serif !important;
            box-shadow: none !important;
          }
          
          /* Container Reset */
          #trend-analysis-report, #market-intelligence-report {
            background: #ffffff !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          /* Cards to Sections */
          .glass-card {
            background: #ffffff !important;
            border: 1px solid #e2e8f0 !important; /* Light gray border */
            border-radius: 0 !important;
            margin-bottom: 30px !important;
            padding: 20px !important;
            break-inside: avoid; /* Usaha mencegah potong halaman di tengah card */
          }

          /* Titles */
          h2, h3 {
            color: #0f172a !important;
            text-transform: uppercase;
            font-weight: 700 !important;
            letter-spacing: 0.5px;
            margin-bottom: 15px !important;
            border-left: 4px solid #0f172a;
            padding-left: 12px;
          }

          /* Metric Cards (Kotak-kotak angka) */
          .glass-card.border-l-4 {
            border: 1px solid #cbd5e1 !important;
            border-left-width: 6px !important;
            background-color: #f8fafc !important;
          }
          .text-3xl.font-bold {
            color: #0f172a !important;
          }

          /* Tables - Formal Style */
          table {
            width: 100% !important;
            border-collapse: collapse !important;
            border: 1px solid #000 !important;
            font-size: 12px !important;
            margin-top: 10px !important;
          }
          th {
            background-color: #e2e8f0 !important; /* Light gray header */
            color: #000 !important;
            font-weight: bold !important;
            text-transform: uppercase;
            border: 1px solid #000 !important;
            padding: 10px !important;
            text-align: left;
          }
          td {
            border: 1px solid #cbd5e1 !important;
            padding: 8px 10px !important;
            color: #334155 !important;
          }
          tr:nth-child(even) {
            background-color: #f1f5f9 !important; /* Zebra striping */
          }

          /* Charts */
          .recharts-wrapper {
            margin: 0 auto !important;
          }
          text {
            fill: #475569 !important; /* Darker chart text */
            font-size: 11px !important;
            font-weight: 500;
          }
          /* Hide UI Elements */
          .hide-on-pdf {
            display: none !important;
          }
        `;
        clonedDoc.head.appendChild(style);

        // --- 3. LAYOUT ADJUSTMENTS ---
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          // A4 Landscape width approx 1122px (at 96dpi) or higher depending on scale.
          // Setting a fixed width ensures consistent layout.
          clonedElement.style.width = '1200px'; 
          clonedElement.style.padding = '40px';
          clonedElement.style.margin = '0 auto';
          clonedElement.style.backgroundColor = '#ffffff';
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
