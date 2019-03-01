/*
 * CanvasPaint 352 -- starter code for a paint program using the 
 * HTML5 canvas element--for CS352, Calvin College Computer Science
 *
 * Harry Plantinga -- January 2011
 */

$(document).ready(function () { cpaint.init(); linecanvas.init(); });

var linecanvas = {
    init: function () {
      linecanvas.canvas = $('#linecanvas')[0];
      linecanvas.cx = linecanvas.canvas.getContext('2d');
      linecanvas.cx.fillStyle = 'rgba(0,0,0,0)';

      $(linecanvas.canvas).bind('mousedown', cpaint.drawStart);
      $(linecanvas.canvas).bind('mousemove', cpaint.draw);

    },
}

var cpaint = {
  drawing: 		false,
  tool:			'marker',
  lineThickness: 	12,
  color:		'#333399',
}

var oldx = 0, oldy = 0;

cpaint.init = function () {  
  cpaint.canvas  = $('#canvas1')[0];
  cpaint.cx = cpaint.canvas.getContext('2d');
  cpaint.imgData = cpaint.cx.getImageData(0, 0, cpaint.canvas.width, cpaint.canvas.height);
  					// create offscreen copy of canvas in an image

  // bind functions to events, button clicks
  //$(cpaint.canvas).bind('mousedown', cpaint.drawStart);
  //$(cpaint.canvas).bind('mousemove', cpaint.draw);
  $('*').bind('mouseup', cpaint.drawEnd);
  $('#color1').bind('change', cpaint.colorChange);
  $('#color1').colorPicker();			// initialize color picker
  $('#widthSlider').bind('mouseup', function(){
    cpaint.lineThickness = document.getElementById("widthSlider").value;
    $('#messages').html("Line thickness is " + cpaint.lineThickness);
  })
  $('#mainmenu').clickMenu();			// initialize menu

  // bind menu options
  $('#menuClear').bind('click', cpaint.clear);
  $('#menuNew').bind('click', cpaint.clear);
  $('#menuFade').bind('click', cpaint.fade);
  $('#menuUnfade').bind('click', cpaint.unfade);
  $('#menuOpen').bind('click',cpaint.open);
  $('#menuSave').bind('click',cpaint.save);
  $('#toolBar').show();		// when toolbar is initialized, make it visible

  // bind sidebar options
  $('#markerButton').bind('click', function(){
      clearButton();
      $('#markerButton').addClass("selected");
      cpaint.tool = 'marker';
  })
  $('#lineButton').bind('click', function() {
    clearButton();
    $('#lineButton').addClass("selected");
    cpaint.tool = 'line';
  })
  $('#rectButton').bind('click', function() {
    clearButton();
    $('#rectButton').addClass("selected");
    cpaint.tool = 'rect';
  })
  $('#eraserButton').bind('click', function() {
    clearButton();
    $('#eraserButton').addClass("selected");
    cpaint.tool = 'eraser';
  })

  $('#clearButton').bind('mousedown', function(){
    $('#clearButton').addClass("selected");
    cpaint.clear();
  });
  $('#clearButton').bind('mouseup', function(){
    $('#clearButton').removeClass("selected");
  });

}

var clearButton = function () {
  $('#markerButton').removeClass("selected");
  $('#lineButton').removeClass("selected");
  $('#rectButton').removeClass("selected");
  $('#eraserButton').removeClass("selected");
}

/*
 * handle mousedown events
 */
