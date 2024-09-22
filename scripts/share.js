async function saveAndShareReportAsPDF(reportContent) {
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Set title
    doc.setFontSize(18);
    doc.text('Sugar Product Pricing Report', 10, 10);
    doc.setFontSize(12);
    doc.text('-----------------------------------', 10, 15);

    // 50kg Sugar Section
    doc.setFontSize(14);
    doc.text('50kg Sugar', 10, 25);
    doc.setFontSize(12);
    doc.autoTable({
      head: [['Product', 'Price (Kwanza)']],
      body: [['50kg Sugar', '43,500 KZ']],
      startY: 30,
      theme: 'grid',
    });

    // 10kg Sacks Section
    doc.setFontSize(14);
    doc.text('10kg Sacks', 10, doc.autoTable.previous.finalY + 10);
    doc.autoTable({
      head: [['Description', 'Price (Kwanza)']],
      body: [
        ['Cost Price', '9,050 KZ'],
        ['Gross Sale Price', '9,650 KZ'],
        ['Retail Price', '9,950 KZ'],
      ],
      startY: doc.autoTable.previous.finalY + 15,
      theme: 'grid',
    });

    // 25kg Sacks Section
    doc.setFontSize(14);
    doc.text('25kg Sacks', 10, doc.autoTable.previous.finalY + 10);
    doc.autoTable({
      head: [['Description', 'Price (Kwanza)']],
      body: [
        ['Cost Price', '22,250 KZ'],
        ['Gross Sale Price', '22,750 KZ'],
        ['Retail Price', '23,050 KZ'],
      ],
      startY: doc.autoTable.previous.finalY + 15,
      theme: 'grid',
    });

    // Save the PDF
    const pdfBlob = doc.output('blob');
    const pdfFile = new File([pdfBlob], 'sugar_product_pricing_report.pdf', { type: 'application/pdf' });

    // Check if the Web Share API is supported
    if (navigator.share) {
      await navigator.share({
        files: [pdfFile],
        title: 'Sugar Product Pricing Report',
        text: 'Here is the sugar product pricing report in PDF format.',
      });
      console.log('Report shared successfully');
    } else {
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'sugar_product_pricing_report.pdf';
      link.click();
      URL.revokeObjectURL(pdfUrl);
      console.log('Report downloaded as PDF');
    }
  } catch (error) {
    console.error('Error saving or sharing report:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const shareButton = document.getElementById('shareButton');
  shareButton.addEventListener('click', async () => {
    const reportContent = generateReportContent(); // You need to implement this function
    await saveAndShareReportAsPDF(reportContent);
  });
});

function generateReportContent() {
  // Implement this function to gather the report content from the page
  // For example:
  const sugarPrice = document.getElementById('sugarPrice').value;
  const costPrice10kg = document.getElementById('costPrice10kg').textContent;
  const grossSalePrice10kg = document.getElementById('grossSalePrice10kg').textContent;
  const retailPrice10kg = document.getElementById('retailPrice10kg').textContent;
  const costPrice25kg = document.getElementById('costPrice25kg').textContent;
  const grossSalePrice25kg = document.getElementById('grossSalePrice25kg').textContent;
  const retailPrice25kg = document.getElementById('retailPrice25kg').textContent;

  return `
    Sugar Product Pricing Report
    
    50kg Sugar Price: ${sugarPrice} KZ
    
    10kg Sacks:
    Cost Price: ${costPrice10kg}
    Gross Sale Price: ${grossSalePrice10kg}
    Retail Price: ${retailPrice10kg}
    
    25kg Sacks:
    Cost Price: ${costPrice25kg}
    Gross Sale Price: ${grossSalePrice25kg}
    Retail Price: ${retailPrice25kg}
  `;
}
