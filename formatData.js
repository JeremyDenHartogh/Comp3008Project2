

window.addEventListener('load',function(){
  var fileInput = document.getElementById("csv1");
  var data = [];
  readFile = function () {
    var reader = new FileReader();

    reader.onload = function () {

    data1 = formatImageCSV(reader.result);

    console.log(data);


    };
    // start reading the file. When it is done, calls the onload event defined above.
    reader.readAsBinaryString(fileInput.files[0]);

  };
  fileInput.addEventListener('change', readFile);

  var fileInput2 = document.getElementById("csv2");
  readFile = function () {
    var reader = new FileReader();

    reader.onload = function () {
      data2 = formatTextCSV(reader.result);
      console.log(data);
    };
    // start reading the file. When it is done, calls the onload event defined above.
    reader.readAsBinaryString(fileInput2.files[0]);

    //combine data1 and data2 into data
    // TODO

    //add download link to html
    var link = document.getElementById('downloadlink');
    link.href = makeFile(JSON.stringify(data, null, 2));
    link.style.display = 'block';
  };
  fileInput2.addEventListener('change', readFile);



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



function formatImageCSV(csv) {
  var lines=csv.split("\n");
  var result = [];
  
  var users = [];
  var successfulLogins = [];
  
  //format data
  var imageData = [];
  var imageDataVals = csv.split(",");
  var lineSize = 0;
  for (var i = 0; i < imageDataVals.length; i++) {
    if (lineSize == 0) {
      var line = [];
    }
    line.push(imageDataVals[i]);
    if (lineSize == 8) {
      lineSize = 0;
      imageData.push(line);
    }
    lineSize++;

  }
// TODO

  return result;
}


function formatTextCSV(csv) {
  var lines = csv.split("\n");
  var result = [];

  var users = [];
  var successfulLogins = [];

  //format data

  // TODO

  return result;
}

function elapsedTime(firstStamp, secondStamp) { //returns the difference between the two timestamps in seconds
    var t1 = firstStamp.split(" ")[1].split(":");
    var t2 = secondStamp.split(" ")[1].split(":"); 

    if (parseInt(t1[0]) > parseInt(t2[0])) t2[0] = parseInt(t2[0]) + 12;

    var seconds1 = parseInt(t1[0])*3600 + parseInt(t1[1])*60 + parseInt(t1[2]);
    var seconds2 = parseInt(t2[0])*3600 + parseInt(t2[1])*60 + parseInt(t2[2]);

    return seconds2 - seconds1;
}

function formatSeconds(sec){ //HH:MM:SS
  var hours = Math.floor(sec/3600);
  sec -= hours*3600;

  var mins = Math.floor(sec/60);
  sec -=mins*60;

  return hours.toString()+":"+mins.toString()+":"+sec.toString();
}
