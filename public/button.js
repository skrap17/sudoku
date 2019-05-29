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
    if (mouseX >= this.x && mouseY >= this.y && mouseX <= this.x + w && mouseY <= this.y + w){
      this.pressed = true;
      this.action();
    }
  }
  
  this.unpress = function(){
    this.pressed = false;
  }
}