var URL = "http://10.0.1.19:5000";
var UI = require('ui');
var Vibe = require('ui/vibe');
var leftCar = false;
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
  for(var i = 0; i < 8; i++){
    tooLong = false;
    //console.log('Y: ' + i + ' ' + e.accels[i].y);
    var values = [8];
    values[i] = e.accels[i].y;
    /*ajax(
        {
          url:URL,
          method: "GET"
        }, function (data, status, res) {
          leftCar = JSON.parse(data).inColisionZone;
          //setTimeout(incrementSec, 1000);
          //if(sec >= 4){
          //  Vibe.vibrate('long');
          //  console.log('Too much steering left');
          //}
          //sec = 0;
          //console.log('Y: ' + i + ' ' + e.accels[i].y + ' Left');
          //Vibe.vibrate('double');
        }, function (err, status, res) {
          console.log("error", err, res);
        }
      );*/
    
    
    
    if(values[i] > 0 && values[i] <= 150){
      console.log('Y: ' + i + ' ' + e.accels[i].y  + ' Right'); 
      Vibe.vibrate('double');
    }
    
    else if(values[i] >= 850 && values[i] <= 910){
      if(numCalls <= 1){
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
      numCalls++;
      }
      else{
        numCalls = 0;
        break;
      }
      
       //console.log('Y: ' + i + ' ' + e.accels[i].y + ' Left');
       //Vibe.vibrate('double');
    }       
    
    else if(values[i] >= 650 && values[i] <= 710){
      console.log('Y: ' + i + ' ' + e.accels[i].y + ' Straight');
      //console.log(prevTime);
    }
  }
});