cpaint.drawStart = function(ev) {
  ev.preventDefault();
  var x, y; 				// convert event coords to (0,0) at top left of canvas
  x = ev.pageX - $(cpaint.canvas).offset().left;
  oldx = x;
  y = ev.pageY - $(cpaint.canvas).offset().top;
  oldy = y;


  cpaint.drawing = true;			// go into drawing mode
  if (cpaint.tool == 'marker') {
    cpaint.cx.lineWidth = cpaint.lineThickness;
    cpaint.cx.strokeStyle = cpaint.color;
    cpaint.cx.fillStyle = cpaint.color;
  
    cpaint.imgData = cpaint.cx.getImageData(0, 0, cpaint.canvas.width, cpaint.canvas.height);
                            // save drawing window contents
    cpaint.cx.beginPath();
    cpaint.cx.arc(x, y, cpaint.lineThickness / 2, 0, 2 * Math.PI);
    cpaint.cx.fill();
  } else
  if (cpaint.tool == 'line') {
    cpaint.cx.lineWidth = cpaint.lineThickness;
    cpaint.cx.strokeStyle = cpaint.color;
    cpaint.cx.fillStyle = cpaint.color;
    cpaint.imgData = cpaint.cx.getImageData(0, 0, cpaint.canvas.width, cpaint.canvas.height);
                            // save drawing window contents
    cpaint.cx.beginPath();
    cpaint.cx.arc(x, y, cpaint.lineThickness / 2, 0, 2 * Math.PI);
    cpaint.cx.fill();
                         
  } else 
  if (cpaint.tool == 'rect') {
    cpaint.cx.lineWidth = cpaint.lineThickness;
    cpaint.cx.strokeStyle = cpaint.color;
    cpaint.cx.fillStyle = cpaint.color;
    cpaint.imgData = cpaint.cx.getImageData(0, 0, cpaint.canvas.width, cpaint.canvas.height);
  } else 
  if (cpaint.tool == 'eraser') {
    cpaint.cx.strokeStyle = 'white';
    cpaint.cx.fillStyle = 'white';
    cpaint.cx.beginPath();
    cpaint.cx.arc(x, y, 30, 0, 2 * Math.PI);
    cpaint.cx.fill();  
  }
  $('#messages').html("Mouse down at (" + x + ", " + y + ")");

}

/*
 * handle mouseup events
 */
cpaint.drawEnd = function(ev) {
  var x, y; 				// convert event coords to (0,0) at top left of canvas
  x = ev.pageX - $(cpaint.canvas).offset().left;
  y = ev.pageY - $(cpaint.canvas).offset().top;
  if (x < 0 || x > 600) {cpaint.drawing = false; return;}
  if (y < 0 || y > 350) {cpaint.drawing = false; return;}
  
  if (cpaint.tool == 'marker') {
    cpaint.cx.beginPath();
    cpaint.cx.arc(x, y, cpaint.lineThickness / 2, 0, 2 * Math.PI);
    cpaint.cx.fill();
  } else
  if (cpaint.tool == 'line') {
    linecanvas.cx.clearRect(0, 0, linecanvas.canvas.width, linecanvas.canvas.height);

    cpaint.cx.beginPath();
    cpaint.cx.moveTo(oldx,oldy);
    cpaint.cx.lineTo(x,y);
    cpaint.cx.stroke();
    cpaint.cx.beginPath();
    cpaint.cx.arc(x, y, cpaint.lineThickness / 2, 0, 2 * Math.PI);
    cpaint.cx.fill();

  } else 
  if (cpaint.tool == 'rect') {
    linecanvas.cx.clearRect(0, 0, linecanvas.canvas.width, linecanvas.canvas.height);

    cpaint.cx.beginPath();
    cpaint.cx.rect(oldx, oldy, x - oldx, y - oldy);
    cpaint.cx.stroke();
  } else 
  if (cpaint.tool == 'eraser') {
    cpaint.cx.beginPath();
    cpaint.cx.arc(x, y, 30, 0, 2 * Math.PI);
    cpaint.cx.fill();
  }
  cpaint.drawing = false;
  $('#messages').html("Mouse up at (" + x + ", " + y + ")");

}

/*
 * handle mousemove events
 */
cpaint.draw = function(ev) {
  var x, y;
  x = ev.pageX - $(cpaint.canvas).offset().left;
  y = ev.pageY - $(cpaint.canvas).offset().top;
  if (x < 0 || x > 600) {cpaint.drawing = false; return;}
  if (y < 0 || y > 350) {cpaint.drawing = false; return;}
  
  if (cpaint.drawing) {
    if (cpaint.tool == 'marker') {
      cpaint.cx.beginPath();			
      cpaint.cx.moveTo(oldx,oldy);
      cpaint.cx.lineTo(x,y);
      cpaint.cx.stroke();
      cpaint.cx.beginPath();
      cpaint.cx.arc(x, y, cpaint.lineThickness / 2, 0, 2 * Math.PI);
      cpaint.cx.fill();
  
      oldx = x;
      oldy = y;    
    } else
    if (cpaint.tool == 'line') {
      linecanvas.cx.lineWidth = cpaint.lineThickness;
      linecanvas.cx.strokeStyle = cpaint.color;
      linecanvas.cx.fillStyle = cpaint.color;
    
      linecanvas.cx.clearRect(0, 0, linecanvas.canvas.width, linecanvas.canvas.height);
      linecanvas.cx.beginPath();
      linecanvas.cx.moveTo(oldx,oldy);
      linecanvas.cx.lineTo(x,y);
      linecanvas.cx.stroke();
      linecanvas.cx.beginPath();
      linecanvas.cx.arc(x, y, cpaint.lineThickness / 2, 0, 2 * Math.PI);
      linecanvas.cx.fill();
  
    } else
    if (cpaint.tool == 'rect') {
      linecanvas.cx.lineWidth = cpaint.lineThickness;
      linecanvas.cx.strokeStyle = cpaint.color;
      linecanvas.cx.fillStyle = cpaint.color;

      linecanvas.cx.clearRect(0, 0, linecanvas.canvas.width, linecanvas.canvas.height);
      linecanvas.cx.beginPath();
      linecanvas.cx.rect(oldx, oldy, x - oldx, y - oldy);
      linecanvas.cx.stroke();
    
    } else 
    if (cpaint.tool == 'eraser') {
      cpaint.cx.beginPath();			
      cpaint.cx.moveTo(oldx,oldy);
      cpaint.cx.lineTo(x,y);
      cpaint.cx.stroke();
      cpaint.cx.beginPath();
      cpaint.cx.arc(x, y, 30, 0, 2 * Math.PI);
      cpaint.cx.fill();
  
      oldx = x;
      oldy = y;    
    }
  }
} 

