 const fileInput = document.getElementById("upload");
  const preview = document.getElementById("preview");
  let editedImageDataUrl = null;

  const { FilerobotImageEditor } = window.FilerobotImageEditor;

  const editor = new FilerobotImageEditor({
    source: '', // placeholder; will update when file is uploaded
    onSave: (editedImageObject) => {
      editedImageDataUrl = editedImageObject.imageBase64;
      preview.src = editedImageDataUrl;
      preview.style.display = "block";
    },
    onClose: () => {
      console.log("Editor closed");
    },
    annotationsCommon: {
      fill: '#ff0000'
    },
    Text: { text: 'Add text' },
    Rotate: true,
    Resize: true,
    Crop: false
  });

  // When file is selected
  fileInput.addEventListener("change", () => {
    if (!fileInput.files.length) return;
    
    const reader = new FileReader();
    reader.onload = function (e) {
      editor.open(e.target.result);
    };
    reader.readAsDataURL(fileInput.files[0]);
  });

  // Convert to PDF
  document.getElementById("convertBtn").addEventListener("click", () => {
    if (!editedImageDataUrl) return alert("Please upload and edit an image first.");
