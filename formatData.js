

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

function elapsedTime(firstStamp, secondStamp) { //returns the difference between the two timestamps
    var t1 = firstStamp.split(" ")[1].split(":");
    var t2 = secondStamp.split(" ")[1].split(":"); 

    if (parseInt(t1[0]) > parseInt(t2[0])) t2[0] = parseInt(t2[0]) + 12;

    var seconds1 = parseInt(t1[0])*3600 + parseInt(t1[1])*60 + parseInt(t1[2]);
    var seconds2 = parseInt(t2[0])*3600 + parseInt(t2[1])*60 + parseInt(t2[2]);

    return seconds2 - seconds1;
}

