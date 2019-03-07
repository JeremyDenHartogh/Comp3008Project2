

window.addEventListener('load',function(){
  var fileInput = document.getElementById("csv1");
  var data = [];
  readFile = function () {
    var reader = new FileReader();

    reader.onload = function () {

    data1 = formatImageCSV(reader.result);
    };
    // start reading the file. When it is done, calls the onload event defined above.
    reader.readAsBinaryString(fileInput.files[0]);

  };
  fileInput.addEventListener('change', readFile);

  var fileInput2 = document.getElementById("csv2");
  readFile = function () {
    var reader = new FileReader();
    var data2;
    reader.onload = function () {
      data2 = formatTextCSV(reader.result);
    };
    // start reading the file. When it is done, calls the onload event defined above.
    reader.readAsBinaryString(fileInput2.files[0]);

    //combine data1 and data2 into data
    data = combineData(data1, data2);
    console.log(data);

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
      var u = [];
      u.id = imageData[i][1];
      u.scheme = "Image21";
      u.successfulLogins =  [];
      u.failedLogins = [];
      users.push(u);
    }
    if(imageData[i][6] === "badLogin"){
      var elapsedTime = elapsedTime(imageData[i-2][0], imageData[i-1][0]);
      var failedLogin;
      failedLogin.loginAttempt = elapsedTime;
      users.find(imageData[i][1]).failedLogins.push(failedLogin);
    }
    else if(imageData[i][6] === "goodLogin"){
      var elapsedTime = elapsedTime(imageData[i-2][0], imageData[i-1][0]);
      var successfulLogin;
      successfulLogin.loginAttempt = elapsedTime;
      users.find(imageData[i][1]).successfulLogins.push(successfulLogin);
    }

  }

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
  var textDataVals = csv.split(",");
  var lineSize = 0;
  for (var i = 0; i < textDataVals.length; i++) {
    if (lineSize == 0) {
      var line = [];
    }
    line.push(textDataVals[i]);
    if (lineSize == 8) {
      lineSize = 0;
      textData.push(line);
    }
    lineSize++;
  }

  //store text data
  for(var i = 0; i<textData.length; i++){
    if(!users.includes(textData[i][1])){
      var u = [];
      u.id = textData[i][1];
      u.scheme = "text21";
      u.successfulLogins =  [];
      u.failedLogins = [];
      users.push(u);
    }
    if (textData[i][5] === "login") {

      if(textData[i][6] === "failure") {
        var elapsedTime = elapsedTime(textData[i-2][0], textData[i-1][0]);
        var failedLogin;
        failedLogin.loginAttempt = elapsedTime;
        users.find(textData[i][1]).failedLogins.push(failedLogin);
      }
      else if(textData[i][6] === "success") {
        var elapsedTime = elapsedTime(textData[i-2][0], textData[i-1][0]);
        var successfulLogin;
        successfulLogin.loginAttempt = elapsedTime;
        users.find(textData[i][1]).successfulLogins.push(successfulLogin);
      }
    }

  }

  return users;
}

function combineData(data1, data2){
  var data = [[]]; //userid, scheme (Text21 or Image21), numlogins, numSuccess, numFailed, time
  for(var u in data1){ //may not like this syntax
    for(var s in u.successfulLogins){
      var line = [];
      line.push(u.id);
      line.push(u.scheme);
      line.push(u.successfulLogins.length + u.failedLogins.length);
      line.push(u.successfulLogins.length);
      line.push(u.failedLogins.length);
      line.push(s.time);

      data.push(line);
    }

    for(var f in u.failedLogins){
      var line = [];
      line.push(u.id);
      line.push(u.scheme);
      line.push(u.successfulLogins.length + u.failedLogins.length);
      line.push(u.successfulLogins.length);
      line.push(u.failedLogins.length);
      line.push(f.time);

      data.push(line);
    }
  }

  for(var u in data2){
    for(var s in u.successfulLogins){
      var line = [];
      line.push(u.id);
      line.push(u.scheme);
      line.push(u.successfulLogins.length + u.failedLogins.length);
      line.push(u.successfulLogins.length);
      line.push(u.failedLogins.length);
      line.push(s.time);

      data.push(line);
    }

    for(var f in u.failedLogins){
      var line = [];
      line.push(u.id);
      line.push(u.scheme);
      line.push(u.successfulLogins.length + u.failedLogins.length);
      line.push(u.successfulLogins.length);
      line.push(u.failedLogins.length);
      line.push(f.time);

      data.push(line);
    }
  }

  return data;
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
