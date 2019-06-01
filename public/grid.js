function grid() {
  this.cells = [];

  for (let j = 0; j < 9; j++) {
    for (let i = 0; i < 9; i++) {
      this.cells[index(i, j)] = new cell(i, j);
    }
  }



  this.show = function() {
    strokeWeight(1);
    for (let c in this.cells)
      this.cells[c].show();
    strokeWeight(3);
    imageMode(CORNER);
    for (let i = 0; i <= 3; i++) {
      let of1 = 0, of3 = 0;
      if (xoff == 0){
        if (i ==0)
          of1 = 2;
        if (i == 3)
          of3 = 2;
      }
      //image(horiz, xoff - 2, i * 3 * w - 2 + w + yoff, width - 2 * xoff + 4, 4);
      //image(vert, i * 3 * w - 2 + xoff - of3, w - 2 + yoff, 4 + of1, height - 2 * w - 2 * yoff + 4);
      stroke(204, 56, 52);
      let st  = 4;
      strokeWeight(st);
      line(xoff, i * 3 * w + w + yoff, xoff + width - 2 * xoff,  i * 3 * w + w + yoff);
      if (xoff == 0 && i % 3 == 0)
        st = 8;
      strokeWeight(st);
      line(i * 3 * w + xoff, w + yoff + 2,  i * 3 * w + xoff, height - 2 * w - 2 * yoff +  w + yoff - 2);
    }
  }

  this.row = function(n) {
    let row = [];
    for (let i = 0; i < 9; i++) {
      row.push(this.cells[index(i, n)].n);
    }
    return row;
  }

  this.goodRow = function(n) {
    return goodArr(this.row(n));
  }

  this.inRow = function(num, n) {
    return inArr(num, this.row(n));
  }

  this.col = function(n) {
    let col = [];
    for (let i = 0; i < 9; i++) {
      col.push(this.cells[index(n, i)].n);
    }
    return col;
  }

  this.goodCol = function(n) {
    return goodArr(this.col(n));
  }

  this.inCol = function(num, n) {
    return inArr(num, this.col(n));
  }

  this.squar = function(x, y) {
    let squar = [];
    for (let j = 0; j < 3; j++)
      for (let i = 0; i < 3; i++)
        squar.push(this.cells[index(x + i, y + j)].n);
    return squar;
  }

  this.goodSquar = function(x, y) {
    return goodArr(this.squar(x, y));
  }

  this.inSquar = function(num, x, y) {
    return inArr(num, this.squar(x, y));
  }


  this.cell = function(x, y) {
    return this.cells[index(x, y)];
  }

  this.change = function(x, y) {
    this.cells[index(x, y)].changeble = true;
  }

  this.high = function(x, y) {
    let a = this.cells[index(x, y)].highlighted;
    this.cells[index(x, y)].highlighted = !a;
  }

  this.set = function(x, y, num) {
    this.cells[index(x, y)].n = num;
  }

  this.fill = function() {
    for (let c in this.cells) {
      this.cells[c].n = undefined;
      this.cells[c].changeble = false;
      this.cells[c].highlighted = false;
      this.cells[c].corrupted = false;
    }
    this.fillMiddle();
    this.fillOther(0, 3);
    this.remove(K);
  }

  this.fillSq = function(x, y) {

    let options = [];
    for (let i = 0; i < 9; i++)
      options[i] = i + 1;

    for (let j = 0; j < 3; j++)
      for (let i = 0; i < 3; i++) {
        let ind = floor(random(options.length));
        this.set(x + i, y + j, options[ind]);
        options.splice(ind, 1);
      }
  }

  this.fillMiddle = function() {
    for (let i = 0; i <= 2; i++)
      this.fillSq(3 * i, 3 * i);
  }


  this.fillOther = function(i, j) {
    if (j >= 9 && i < 8) {
      i++;
      j = 0;
    }
    if (i >= 9 && j >= 9)
      return true;

    if (i < 3) {
      if (j < 3)
        j = 3;
    } else if (i < 6) {
      if (j == int(i / 3) * 3)
        j = j + 3;
    } else {
      if (j == 6) {
        i++;
        j = 0;
        if (i >= 9)
          return true;
      }
    }

    for (let num = 1; num <= 9; num++) {
      if (this.safe(i, j, num)) {
        this.set(i, j, num);
        if (this.fillOther(i, j + 1))
          return true;

        this.set(i, j, undefined);
      }
    }
    return false;
  }

  this.safe = function(x, y, n) {
    return !this.inCol(n, x) && !this.inRow(n, y) && !this.inSquar(n, x - x % 3, y - y % 3);
  }

  this.remove = function(k) {
    let count = k;
    while (count > 0) {
      let i = floor(random(1) * 9);
      let j = floor(random(1) * 9);
      let n = this.cell(i, j).n
      if (n != undefined) {
        this.set(i, j, undefined);
        if (this.solNum(0, 0, 0) == 1){
          this.change(i, j);
          count--;
        }
        else
          this.set(i, j, n);
      }
    }
  }

  this.solved = function() {
    for (let i = 0; i < 9; i++)
      if (sumArr(this.row(i)) != 45)
        return false;
    for (let i = 0; i < 9; i++)
      if (sumArr(this.col(i)) != 45)
        return false;
    for (let i = 0; i < 3; i++)
      for (let j = 0; i < 3; i++)
        if (sumArr(this.squar(i * 3, j * 3)) != 45)
          return false;
    return true;
  }

  this.corruption = function() {
    for (let i = 0; i < 9; i++)
      for (let j = 0; j < 9; j++) {
        let num = this.cell(i, j).n;
        if (this.cell(i, j).changeble) {
          if (this.inRow(num, j) > 1 || this.inCol(num, i) > 1 || this.inSquar(num, i - i % 3, j - j % 3) > 1)
            this.cell(i, j).corrupted = true;
          else
            this.cell(i, j).corrupted = false;
        }
      }
  }

  this.alfa = function(i, j){
    if (this.cell(i, j).n != undefined){
    let a = this.cell(i, j).sure;
    if (a == 255)
      this.cell(i, j).sure = 80;
    else
      this.cell(i, j).sure = 255;
    }
  }
  
  this.lookAtAll = function(x, y){
    if (this.cell(x, y).n != undefined){
      let n = this.cell(x, y).n;
      for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
          if (this.cell(i, j).n == n)
            this.cell(i, j).highlighted = true;
        }
      }
    }
  }
  
  this.unhight = function(x, y){
    if (this.cell(x, y).n != undefined){
      let n = this.cell(x, y).n;
      for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
          if (this.cell(i, j).n == n)
            this.cell(i, j).highlighted = false;
        }
      }
    }
  }
  
  this.solNum = function(i, j, count){
    
    if (i == 9) {
        i = 0;
        j = j + 1;
        if (j == 9)
            return 1 +count;
    } 
    
    if (this.cell(i, j).n != undefined)  // skip filled cells
        return this.solNum(i+1, j, count);
    
    // search for 2 solutions instead of 1
    // break, if 2 solutions are found
    
    for (let val = 1; val <= 9 && count < 2; ++val) {
        if (this.safe(i, j,val)) {
            this.cell(i, j).n = val;
            // add additional solutions
            count = this.solNum(i + 1, j, count);
        }
    }
    this.cell(i, j).n = undefined // reset on backtrack
    return count;
  }
}
