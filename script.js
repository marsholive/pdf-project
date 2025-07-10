reader.onload = function (e) {
  const imgData = e.target.result;
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.addImage(imgData, 'JPEG', 15, 15, 180, 160);
  
  // Get PDF as blob
  doc.output('blob').then(function(pdfBlob) {
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
};
