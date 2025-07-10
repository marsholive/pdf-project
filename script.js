document.getElementById("convertBtn").addEventListener("click", async () => {
  if (!fileInput.files.length) return alert("Please upload at least one file.");

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Helper to read a file as DataURL
  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });
  };

  for (let i = 0; i < fileInput.files.length; i++) {
    const file = fileInput.files[i];
    const imgData = await readFileAsDataURL(file);

    // Add a new page for every image except the first
    if (i > 0) {
      doc.addPage();
    }

    // Add the image to the page, adjust size to fit page without stretching
    // Let's get the page width and height in points (default unit)
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Create an image element to get natural size
    const img = new Image();
    img.src = imgData;

    // Wait for image to load to get natural width/height
    await new Promise((res) => {
      img.onload = res;
    });

    // Calculate aspect ratio fit to page margins (say 15 margin)
    const margin = 15;
    const maxWidth = pageWidth - margin * 2;
    const maxHeight = pageHeight - margin * 2;

    let imgWidth = img.width;
    let imgHeight = img.height;

    // Scale image to fit inside maxWidth/maxHeight while keeping aspect ratio
    if (imgWidth > maxWidth) {
      const scaleFactor = maxWidth / imgWidth;
      imgWidth = maxWidth;
      imgHeight = imgHeight * scaleFactor;
    }
    if (imgHeight > maxHeight) {
      const scaleFactor = maxHeight / imgHeight;
      imgHeight = maxHeight;
      imgWidth = imgWidth * scaleFactor;
    }

    // Center image on page
    const x = (pageWidth - imgWidth) / 2;
    const y = (pageHeight - imgHeight) / 2;

    doc.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight);
  }

  doc.save("converted.pdf");
});
