var data = [["UserID", "Scheme", "NumLogins", "NumSuccessful", "NumFailed", "SuccessTime", "FailedTime"]];  //userid, scheme (Text21 or Image21), numlogins, numSuccess, numFailed, successfulTime, failedTime
var data1;

window.addEventListener('load',function(){
  var fileInput = document.getElementById("csv1");
  var fileInput2 = document.getElementById("csv2");


  readFile1 = function () {
    var reader = new FileReader();
    reader.onload = function () {
      data1 = formatCSV(reader.result);
    };
    // start reading the file. When it is done, calls the onload event defined above.
    reader.readAsBinaryString(fileInput.files[0]);
    makeFile(data);
  };

  fileInput.addEventListener('change', readFile1);
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



function formatCSV(csv) {
  var lines=csv.split("\n");

  var users = [];

  //format data
  var colorData = [];
  var lineSize = 0;
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].split(",");
    colorData.push(line);
  }

  //store image data
  for(var i = 0; i<colorData.length; i++){
    if(!contains(colorData[i][1], users)){
      var u = {};
      u.id = colorData[i][1];
      u.scheme = "Color+Text";
      u.successfulLogins =  [];
      u.failedLogins = [];
      users.push(u);
    }
    if (colorData[i][3] === "enter") {
      var text = colorData[i][4];
      if(text === "failure"){
        var time = elapsedTime(colorData[i-2][0], colorData[i-1][0]);
        if (time !== -1) {
          users.find(function checkID(aUser) {
            return aUser.id == colorData[i][1];
          }).failedLogins.push(time);
        }
        //console.log("bad");
      }
      else if(text === "success"){
        var time = elapsedTime(colorData[i-2][0], colorData[i-1][0]);
        if (time !== -1) {
          users.find(function checkID(aUser) {
            return aUser.id == colorData[i][1];
          }).successfulLogins.push(time);
        }
        //users[users.indexOf(colorData[i][1])].successfulLogins.push(successfulLogin);
        //console.log("good");
      }
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

  console.log(data);
  return data;
}

function elapsedTime(firstStamp, secondStamp) { //returns the difference between the two timestamps in seconds
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
