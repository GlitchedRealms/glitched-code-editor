//download file
function download(filename, text) {
				var element = document.createElement('a');
				element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
				element.setAttribute('download', filename);
				
				element.style.display = 'none';
				document.body.appendChild(element);
				
				element.click();
				
				document.body.removeChild(element);
}

function appendfile(text,divID){
				const editor2 =  document.getElementById("editor");
}

//file drag and drop, completely stolen from mdn
let file = "";
let filelist = [];

function dropHandler(ev) {
  console.log("File(s) dropped");

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();

  if (ev.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    [...ev.dataTransfer.items].forEach((item, i) => {
      // If dropped items aren't files, reject them
      if (item.kind === "file") {
				const editor2 =  document.getElementById("editor");
        const file = item.getAsFile();
				const reader = new FileReader();

        reader.onload = function () {
				    filelist.push(reader.result);
				    editor2.textContent = filelist[filelist.length -1];
        };

        reader.onerror = function () {
            console.error('Error reading the file');
        };
				reader.readAsText(file);

      }
    });
  } else {
    // Use DataTransfer interface to access the file(s)
    [...ev.dataTransfer.files].forEach((file, i) => {
      console.log(`… file[${i}].name = ${file.name}`);
    });
  }
}

function dragOverHandler(ev) {
  console.log("File(s) in drop zone");

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
}

