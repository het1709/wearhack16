//Import required libraries
var UI = require('ui');
var Vibe = require('ui/vibe');
var main = new UI.Card({
  title: 'Pebble.js',
  icon: 'images/menu_icon.png',
  subtitle: 'Hello World!',
  subtitleColor: 'indigo',
  bodyColor: '#9a0036',
  scrollable: true
});
main.show();
//Collect accelerometer data and store it in an array called e.accels
main.on('accelData', function(e){
  for(var i = 0; i < 8; i++){
    var values = [8];
    values[i] = e.accels[i].y;
    if(values[i] < 600){
      console.log('Y: ' + i + ' ' + e.accels[i].y  + 'Right'); 
      Vibe.vibrate('double');
    }
    else if(values[i] < 900){
      console.log('Y: ' + i + ' ' + e.accels[i].y + 'Left');
      Vibe.vibrate('double');
    }       
    else
    {
      console.log('Y: ' + i + ' ' + e.accels[i].y + 'Straight');
    }
  }
});
