var data = [["UserID", "Scheme", "NumLogins", "NumSuccessful", "NumFailed", "SuccessTime", "FailedTime"]];  //userid, scheme (Text21 or Image21), numlogins, numSuccess, numFailed, successfulTime, failedTime
var data1; //to hold the text data
var data2; //to hold the image data

// format csv data uploaded
// add download link after formatted
window.addEventListener('load',function(){
  var fileInput = document.getElementById("csv1");
  var fileInput2 = document.getElementById("csv2");

  readFile1 = function () {
    var reader = new FileReader();
    reader.onload = function () {
      data1 = formatImageCSV(reader.result);
    };
    // start reading the file. When it is done, calls the onload event defined above.
    reader.readAsBinaryString(fileInput.files[0]);
  };

  readFile2 = function () {
    var reader = new FileReader();
    reader.onload = function () {
      data2 = formatTextCSV(reader.result);
      //add download link to html
      makeFile(data);
    };

    // start reading the file. When it is done, calls the onload event defined above.
    reader.readAsBinaryString(fileInput2.files[0]);
  };

  fileInput.addEventListener('change', readFile1);
  fileInput2.addEventListener('change', readFile2);
});

// make csv file from data object
// set the a tag in the html data to be the newly made csv
// display the link
function makeFile(text){
  const data = text;
  let csvContent = "data:text/csv;charset=utf-8,";
  var textFile;

  data.forEach(function(rowArray){
   let row = rowArray.join(",");
   csvContent += row + "\r\n";
  });

   var encodedUri = encodeURI(csvContent);
   var link = document.getElementById('downloadlink');
   link.setAttribute("href", encodedUri);
   link.setAttribute("download", "data.csv");
   link.style.display = 'block';

}


// use inputed image csv to create data object
function formatImageCSV(csv) {
  var lines=csv.split("\n");

  var users = [];

  //format data
  var imageData = [];
  var lineSize = 0;
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].split(",");
    imageData.push(line);
  }

  //store image data
  for(var i = 0; i<imageData.length; i++){
    if(!contains(imageData[i][1], users)){
      var u = {};
      u.id = imageData[i][1];
      u.scheme = "Image21";
      u.successfulLogins =  [];
      u.failedLogins = [];
      users.push(u);
    }
    var text = imageData[i][6];
    if(text === "badLogin"){
      var time = elapsedTime(imageData[i-2][0], imageData[i-1][0]);
      if (time !== -1) {
        users.find(function checkID(aUser) {
          return aUser.id == imageData[i][1];
        }).failedLogins.push(time);
      }
    }
    else if(text === "goodLogin"){
      var time = elapsedTime(imageData[i-2][0], imageData[i-1][0]);
      if (time !== -1) {
        users.find(function checkID(aUser) {
          return aUser.id == imageData[i][1];
        }).successfulLogins.push(time);
      }
    }
  }
  console.log(users);
  data1 = users;
  return users;
}

// check if users array contains a user with given id
function contains(id, users){
  for(var i = 0; i<users.length; i++){
    if(id == users[i].id){
      return true;
    }
  }
  return false;
}

// use inputed text csv to create data object
function formatTextCSV(csv) {
  var lines=csv.split("\n");
  var users = [];

  //format data
  var textData = [];
  var lineSize = 0;
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].split(",");
    textData.push(line);
  }

  //store text data
  for(var i = 0; i<textData.length; i++){
    if(!contains(textData[i][1], users)){
      var u = {};
      u.id = textData[i][1];
      u.scheme = "text21";
      u.successfulLogins =  [];
      u.failedLogins = [];
      users.push(u);
    }
    var text = textData[i][5];
    var text2 = textData[i][6];

    if (text === "login") {
      if(text2 === "failure") {
        var time = elapsedTime(textData[i-2][0], textData[i-1][0]);
        if (time !== -1) {
          users.find(function checkID(aUser) {
            return aUser.id == textData[i][1];
          }).failedLogins.push(time);
        }
      }
      else if(text2 === "success") {
        var time = elapsedTime(textData[i-2][0], textData[i-1][0]);
        if (time !== -1) {
          users.find(function checkID(aUser) {
            return aUser.id == textData[i][1];
          }).successfulLogins.push(time);
        }
      }
    }
  }
  console.log(users);
  data = combineData(data1, users);
}

// create one data object from data1 and data2
// reformat to desired scheme
function combineData(data1, data2){
  for(var i = 0; i<data1.length; i++){
    var u = data1[i];
    var line = [];
    line.push(u.id);
    line.push(u.scheme);
    line.push(u.successfulLogins.length + u.failedLogins.length);
    line.push(u.successfulLogins.length);
    line.push(u.failedLogins.length);
    line.push(averageTime(u.successfulLogins));
    line.push(averageTime(u.failedLogins));
    data.push(line);
  }

  for(var i = 0; i<data2.length; i++){
    var u = data2[i];
    var line = [];
    line.push(u.id);
    line.push(u.scheme);
    line.push(u.successfulLogins.length + u.failedLogins.length);
    line.push(u.successfulLogins.length);
    line.push(u.failedLogins.length);
    line.push(averageTime(u.successfulLogins));
    line.push(averageTime(u.failedLogins));
    data.push(line);
  }

  console.log(data);
  return data;
}

// given two timestamps
// returns the difference between them in seconds
function elapsedTime(firstStamp, secondStamp) {
    var t1 = firstStamp.split(" ")[1].split(":");
    var t2 = secondStamp.split(" ")[1].split(":");

    if (parseInt(t1[0]) > parseInt(t2[0])) t2[0] = parseInt(t2[0]) + 12;

    var seconds1 = parseInt(t1[0])*3600 + parseInt(t1[1])*60 + parseInt(t1[2]);
    var seconds2 = parseInt(t2[0])*3600 + parseInt(t2[1])*60 + parseInt(t2[2]);

    var diff =  seconds2 - seconds1;
    if (diff > 100 || diff < 0) {
      return -1;
    }
    return diff;
}

// compute average 
function averageTime(attempts) {
  if (attempts.length === 0) {
    return 0;
  }
  var total = 0;
  for (var i = 0; i < attempts.length; i++) {
    total += attempts[i];
  }
  return Math.round(total/attempts.length);
}
