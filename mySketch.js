var img;
var chrs = [];
var characters = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'.";

function preload() {
 img = createCapture(VIDEO);
 img.size(640, 480, WEBGL);
 img.hide();
}

function setup() {
  createCanvas(1024, 668, P2D);
  
  for(var x = 0; x < 640; x+=5)
  {
    for(var y=0; y < 480; y+=10)
    {
      chrs.push(new chr(x, y, characters));
    }
  }
}

function draw() 
{
  img.loadPixels();
  background(0);
	noStroke();
	fill(0,255,255);
  
  if(img.pixels.length == 0)
    return;
  
  for(var ic = 0; ic < chrs.length; ic++)
  {
    var pix = img.pixels[((chrs[ic].positiony * img.width + chrs[ic].positionx) * 4)+2] + 
        img.pixels[((chrs[ic].positiony * img.width + chrs[ic].positionx) * 4)+1] +
        img.pixels[((chrs[ic].positiony * img.width + chrs[ic].positionx) * 4)];
    
    var r = Math.round(
			map(pix, 0, 255*3, 0, characters.length-1)
		);
    chrs[ic].render(r);
  }
}

function chr(x, y, charset)
{
  this.positionx = x;
  this.positiony = y;
	this.characters = charset;
  
  this.renderPosX = (this.positionx/640.0) * 1024;
  this.renderPosY = (this.positiony/480.0) * 768;
  
  this.render = function(chrindex)
  { 
		text("" + this.characters[chrindex], this.renderPosX, this.renderPosY);
  }
  
  return this;
}