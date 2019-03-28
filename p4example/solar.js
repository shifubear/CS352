/*
 * solar -- Solar system simulator -- frames and animation example
 * Created for CS352, Calvin College Computer Science
 *
 */

var solar = { }
var sun, moon, stars, earth, venus, mercury;
var intervalID, time=0, step=5;

$(document).ready(function () { solar.init(); });

solar.init = function () {  
  solar.canvas  = $('#canvas1')[0];
  solar.cx = solar.canvas.getContext('2d');
  solar.cx.fillStyle = 'rgb(255,0,0)';

  solar.cx.setTransform(1,0,0,1,360,270);	// world frame is (-1,-1) to (1,1)

  // bind functions to events, button clicks
  $('#gobutton').bind('click', solar.go);
  $('#stopbutton').bind('click', solar.stop);
  $('#stepbutton').bind('click', solar.step);
  $('#slider1').bind('change', solar.slider);

  solar.loadImages();
  $('#messageWindow').prepend("Starting the solar system");
  stars.onload = function() { solar.animate(); }
}

solar.animate = function() {

  // update time according to how much time has elapsed
  step = parseInt($('#slider1').val());
  time += step;
  timefrac = time/10;
  $('#timecount').text(time);

  // initially in the sun's frame. Draw sun, stars
  solar.cx.save();
  solar.cx.drawImage(stars, -360, -270);
  solar.cx.drawImage(sun, 0 - sun.width/2, 0 - sun.height/2);

  // Mercury
  solar.cx.save();
  solar.cx.rotate(timefrac/88);	
  solar.cx.translate(70,0);
  solar.cx.rotate(timefrac/59);
  solar.cx.drawImage(mercury, 0 - mercury.width/2, 0 - mercury.height/2);
  solar.cx.restore();

  // Venus
  solar.cx.save();
  solar.cx.rotate(timefrac/225);
  solar.cx.translate(150,0);
  solar.cx.rotate(timefrac/243);
  solar.cx.drawImage(venus, 0 - venus.width/2, 0 - venus.height/2);
  solar.cx.restore();

  // Earth
  solar.cx.save();
  solar.cx.rotate(timefrac/365);		// rotate earth around the sun
  solar.cx.translate(250,0);
  solar.cx.save();
  solar.cx.rotate(timefrac);
  solar.cx.drawImage(earth, 0 - earth.width/2, 0 - earth.height/2);
  solar.cx.restore();

  // moon
  solar.cx.save();				// moon around earth
  solar.cx.rotate(timefrac/28);
  solar.cx.translate(56, 0);
  solar.cx.drawImage(moon, 0 - moon.width/2, 0 - moon.height/2);
  solar.cx.restore();

  solar.cx.restore();
}

// turn on animation: cause animate function to be called every 20ms
solar.go = function() {
  intervalID =  setInterval(solar.animate, 20);	
}
  
solar.stop = function() {
  clearInterval(intervalID);
}

solar.step = function() {
  $('#messageWindow').prepend("...step " + step + "<br>");
  solar.animate();
}  
  
solar.loadImages = function() {
  sun = new Image();     sun.src = "sun.png";
  moon = new Image();    moon.src = "moon.png";
  earth = new Image();   earth.src = "earth.png";
  mercury = new Image(); mercury.src = "mercury.png";
  venus = new Image();   venus.src = "venus.png";
  stars = new Image();   stars.src = "stars.jpg";
}

solar.slider = function(ev) {
  $('#pointcount').text($('#slider1').val());
}