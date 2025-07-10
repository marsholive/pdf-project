const fileInput = document.getElementById("upload");
const preview = document.getElementById("preview");

// Show preview when image is selected
fileInput.addEventListener("change", () => {
  if (!fileInput.files.length) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    preview.src = e.target.result;
    preview.style.display = "block";
  };
  reader.readAsDataURL(fileInput.files[0]);
});

// PDF generation (unchanged)
document.getElementById("convertBtn").addEventListener("click", async () => {
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
