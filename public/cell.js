function cell(i, j){
  this.i = i;
  this.j = j;
  this.n = undefined;
  this.changeble = false;
  this.highlighted = false;
  this.col = 0;
  this.st = 1;
  this.corrupted = false;
  this.sure = 255;
  this.main = 80;
  
  this.show = function(){
    strokeWeight(1);
    stroke(0);
    if (!this.highlighted)
      noFill();
    else{
      fill(247, 247, 22, this.main);
    }
   
    rect(this.i * w + xoff, this.j * w + w + yoff, w, w);
    textSize(w / 2);
    textAlign(CENTER, CENTER);
    if (!this.changeble)
      fill(100);
    else
      fill(this.col, this.sure);
    if (this.corrupted)
      fill(255, 0, 0, this.sure);
    strokeWeight(this.st);
    text(this.n, this.i * w + 0.0625 * w + xoff, this.j * w + 1.0625 * w + yoff, w, w);
  }
}
