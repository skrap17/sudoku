function button(x, y, img, action) {
  this.x = x;
  this.y = y;
  this.img = img;
  this.pressed = false;
  this.action = action;
  
  this.show = function(){
    noStroke();
    fill(247, 247, 22, 140);
    if (this.pressed)
      rect(this.x + xoff, this.y + yoff, w, w - 2);
    imageMode(CORNER);
    image(this.img, this.x + xoff, this.y + yoff, w, w - 2);
  }
  
  this.press = function(){
    if (mouseX >= this.x + xoff && mouseY >= this.y + yoff && mouseX <= this.x + xoff + w && mouseY <= this.y + yoff + w){
      this.pressed = true;
      this.action();
    }
  }
  
  this.unpress = function(){
    this.pressed = false;
  }
  
  this.pos = function(x, y){
    this.x = x;
    this.y = y;
  }
}
