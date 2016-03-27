var URL = "http://10.0.1.19:5000";
var UI = require('ui');
var Vibe = require('ui/vibe');
var leftCar = false, rightCar = false;
var tooLong = false;
var sec = 0;
var main = new UI.Card({
  title: 'Pebble.js',
  icon: 'images/menu_icon.png',
  subtitle: 'Hello World!',
  subtitleColor: 'indigo', // Named colors
  bodyColor: '#9a0036', // Hex colors
  scrollable: true
});
main.show();
main.body('THIS IS THE BODY');
var ajax = require('ajax');
var numCalls = 0;
main.on('accelData', function(e){
  var handMovingRight = false, handMovingLeft = false;
  for(var i = 0; i < 8; i++){
    
    tooLong = false;
    var values = [8];
    values[i] = e.accels[i].y;
 
    if(values[i] > 0 && values[i] <= 150){
      console.log('Y: ' + i + ' ' + e.accels[i].y  + ' Right'); 
      handMovingRight = true;
      break;
    }
    else if(values[i] >= 850 && values[i] <= 910){
      handMovingLeft = true;
      break;
//       if(numCalls <= 1){
//         ajax(
//         {
//           url:URL,
//           method: "GET"
//         }, function (data, status, res) {
//           leftCar = JSON.parse(data).inColisionZone;
//           if(leftCar){
//             Vibe.vibrate('double');
//           }
//           console.log('Y: ' + i + ' ' + e.accels[i].y + ' Left');
//         }, function (err, status, res) {
//           console.log("error", err, res);
//         }
//       );
//       numCalls++;
//       }
//       else{
//         numCalls = 0;
//         break;
//       }
    }       
    else if(values[i] >= 650 && values[i] <= 710){
      console.log('Y: ' + i + ' ' + e.accels[i].y + ' Straight');
    }
  }
  if(handMovingLeft){
    ajax(
        {
          url:URL,
          method: "GET"
        }, function (data, status, res) {
          leftCar = JSON.parse(data).inColisionZone;
          if(leftCar){
            Vibe.vibrate('double');
          }
          console.log('Y: ' + i + ' ' + e.accels[i].y + ' Left');
        }, function (err, status, res) {
          console.log("error", err, res);
        }
      );
  }
  if(handMovingRight){
    ajax(
        {
          url:URL,
          method: "GET"
        }, function (data, status, res) {
          rightCar = JSON.parse(data).inColisionZone;
          if(rightCar){
            Vibe.vibrate('double');
          }
          console.log('Y: ' + i + ' ' + e.accels[i].y + ' Left');
        }, function (err, status, res) {
          console.log("error", err, res);
        }
      );
  }
});