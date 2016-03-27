/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */


var UI = require('ui');
//var Vector2 = require('vector2');
var ajax = require('ajax');
//var wind = new UI.Window();
var lat;
var lon;

var locationOptions = 
    {
      enableHighAccuracy: true, 
      maximumAge: 10000, 
      timeout: 10000
    };

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
var main = new UI.Card({
  title: 'Pebble.js',
  icon: 'images/menu_icon.png',
  subtitle: 'Damn Daniel!',
  body: 'Press the down button to send morbid email.',
  subtitleColor: 'indigo', // Named colors
  bodyColor: '#9a0036' // Hex colors
});

main.show();

//Pebble.addEventListener('ready', function(){
  main.on('click', 'down', function(){
    var card = new UI.Card();
    card.title('An Email');
    card.subtitle('Has Been Sent!');
    card.body('The email contains GPS coordinates');
    card.show();
    navigator.geolocation.getCurrentPosition(locPos, locationError, locationOptions);
  });
  main.show();
//});
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
 //"Html-part":"<h3>Dear passenger, welcome to Mailjet!</h3><br />May the delivery force be with you!",
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