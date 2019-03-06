

window.addEventListener('load',function(){
  var fileInput = document.getElementById("csv"),
  readFile = function () {
    var reader = new FileReader();

    reader.onload = function () {
      data = formatCSV(reader.result);
      console.log(data);

      //add download link to html
      var link = document.getElementById('downloadlink');
      link.href = makeFile(JSON.stringify(data, null, 2));
      link.style.display = 'block';
    };
    // start reading the file. When it is done, calls the onload event defined above.
    reader.readAsBinaryString(fileInput.files[0]);

  };
  fileInput.addEventListener('change', readFile);


});

function makeFile(text){
  var data = new Blob([text], {type: 'text/csv'});
  var textFile;
   // If we are replacing a previously generated file we need to
   // manually revoke the object URL to avoid memory leaks.
   if (textFile !== null) {
     window.URL.revokeObjectURL(textFile);
   }
   textFile = window.URL.createObjectURL(data);
   return textFile;
}



function formatCSV(csv) {
  var lines=csv.split("\n");
  var result = [];
  var headers = lines[0].split(",");

// TODO

  return result;
}
