document.getElementById("convertBtn").addEventListener("click", async () => {
  const fileInput = document.getElementById("upload");
  if (!fileInput.files.length) return alert("Please upload a file.");

  const reader = new FileReader();
  reader.onload = function (e) {
    const imgData = e.target.result;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.addImage(imgData, 'JPEG', 15, 15, 180, 160);
    doc.save("converted.pdf");
  };
  reader.readAsDataURL(fileInput.files[0]);
});