var URL = "http://10.0.1.19:5000";
var UI = require('ui');
var Vibe = require('ui/vibe');
var leftCar = false, rightCar = false;
var tooLong = false;

var locationOptions = 
    {
      enableHighAccuracy: true, 
      maximumAge: 10000, 
      timeout: 10000
    };

var main = new UI.Card({
  title: 'Pebble.js',
  icon: 'images/menu_icon.png',
  subtitle: 'Press the down button to send distress email',
  subtitleColor: 'indigo', // Named colors
  bodyColor: '#9a0036', // Hex colors
  scrollable: true
});
main.show();
main.on('click', 'down', function(){
    var card = new UI.Card();
    card.title('An Email');
    card.subtitle('Has Been Sent!');
    card.body('The email contains GPS coordinates');
    card.show();
    navigator.geolocation.getCurrentPosition(locPos, locationError, locationOptions);
  });
  main.show();

var ajax = require('ajax');

var lat;
var lon;


function locPos (pos){
  console.log('lat = ' + pos.coords.latitude + ' lon= ' + pos.coords.longitude);
  lat = pos.coords.latitude;
  lon = pos.coords.longitude;
  //var textBody = 'Accident occured at: ' + lat + ','+ lon;
  sendEmail(lat, lon);
}

function locationError(err) {
  console.log('location error (' + err.code + '): ' + err.message);
}
 function sendEmail(lat, lon){
   ajax(
     {
       url: 'http://dbbd2a9b68056c9bb3375e9ee8b596e5:be4aa5a7a49863b72334ea66e0f83dc2@api.mailjet.com/v3/send',
       method: 'post',
       type: 'json',
       data:  {
     "FromEmail":"shababayub@gmail.com",
     "FromName":"Shabab Ayub",
     "Subject":"Testing",
      "Text-part":"I need help at: Lat: " + lat + " Lon: " + lon,
     "Recipients":[{"Email":"shababayub@gmail.com"}]
       },
       crossDomain: true
     }, 
      function(result) {
        console.log('Success and Result is: ' + result.toString());
     },
     function(error) {
       console.log('The ajax request failed: ' + error);
     } 
    );
   }


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