/*
 * clear the canvas, offscreen buffer, and message box
 */
cpaint.clear = function(ev) {
    cpaint.cx.clearRect(0, 0, cpaint.canvas.width, cpaint.canvas.height);
    linecanvas.cx.clearRect(0, 0, cpaint.canvas.width, cpaint.canvas.height);
    cpaint.imgData = cpaint.cx.getImageData(0, 0, cpaint.canvas.width, cpaint.canvas.height);
  $('#messages').html("");
}  

/*
 * color picker widget handler
 */
cpaint.colorChange = function(ev) {
  cpaint.color = $('#color1').val()
  $('#messages').prepend("Color: " + $('#color1').val() + "<br>");
}


/*
 * handle open menu item by making open dialog visible
 */
cpaint.open = function(ev) { 
  $('#fileInput').show();
  $('#file1').bind('change submit',cpaint.loadFile);
  $('#closeBox1').bind('click',cpaint.closeDialog);
  $('#messages').prepend("In open<br>");	
}

/*
 * load the image whose URL has been typed in
 * (this should have some error handling)
 */
cpaint.loadFile = function() {
  $('#fileInput').hide();
  $('#messages').prepend("In loadFile<br>");	
  var img = document.createElement('img');
  var file1 = $("#file1").val();
  $('#messages').prepend("Loading image " + file1 + "<br>");	

  img.src=file1;
  img.onload = function() {
    cpaint.cx.clearRect(0, 0, cpaint.canvas.width, cpaint.canvas.height);
    cpaint.cx.drawImage(img,0, 0, cpaint.canvas.width, cpaint.canvas.height);
  }
}

cpaint.closeDialog = function() {
  $('#fileInput').hide();
}

/*
 * to save a drawing, copy it into an image element
 * which can be right-clicked and save-ased
 */
cpaint.save = function(ev) {
  $('#messages').prepend("Saving...<br>");	
  var dataURL = cpaint.canvas.toDataURL();
  if (dataURL) {
    $('#saveWindow').show();
    $('#saveImg').attr('src',dataURL);
    $('#closeBox2').bind('click',cpaint.closeSaveWindow);
  } else {
    alert("Your browser doesn't implement the toDataURL() method needed to save images.");
  }
}

cpaint.closeSaveWindow = function() {
  $('#saveWindow').hide();
}

/*
 * Fade/unfade an image by altering Alpha of each pixel
 */
cpaint.fade = function(ev) {
  $('#messages').prepend("Fade<br>");	
  cpaint.imgData = cpaint.cx.getImageData(0, 0, cpaint.canvas.width, cpaint.canvas.height);
  var pix = cpaint.imgData.data;
  for (var i=0; i<pix.length; i += 4) {
    pix[i+3] /= 2;		// reduce alpha of each pixel
  }
  cpaint.cx.putImageData(cpaint.imgData, 0, 0);
}

cpaint.unfade = function(ev) {
  $('#messages').prepend("Unfade<br>");	
  cpaint.imgData = cpaint.cx.getImageData(0, 0, cpaint.canvas.width, cpaint.canvas.height);
  var pix = cpaint.imgData.data;
  for (var i=0; i<pix.length; i += 4) {
    pix[i+3] *= 2;		// increase alpha of each pixel
  }
  cpaint.cx.putImageData(cpaint.imgData, 0, 0);
}
