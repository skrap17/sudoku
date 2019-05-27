function cell(i, j){
  this.i = i;
  this.j = j;
  this.n = undefined;
  this.changeble = false;
  this.highlighted = false;
  this.col = 0;
  this.corrupted = false;
  this.sure = 255;
  
  this.show = function(){
    strokeWeight(1);
    stroke(0);
    if (!this.highlighted)
      fill(255);
    else{
      fill(230);
    }
   
    rect(this.i * w, this.j * w + w, w, w);
    textSize(w / 2);
    textAlign(CENTER, CENTER);
    if (!this.changeble)
      fill(100);
    else
      fill(this.col, this.sure);
    if (this.corrupted)
      fill(255, 0, 0, this.sure);
    text(this.n, this.i * w + 0.0625 * w, this.j * w + 1.0625 * w, w, w);
  }
}