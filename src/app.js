var //req = new XMLHttpRequest(),
    URL = "http://10.0.1.19:5000";
//URL = 'http://74.125.21.147';
//URL = 'http://www.google.com';
// req.open('GET',"http://10.0.1.19:5000", true);
// req.send();
// //req.addEventListener("readystatechange", processRequest, false);
// req.onreadystatechange = processRequest;
// function processRequest(e){
//   console.log(JSON.stringify(req));
//   if(req.readyState == 4 && req.status >= 200 && req.status < 400){
//     console.log(req.responseText);
//   }
// }

var ajax = require('ajax');
ajax(
    {
      url:URL,
      method: "GET"
    }, function (data, status, res) {
      console.log(data);
    }, function (err, status, res) {
      console.log("error", err, res);
    }
  );  