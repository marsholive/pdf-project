document.getElementById("convertBtn").addEventListener("click", () => {
  if (!fileInput.files.length) return alert("Please upload a file.");

  const reader = new FileReader();
  reader.onload = function (e) {
    const imgData = e.target.result;
    const img = new Image();
    img.src = imgData;

    img.onload = function() {
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF();

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const margin = 15;

      // max width and height inside margins
      const maxWidth = pageWidth - margin * 2;
      const maxHeight = pageHeight - margin * 2;

      let imgWidth = img.width;
      let imgHeight = img.height;

      // Calculate aspect ratio scaling to fit maxWidth and maxHeight
      if (imgWidth > maxWidth) {
        imgHeight = imgHeight * (maxWidth / imgWidth);
        imgWidth = maxWidth;
      }
      if (imgHeight > maxHeight) {
        imgWidth = imgWidth * (maxHeight / imgHeight);
        imgHeight = maxHeight;
      }

      // Center the image
      const x = (pageWidth - imgWidth) / 2;
      const y = (pageHeight - imgHeight) / 2;

      pdf.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight);
      pdf.save("converted.pdf");
    };
  };
  reader.readAsDataURL(fileInput.files[0]);
});
