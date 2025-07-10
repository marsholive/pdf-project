
const preview = document.getElementById("preview");
let editedImageURL = null;


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

fileInput.addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      editedImageURL = event.target.result;
      preview.src = editedImageURL;
      preview.style.display = "block";
      editor.open(event.target.result);
    };
    reader.readAsDataURL(file);
  }
});
