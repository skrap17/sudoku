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
    for (let i = 0; i <= 3; i++) {
      // line(i * 3 * w, w, i * 3 * w, height - w);
      // line(0, i * 3 * w + w, width, i * 3 * w + w);
      image(horiz, 0, i * 3 * w - 2 + w, width, 4);
      image(vert, i * 3 * w - 2, w, 4, height - 2 * w);
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
      if (this.cell(i, j).n != undefined) {
        this.set(i, j, undefined);
        this.change(i, j);
        count--;
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
}
