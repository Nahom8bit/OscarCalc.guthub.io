async function saveAndShareReportAsPDF(reportContent) {
  try {
    // Generate PDF using jsPDF library
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text(reportContent, 10, 10);

    // Convert PDF to Blob
    const pdfBlob = doc.output('blob');

    // Create a File object from the Blob
    const pdfFile = new File([pdfBlob], 'user_report.pdf', { type: 'application/pdf' });

    // Check if the Web Share API is supported
    if (navigator.share) {
      await navigator.share({
        files: [pdfFile],
        title: 'User Report',
        text: 'Here is the user report in PDF format.',
      });
      console.log('Report shared successfully');
    } else {
      // Fallback for browsers that don't support the Web Share API
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'user_report.pdf';
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
