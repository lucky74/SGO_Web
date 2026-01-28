
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = async (elementId: string, title: string) => {
  // Logic to unhide both reports if they exist
  const miWrapper = document.getElementById('mi-wrapper');
  const taWrapper = document.getElementById('ta-wrapper');

  const originalStyles = new Map();
  if (miWrapper) originalStyles.set(miWrapper, { display: miWrapper.style.display });
  if (taWrapper) originalStyles.set(taWrapper, { display: taWrapper.style.display });

  // Temporarily show both
  if (miWrapper) miWrapper.style.display = 'block';
  if (taWrapper) taWrapper.style.display = 'block';

  // Give React/Browser a moment to render the unhidden elements
  await new Promise(resolve => setTimeout(resolve, 800));

  try {
    const canvas = await html2canvas(document.body, { // Capture full body to reach all wrappers
      scale: 2, // Higher quality
      logging: false,
      useCORS: true, // Handle cross-origin images if any
      allowTaint: true,
      backgroundColor: '#ffffff', // Force white background
      windowWidth: 1600, // Ensure desktop layout
      onclone: (clonedDoc) => {
        // --- 1. PREPARE NEW DOCUMENT STRUCTURE ---
        // Find where we want to inject the new report. 
        // Since we are capturing body, we can just clear body and append our reportRoot?
        // OR create a overlay?
        // Safest is to find the original container we targeted (if it exists in clone) and replace it,
        // but since we are capturing BODY, we should probably clear BODY and put reportRoot there.
        // HOWEVER, html2canvas renders the *viewport*. If we clear body, we might lose styles?
        // Let's create a new clean container at the top of body.
        
        const body = clonedDoc.body;
        
        // Create a new Root for the PDF Report
        const reportRoot = clonedDoc.createElement('div');
        reportRoot.id = 'pdf-report-root';
        // A4 Portrait Width approx 800px at standard screen DPI, but we will force scaling later.
        // Important: We set padding here to simulate the 4433 margins visually in the DOM
        // Top: 4cm, Left: 4cm, Bottom: 3cm, Right: 3cm
        // 1cm ~= 37.8px
        // Top: 151px, Left: 151px, Bottom: 113px, Right: 113px
        reportRoot.style.width = '794px'; // A4 width at 96 DPI
        reportRoot.style.padding = '151px 113px 113px 151px'; // 4-3-3-4 Layout
        reportRoot.style.boxSizing = 'border-box';
        reportRoot.style.backgroundColor = '#ffffff';
        reportRoot.style.color = '#000000';
        reportRoot.style.fontFamily = 'Times New Roman, serif'; // Professional Font
        reportRoot.style.margin = '0 auto'; // Center it
        
        // --- 2. HEADER (KOP SURAT) ---
        const headerDiv = clonedDoc.createElement('div');
        headerDiv.innerHTML = `
            <div style="border-bottom: 3px double #000; padding-bottom: 20px; margin-bottom: 30px; text-align: center;">
                <h1 style="margin: 0; font-size: 24px; font-weight: 800; text-transform: uppercase; color: #000; letter-spacing: 1px;">SGO INTELIJEN</h1>
                <p style="margin: 5px 0; font-size: 14px; color: #555;">Hotel Market Intelligence & Trend Analysis Report</p>
                <div style="display: flex; justify-content: space-between; font-size: 12px; margin-top: 15px; color: #333; font-style: italic;">
                    <span>Generated on: ${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span>Confidential Document</span>
                </div>
            </div>
            <h2 style="text-align: center; margin-bottom: 30px; font-size: 18px; text-decoration: underline; text-transform: uppercase;">${title.replace(/_/g, ' ')} REPORT</h2>
        `;
        reportRoot.appendChild(headerDiv);

        // --- 3. EXTRACT & RESTRUCTURE CONTENT ---
        
        // Helper to find and append element
        const moveElement = (id: string, sectionTitle: string) => {
            const el = clonedDoc.getElementById(id);
            if (el) {
                const section = clonedDoc.createElement('div');
                section.style.marginBottom = '30px';
                
                const title = clonedDoc.createElement('h3');
                title.innerText = sectionTitle;
                title.style.borderLeft = '4px solid #000';
                title.style.paddingLeft = '10px';
                title.style.marginBottom = '15px';
                title.style.fontSize = '14px';
                title.style.fontWeight = 'bold';
                title.style.textTransform = 'uppercase';
                title.style.color = '#000';
                
                section.appendChild(title);
                section.appendChild(el);
                reportRoot.appendChild(section);

                // Fix styling of moved element
                el.style.backgroundColor = '#fff';
                el.style.color = '#000';
                el.style.border = 'none';
                el.style.padding = '0';
                el.style.margin = '0';
                
                // Fix specific child elements
                const cards = el.querySelectorAll('.glass-card');
                cards.forEach((card: any) => {
                    card.style.backgroundColor = '#fff';
                    card.style.border = '1px solid #ccc';
                    card.style.color = '#000';
                    card.style.boxShadow = 'none';
                    card.style.marginBottom = '10px';
                    card.style.padding = '15px';
                    card.style.borderRadius = '0';
                });

                const texts = el.querySelectorAll('*');
                texts.forEach((t: any) => {
                    t.style.color = '#000';
                    t.style.textShadow = 'none';
                    t.style.fontFamily = 'Times New Roman, serif';
                });
            }
        };

        // --- ALWAYS INCLUDE MARKET INTELLIGENCE IF AVAILABLE ---
        moveElement('report-summary-metrics', 'Executive Summary');
        moveElement('report-main-chart', 'Market Price Analysis');
        moveElement('report-data-table', 'Detailed Hotel Listings');

        // --- ALWAYS INCLUDE TREND ANALYSIS IF AVAILABLE ---
        moveElement('report-trend-metrics', 'Performance Metrics');
        
        // Group Charts for Trend
        const chartsContainer = clonedDoc.createElement('div');
        chartsContainer.style.display = 'block';
        
        const chart1 = clonedDoc.getElementById('report-trend-chart-1');
        const chart2 = clonedDoc.getElementById('report-trend-chart-2');
        const chart3 = clonedDoc.getElementById('report-trend-chart-3');
        
        if (chart1 || chart2 || chart3) {
                const chartSection = clonedDoc.createElement('div');
                chartSection.style.marginBottom = '40px';
                chartSection.innerHTML = `<h3 style="border-left: 4px solid #000; padding-left: 10px; margin-bottom: 15px; font-size: 14px; text-transform: uppercase; color: #000; font-weight: bold;">Visual Market Trends</h3>`;
                
                [chart1, chart2, chart3].forEach(c => {
                if (c) {
                    c.style.backgroundColor = '#fff';
                    c.style.marginBottom = '20px';
                    c.style.border = '1px solid #eee';
                    c.style.padding = '10px';
                    // Fix text color inside charts
                    c.querySelectorAll('text').forEach((t: any) => {
                        t.style.fill = '#000';
                        t.style.fontFamily = 'Times New Roman, serif';
                        t.style.fontSize = '10px';
                    });
                    chartSection.appendChild(c);
                }
                });
                reportRoot.appendChild(chartSection);
        }

        moveElement('report-trend-table', 'Competitor Leaderboard');

        // --- 4. SMART PAGINATION (Portrait Mode) ---
        // A4 Portrait Content Height = 297mm - 40mm (top) - 30mm (bottom) = 227mm
        // 227mm * 3.78px/mm ~= 858px
        const CONTENT_HEIGHT_PX = 850; 
        let currentY = 0;
        
        const sections = Array.from(reportRoot.children) as HTMLElement[];
        
        sections.forEach((section) => {
            let h = section.offsetHeight;
            
            if (h === 0) {
                // Fallback estimates
                if (section.innerHTML.includes('SGO INTELIJEN')) h = 200; // Header
                else if (section.querySelector('h3')) h = 100 + (section.innerText.length / 2); // Title + some content
                else h = 300; // Generic block
            }
            
            // Special handling for Charts (usually taller)
            if (section.querySelector('.recharts-wrapper') || section.querySelector('canvas') || section.id.includes('chart')) {
                h = Math.max(h, 400); // Reduce chart height for portrait
            }
            // Special handling for Tables (can be long)
            if (section.querySelector('table')) {
                const rows = section.querySelectorAll('tr').length;
                h = Math.max(h, rows * 40 + 100); // Estimate table height
            }

            const posOnPage = currentY % CONTENT_HEIGHT_PX;
            const spaceLeft = CONTENT_HEIGHT_PX - posOnPage;

            // If section is taller than space left, AND it fits on a fresh page
            if (h > spaceLeft && h < CONTENT_HEIGHT_PX) {
                // Add spacer to push to next page
                const spacer = clonedDoc.createElement('div');
                spacer.style.height = `${spaceLeft + 50}px`; // +50 for safety
                spacer.style.width = '100%';
                spacer.style.display = 'block';
                reportRoot.insertBefore(spacer, section);
                
                currentY += (spaceLeft + 50);
            }
            
            currentY += h;
        });

        // --- 5. FINAL CLEANUP ---
        // Replace BODY content with new report root
        // This is drastic but ensures only the report is captured
        body.innerHTML = '';
        body.appendChild(reportRoot);
        
        // Force width for PDF capture
        // We set body width to match report width to ensure no whitespace issues
        body.style.width = '794px'; 
        body.style.height = 'auto';
        body.style.margin = '0';
        body.style.overflow = 'visible';
        body.style.backgroundColor = '#fff';

        // Add Print Styles for Tables
        const style = clonedDoc.createElement('style');
        style.innerHTML = `
            table { width: 100% !important; border-collapse: collapse !important; border: 1px solid #000 !important; font-size: 11px !important; font-family: 'Times New Roman', serif !important; }
            th { background-color: #eee !important; color: #000 !important; font-weight: bold !important; padding: 6px !important; border: 1px solid #000 !important; }
            td { padding: 6px !important; border: 1px solid #ccc !important; color: #000 !important; }
            tr:nth-child(even) { background-color: #f9f9f9 !important; }
            .hide-on-pdf { display: none !important; }
            * { font-family: 'Times New Roman', serif !important; }
        `;
        clonedDoc.head.appendChild(style);
      }
    });

    const imgData = canvas.toDataURL('image/png');
    // Portrait A4
    const pdf = new jsPDF('p', 'mm', 'a4');
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
      pdf.setFontSize(9);
      pdf.setFont('times', 'normal');
      pdf.setTextColor(100, 100, 100);
      pdf.text(
        'Laporan dibuat oleh SGO Intelijen - Copyright 2026',
        pdfWidth / 2,
        pdfHeight - 10,
        { align: 'center' }
      );
    }

    pdf.save(`${title.replace(/\s+/g, '_')}_Report.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. Please check console for details.');
  } finally {
      // Restore styles
      if (miWrapper) miWrapper.style.display = originalStyles.get(miWrapper).display;
      if (taWrapper) taWrapper.style.display = originalStyles.get(taWrapper).display;
  }
};
