<script>
  const fileInput = document.getElementById("upload");
  const preview = document.getElementById("preview");
  let editedImageURL = null; // stores final image (edited or original)

  const { FilerobotImageEditor } = window.FilerobotImageEditor;

  const editor = new FilerobotImageEditor({
    source: '',
    elementId: 'image-editor-container',
    onSave: (editedImageObject) => {
      editedImageURL = editedImageObject.imageBase64;
      preview.src = editedImageURL;
      preview.style.display = "block";
    }
  });

  // Open editor when file is uploaded
  fileInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        editedImageURL = event.target.result; // fallback if not edited
        preview.src = editedImageURL;
        preview.style.display = "block";
        editor.open(event.target.result); // open image editor
      };
      reader.readAsDataURL(file);
    }
  });

  // Convert to PDF (uses edited image if available)
  document.getElementById("convertBtn").addEventListener("click", () => {
    if (!editedImageURL) return alert("Please upload and edit an image first.");

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.addImage(editedImageURL, 'JPEG', 15, 15, 180, 160);
    doc.save("converted.pdf");
  });
</script>
