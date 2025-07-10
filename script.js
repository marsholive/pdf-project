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


const { FilerobotImageEditor } = window.FilerobotImageEditor;

const editor = new FilerobotImageEditor({
  source: '', // image source will be set dynamically
  elementId: 'image-editor-container',
  onSave: (editedImageObject) => {
    // Do something with the edited image, like convert to PDF
    const editedImageURL = editedImageObject.imageBase64;
    // convert editedImageURL to PDF here
    console.log("Edited image ready:", editedImageURL);
  },
});

// Open editor after user uploads
document.getElementById("upload").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      editor.open(event.target.result);
    };
    reader.readAsDataURL(file);
  }
});
