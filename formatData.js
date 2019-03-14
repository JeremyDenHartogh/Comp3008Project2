var data = [];  //userid, scheme (Text21 or Image21), numlogins, numSuccess, numFailed, successfulTime, failedTime
var data1;
var data2;

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
      users.find(function checkID(aUser) {
        return aUser.id == imageData[i][1];
      }).failedLogins.push(time);
      //console.log("bad");
    }
    else if(text === "goodLogin"){
      var time = elapsedTime(imageData[i-2][0], imageData[i-1][0]);
      users.find(function checkID(aUser) {
        return aUser.id == imageData[i][1];
      }).successfulLogins.push(time);
      //users[users.indexOf(imageData[i][1])].successfulLogins.push(successfulLogin);
      //console.log("good");
    }

  }
  console.log(users);
  data1 = users;
  return users;
}

function contains(id, users){
  for(var i = 0; i<users.length; i++){
    if(id == users[i].id){
      return true;
    }
  }
  return false;
}

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
        users.find(function checkID(aUser) {
          return aUser.id == textData[i][1];
        }).failedLogins.push(time);
      }
      else if(text2 === "success") {
        var time = elapsedTime(textData[i-2][0], textData[i-1][0]);
        users.find(function checkID(aUser) {
          return aUser.id == textData[i][1];
        }).successfulLogins.push(time);
      }
    }

  }
  console.log(users);
  data = combineData(data1, users);
}

function combineData(data1, data2){
  for(var i = 0; i<data1.length; i++){
    var u = data1[i];
    var line = [];
    line.push(u.id);
    line.push(u.scheme);
    line.push(u.successfulLogins.length + u.failedLogins.length);
    line.push(u.successfulLogins.length);
    line.push(u.failedLogins.length);
    line.push(formatSeconds(averageTime(u.successfulLogins)));
    line.push(formatSeconds(averageTime(u.failedLogins)));
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
    line.push(formatSeconds(averageTime(u.successfulLogins)));
    line.push(formatSeconds(averageTime(u.failedLogins)));
    data.push(line);
  }

  console.log(data);
  return data;
}

function objToCSV(data){
  var s = "";

  for(var i = 0; i<data.length; i++){
    for(var j = 0; j<data[i].length; j++){
      s+=data[i][j]+",";
    }
    s = s.substring(0, s.length - 1);
  }
  console.log(s);
  return JSON.stringify(s);
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

function averageTime(attempts) {
  if (attempts.length === 0) {
    return 0;
  }
  var total = 0;
  for (var i = 0; i < attempts.length; i++) {
    total += attempts[i];
  }
  return total/attempts.length;
}
