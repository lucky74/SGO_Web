
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
        // --- 1. PREPARE NEW DOCUMENT STRUCTURE ---
        const originalContainer = clonedDoc.getElementById(elementId);
        if (!originalContainer) return;

        // Create a new Root for the PDF Report
        const reportRoot = clonedDoc.createElement('div');
        reportRoot.id = 'pdf-report-root';
        reportRoot.style.width = '100%';
        reportRoot.style.padding = '40px';
        reportRoot.style.boxSizing = 'border-box';
        reportRoot.style.backgroundColor = '#ffffff';
        reportRoot.style.color = '#000000';
        reportRoot.style.fontFamily = 'Arial, sans-serif';

        // --- 2. HEADER (KOP SURAT) ---
        const headerDiv = clonedDoc.createElement('div');
        headerDiv.innerHTML = `
            <div style="border-bottom: 3px double #000; padding-bottom: 20px; margin-bottom: 30px; text-align: center;">
                <h1 style="margin: 0; font-size: 24px; font-weight: 800; text-transform: uppercase; color: #000;">SGO INTELIJEN</h1>
                <p style="margin: 5px 0; font-size: 14px; color: #555;">Hotel Market Intelligence & Trend Analysis Report</p>
                <div style="display: flex; justify-content: space-between; font-size: 12px; margin-top: 15px; color: #333;">
                    <span>Generated on: ${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span>Confidential - For Internal Use Only</span>
                </div>
            </div>
            <h2 style="text-align: center; margin-bottom: 30px; font-size: 20px; text-decoration: underline;">${title.replace(/_/g, ' ').toUpperCase()} REPORT</h2>
        `;
        reportRoot.appendChild(headerDiv);

        // --- 3. EXTRACT & RESTRUCTURE CONTENT ---
        
        // Helper to find and append element
        const moveElement = (id: string, sectionTitle: string) => {
            const el = clonedDoc.getElementById(id);
            if (el) {
                const section = clonedDoc.createElement('div');
                section.style.marginBottom = '40px';
                section.style.pageBreakInside = 'avoid'; // Prevent breaking inside section

                const title = clonedDoc.createElement('h3');
                title.innerText = sectionTitle;
                title.style.borderLeft = '4px solid #000';
                title.style.paddingLeft = '10px';
                title.style.marginBottom = '15px';
                title.style.fontSize = '16px';
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
                });

                const texts = el.querySelectorAll('*');
                texts.forEach((t: any) => {
                    t.style.color = '#000';
                    t.style.textShadow = 'none';
                });
            }
        };

        // MARKET INTELLIGENCE REPORT STRUCTURE
        if (elementId === 'market-intelligence-report') {
            moveElement('report-summary-metrics', 'Executive Summary');
            moveElement('report-main-chart', 'Market Price Analysis');
            moveElement('report-data-table', 'Detailed Hotel Listings');
        } 
        // TREND ANALYSIS REPORT STRUCTURE
        else if (elementId === 'trend-analysis-report') {
            moveElement('report-trend-metrics', 'Performance Metrics');
            
            // Group Charts
            const chartsContainer = clonedDoc.createElement('div');
            chartsContainer.style.display = 'block';
            
            const chart1 = clonedDoc.getElementById('report-trend-chart-1');
            const chart2 = clonedDoc.getElementById('report-trend-chart-2');
            const chart3 = clonedDoc.getElementById('report-trend-chart-3');
            
            if (chart1 || chart2 || chart3) {
                 const chartSection = clonedDoc.createElement('div');
                 chartSection.style.marginBottom = '40px';
                 chartSection.innerHTML = `<h3 style="border-left: 4px solid #000; padding-left: 10px; margin-bottom: 15px; font-size: 16px; text-transform: uppercase; color: #000;">Visual Market Trends</h3>`;
                 
                 [chart1, chart2, chart3].forEach(c => {
                    if (c) {
                        c.style.backgroundColor = '#fff';
                        c.style.marginBottom = '20px';
                        c.style.border = '1px solid #eee';
                        c.style.padding = '10px';
                        // Fix text color inside charts
                        c.querySelectorAll('text').forEach((t: any) => t.style.fill = '#000');
                        chartSection.appendChild(c);
                    }
                 });
                 reportRoot.appendChild(chartSection);
            }

            moveElement('report-trend-table', 'Competitor Leaderboard');
        }

        // --- 4. SMART PAGINATION (Prevent Cut-off Charts) ---
        // Calculate A4 Landscape height in pixels based on 1200px width
        // A4: 297mm x 210mm. Ratio: 1200px / 297mm = ~4.04 px/mm
        // Page Height = 210mm * 4.04 = ~848px
        const PAGE_HEIGHT_PX = 800; // Using 800px to be safe (leave room for margins/footer)
        let currentY = 0;
        
        // Force layout calculation
        // We need to append reportRoot to body temporarily to get accurate heights?
        // In html2canvas onclone, the document is inside an iframe.
        
        const sections = Array.from(reportRoot.children) as HTMLElement[];
        
        sections.forEach((section) => {
            // Get approximate height (might be tricky in detached DOM)
            // Assuming standard block heights:
            // Header ~ 150px
            // Section Title ~ 40px
            // Chart ~ 400px
            // Table ~ variable
            
            // Let's try to trust offsetHeight if available, otherwise estimate
            // In onclone, offsetHeight might be 0 if not attached to document body.
            // We can try to guess based on class names or content.
            
            let h = section.offsetHeight;
            
            if (h === 0) {
                // Fallback estimates
                if (section.innerHTML.includes('SGO INTELIJEN')) h = 200; // Header
                else if (section.querySelector('h3')) h = 100 + (section.innerText.length / 2); // Title + some content
                else h = 300; // Generic block
            }
            
            // Special handling for Charts (usually taller)
            if (section.querySelector('.recharts-wrapper') || section.querySelector('canvas') || section.id.includes('chart')) {
                h = Math.max(h, 500); // Give charts plenty of space
            }
            // Special handling for Tables (can be long)
            if (section.querySelector('table')) {
                const rows = section.querySelectorAll('tr').length;
                h = Math.max(h, rows * 40 + 100); // Estimate table height
            }

            const posOnPage = currentY % PAGE_HEIGHT_PX;
            const spaceLeft = PAGE_HEIGHT_PX - posOnPage;

            // If section is taller than space left, AND it fits on a fresh page
            if (h > spaceLeft && h < PAGE_HEIGHT_PX) {
                // Add spacer to push to next page
                const spacer = clonedDoc.createElement('div');
                spacer.style.height = `${spaceLeft + 20}px`; // +20 for safety
                spacer.style.width = '100%';
                spacer.style.display = 'block';
                reportRoot.insertBefore(spacer, section);
                
                currentY += (spaceLeft + 20);
            }
            
            currentY += h;
        });

        // --- 5. FINAL CLEANUP ---
        // Replace original content with new report root
        originalContainer.innerHTML = '';
        originalContainer.appendChild(reportRoot);
        
        // Force width for PDF capture
        originalContainer.style.width = '1200px';
        originalContainer.style.height = 'auto';
        originalContainer.style.position = 'relative';
        originalContainer.style.overflow = 'visible';

        // Add Print Styles for Tables
        const style = clonedDoc.createElement('style');
        style.innerHTML = `
            table { width: 100% !important; border-collapse: collapse !important; border: 1px solid #000 !important; font-size: 12px !important; }
            th { background-color: #eee !important; color: #000 !important; font-weight: bold !important; padding: 8px !important; border: 1px solid #000 !important; }
            td { padding: 8px !important; border: 1px solid #ccc !important; color: #000 !important; }
            tr:nth-child(even) { background-color: #f9f9f9 !important; }
            .hide-on-pdf { display: none !important; }
        `;
        clonedDoc.head.appendChild(style);
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
