/*
 * CanvasPaint 352 -- starter code for a paint program using the 
 * HTML5 canvas element--for CS352, Calvin College Computer Science
 *
 * Harry Plantinga -- January 2011
 */

const anime = require('../animejs/lib/anime.js');

$(document).ready(function () { canvas1.init(); linecanvas.init(); });

var knightfacingright = true;
var xaccel, yaccel;

var linecanvas = {
    init: function () {
      linecanvas.canvas = $('#linecanvas')[0];
      linecanvas.cx = linecanvas.canvas.getContext('2d');
      linecanvas.cx.fillStyle = 'rgba(0,0,0,0)';

      $(linecanvas.canvas).bind('mousedown', canvas1.drawStart);
      $(linecanvas.canvas).bind('mousemove', canvas1.draw);
    },
}

var canvas1 = {
    init:  function () {  
        canvas1.canvas  = $('#canvas1')[0];
        canvas1.cx = canvas1.canvas.getContext('2d');
        canvas1.cx.canvas.width  = window.innerWidth * .99;
        canvas1.cx.canvas.height = window.innerHeight * .965;

        let sensor = new Accelerometer();
        sensor.start();

        sensor.onreading = () => {
            xaccel = sensor.x;
            yaccel = sensor.y;
        }
        
        canvas1.beginGame();
      
        // bind functions to events, button clicks
        //$(canvas1.canvas).bind('mousedown', canvas1.drawStart);
        //$(canvas1.canvas).bind('mousemove', canvas1.draw);
        $('*').bind('mouseup', canvas1.drawEnd);
        $('#color1').bind('change', canvas1.colorChange);
        $('#color1').colorPicker();			// initialize color picker
        $('#widthSlider').bind('mouseup', function(){
          canvas1.lineThickness = document.getElementById("widthSlider").value;
          $('#messages').html("Line thickness is " + canvas1.lineThickness);
        })
        $('#mainmenu').clickMenu();			// initialize menu
    },
}

var scenecanvas = {
    knightx: 200,
    knighty: 215,
    knightw: 50,
    knighth: 51.89,
    dragonx: 400, 
    dragony: 75,
    init: function () {
        scenecanvas.canvas = $('#scenecanvas')[0];
        scenecanvas.cx = scenecanvas.canvas.getContext('2d');

        /*
         * TEXT BOX
         */
        scenecanvas.cx.fillStyle = "#FFFFFF";
        scenecanvas.cx.fillRect(20, 280, 550, 60);

        scenecanvas.cx.fillStyle = "#000000";
        scenecanvas.cx.font = "20px Georgia";
        scenecanvas.cx.fillText("Buffer text.", 25, 305);
        scenecanvas.cx.fillText("Buffer text.", 25, 330);

        /*
         * KNIGHT SPRITE
         */
        var knightRimgfile = 'images/knight_sprite.png';
        var knightLimgfile = 'images/knight_spriteL.png';
        var knight_sprite = new Image()
        knight_sprite.onload = function() {
            scenecanvas.cx.drawImage(knight_sprite, scenecanvas.knightx, scenecanvas.knighty, scenecanvas.knightw, scenecanvas.knighth);
        };
        if (knightfacingright) {
            knight_sprite.src = knightRimgfile; 
        } else {
            knight_sprite.src = knightLimgfile;
        }

        /*
         * DOOR SPRITE
         */
        var doorimgfile = 'images/door.png';
        var door_sprite = new Image();
        door_sprite.onload = function() {
            scenecanvas.cx.drawImage(door_sprite, 30, 165, 150, 150);
        }
        door_sprite.src = doorimgfile;

    
        document.addEventListener('keydown', doKeyDown, false);
        window.requestAnimationFrame(update);
    }
}

function doKeyDown(event) {
    console.log(event.keyCode);
    switch(event.keyCode) {
        case 32: // SPACE 

            break;
        case 37: // LEFT KEY
            knightfacingright = false;
            scenecanvas.knightx-=10;
            console.log("Incrementing x to ", scenecanvas.knightx); 
            window.requestAnimationFrame(update);
            break;
        case 39: // RIGHT KEY
            knightfacingright = true;
            scenecanvas.knightx+=10; 
            console.log("Incrementing x to ", scenecanvas.knightx); 
            window.requestAnimationFrame(update);
            break;
    }
}

function update() {
    scenecanvas.cx.save();

    scenecanvas.cx.clearRect(0, 0, 595, 351);

    /*
     * TEXT BOX
     */
    scenecanvas.cx.fillStyle = "#FFFFFF";
    scenecanvas.cx.fillRect(20, 280, 550, 60);

    scenecanvas.cx.fillStyle = "#000000";
    scenecanvas.cx.font = "20px Georgia";
    scenecanvas.cx.fillText("Move with arrows", 25, 305);
    scenecanvas.cx.fillText("Door will open in 2025", 25, 330);

    /*
    * DOOR SPRITE
    */
    var doorimgfile = 'images/door.png';
    var door_sprite = new Image();
    door_sprite.onload = function() {
        scenecanvas.cx.drawImage(door_sprite, 30, 165, 150, 150);
    }
    door_sprite.src = doorimgfile;

    /*
     * KNIGHT SPRITE
     */
    var knightRimgfile = 'images/knight_sprite.png';
    var knightLimgfile = 'images/knight_spriteL.png';
    var knight_sprite = new Image();
    knight_sprite.onload = function() {
        scenecanvas.cx.drawImage(knight_sprite, scenecanvas.knightx, scenecanvas.knighty, scenecanvas.knightw, scenecanvas.knighth);
    };
    if (knightfacingright) {
        knight_sprite.src = knightRimgfile; 
    } else {
        knight_sprite.src = knightLimgfile;
    }

    /*
     * DRAGON SPRITE
     */
    var dragonimgfile = 'images/dragon_sprite.png';
    var dragon_sprite = new Image();
    dragon_sprite.onload = function() {
        scenecanvas.cx.drawImage(dragon_sprite, scenecanvas.dragonx, scenecanvas.dragony, 170, 170)
    }
    dragon_sprite.src = dragonimgfile;

    // ctx.beginPath();
    // ctx.arc(100, 75, 50, 0, 2 * Math.PI);
    // ctx.stroke();


    scenecanvas.cx.restore();

}

canvas1.beginGame = function() {
    scenecanvas.init();
}


