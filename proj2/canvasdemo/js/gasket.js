/*
 * gasket v2: draw a Sierpinski gasket by drawing lots of dots,
 * where each is the average of the previous and a random vertex
 * For CS352, Calvin College Computer Science
 *
 * Harry Plantinga -- January 2011
 */

const pokemon_count = 730
var pokemon_id = 0
var mypokemon = []
var my_pokemon_count = 0
var raf

var gasket = {
  radius:	0.005,				// dot radius
}
var canvas2 = {
  init: function () {
    canvas2.canvas = $('#canvas2')[0];
    canvas2.cx = canvas2.canvas.getContext('2d');
    canvas2.cx.fillStyle = 'rgba(0,0,0,0)';

    $('#throwbutton').bind('click', canvas2.throw);

  },
  clearscreen: function() {
    canvas2.cx.clearRect(0,0,500,500);
  }
}
var vertex = new Array();
var ball = {
  x: 0,
  y: (1/150)*(0 - 200)*(0 - 200) + 100, 
  draw: function() {
    ballid = $('#slider1').val();
    ballfile = ''
    switch (ballid) {
      case "1": ballfile = '../images/items/pokeball.png';   break;
      case "2": ballfile = '../images/items/greatball.png';  break;
      case "3": ballfile = '../images/items/ultraball.png';  break;
      case "4": ballfile = '../images/items/timerball.png';  break;
      case "5": ballfile = '../images/items/quickball.png';  break;
      case "6": ballfile = '../images/items/masterball.png'; break;
    }
    var pokeball_image = new Image()
    pokeball_image.onload = function() {
      canvas2.cx.drawImage(pokeball_image, ball.x, ball.y);
    };
    pokeball_image.src = ballfile 
  }
}

$(document).ready(function () { gasket.init(); canvas2.init()});

gasket.init = function () {  
  gasket.canvas  = $('#canvas1')[0];
  gasket.cx = gasket.canvas.getContext('2d');	// get the drawing canvas
  gasket.cx.fillStyle = 'rgba(250,0,0,0.7)';

  gasket.circle(40, 40, 30)
  gasket.circle(105, 40, 30)
  gasket.circle(170, 40, 30)
  gasket.circle(40, 105, 30)
  gasket.circle(105, 105, 30)
  gasket.circle(170, 105, 30)

  // bind functions to events, button clicks
  $('#randombutton').bind('click', gasket.randomize);
  $('#slider1').bind('change', gasket.slider);
}

var paused = true;
var ballup = true;
var drew = true;
var caught = false;
var catchbit = true;


canvas2.throw = function(ev) {
  if(my_pokemon_count == 6) {return;}
  ball.draw()
  ballup = true;
  paused = false;
  requestAnimationFrame(animate)
  $('#messages').html("Throw");
}

function animate(time) {
  if(paused){
    ball.x = 0
    ball.y = (1/150)*(ball.x - 200)*(ball.x - 200) + 100
    return;
  }

  if (!caught) {
    ball.y = (1/150)*(ball.x - 200)*(ball.x - 200) + 100
    if (ball.x == 330) {
      caught = true
    }
    ball.x += 6

    // animate anything
    ball.draw()
    drew = !drew
    if (drew) {
      canvas2.cx.clearRect(0,105,500,500);
    }
    canvas2.cx.clearRect(200, 0, 500, 105)
  } else {
    if (catchbit) {
      gasket.cx.clearRect(200,0,500,500);
      catchbit = false;
    }
    var pokemon_image = new Image()
    pokemon_image.onload = function() {
      gasket.cx.drawImage(pokemon_image, 300, 200);
    };
    pokemon_image.src = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + pokemon_id + '.png'
    ball.draw()
    mypokemon.push(pokemon_id)
    for (var i = 0; i < mypokemon.length; i++) {
      switch (i) {
        case 0: 
          var pokemon_image = new Image()
          pokemon_image.onload = function() {
            gasket.cx.drawImage(pokemon_image, 0, 0);
          };
          pokemon_image.src = 'http://www.pokestadium.com/assets/img/sprites/' + mypokemon[0] + '.png'
          break;
        case 1:
          var pokemon_image = new Image()
          pokemon_image.onload = function() {
            gasket.cx.drawImage(pokemon_image, 60, 0);
          };
          pokemon_image.src = 'http://www.pokestadium.com/assets/img/sprites/' + mypokemon[1] + '.png'
          break;
        case 2:
          var pokemon_image = new Image()
          pokemon_image.onload = function() {
            gasket.cx.drawImage(pokemon_image, 120, 0);
          };
          pokemon_image.src = 'http://www.pokestadium.com/assets/img/sprites/' + mypokemon[2] + '.png'
          break;
        case 3:
          var pokemon_image = new Image()
          pokemon_image.onload = function() {
            gasket.cx.drawImage(pokemon_image, 0, 60);
          };
          pokemon_image.src = 'http://www.pokestadium.com/assets/img/sprites/' + mypokemon[3] + '.png'
          break;
        case 4:
          var pokemon_image = new Image()
          pokemon_image.onload = function() {
            gasket.cx.drawImage(pokemon_image, 60, 60);
          };
          pokemon_image.src = 'http://www.pokestadium.com/assets/img/sprites/' + mypokemon[4] + '.png'
          break;
        case 5: 
          var pokemon_image = new Image()
          pokemon_image.onload = function() {
            gasket.cx.drawImage(pokemon_image, 120, 60);
          };
          pokemon_image.src = 'http://www.pokestadium.com/assets/img/sprites/' + mypokemon[5] + '.png'
          break;
        default: 
          break;
      }
    }
    paused = true
    catchbit = true
    caught = false
  }

  $('#messages').html("ball at " + ball.x);

  // request another animation loop
  requestAnimationFrame(animate);
}

// draw a filled circle
gasket.circle = function(x, y, radius) {
  gasket.cx.beginPath();
  gasket.cx.arc(x, y, radius, 0, 2*Math.PI, false);
  gasket.cx.fill();
}

function lpad(value, padding) {
  var zeroes = new Array(padding+1).join("0");
  return (zeroes + value).slice(-padding);
}


// select a random number and set the slider bar to the value
gasket.randomize = function(ev) {
  gasket.cx.clearRect(200, 200,500,500);
  pokemon_id = getRandomInt(pokemon_count)
  var pokemon_image = new Image()
  pokemon_image.onload = function() {
    gasket.cx.drawImage(pokemon_image, 250, 150);
  };
  pokemon_image.src = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + pokemon_id + '.png'

  canvas2.clearscreen()
  $('#messages').html("Set value to " + pokemon_id);
}

// update the message below the slider with its setting
gasket.slider = function(ev) {
  ballid = $('#slider1').val();
  switch(ballid) {
    case "1": document.getElementById('ballimagesrc').src = "../images/items/pokeball.png"
      break;
    case "2": document.getElementById('ballimagesrc').src = "../images/items/greatball.png"
      break;
    case "3": document.getElementById('ballimagesrc').src = "../images/items/ultraball.png"
      break;
    case "4": document.getElementById('ballimagesrc').src = "../images/items/timerball.png"
      break;
    case "5": document.getElementById('ballimagesrc').src = "../images/items/quickball.png"
      break; 
    case "6": document.getElementById('ballimagesrc').src = "../images/items/masterball.png"
      break;
  }
  $('#messages').html("Ball id is" + $('#slider1').val());
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
