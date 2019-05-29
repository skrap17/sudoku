let w = 50;
let K = 40;
let sudoku;
let curr = [0, 0];
let start = false;
let game = true;
let nums = [];
let curnum = 0;
let penimg;
let bg;
let vert;
let horiz;
let penbttn; 
let xoff, yoff;

function preload(){
  penimg = loadImage("pencil.png");
  bg = loadImage("bg.png");
  vert = loadImage("vertical_line.png");
  horiz = loadImage("gorizontal_line.png");
}

function setup() {
  d = dims();
  xoff = abs(windowWidth - d[0]) * 0.5;
  yoff = abs(windowHeight - d[1] ) * 0.5;
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('display', 'block');
  cnv.position(0, 0);
  sudoku = new grid();
  sudoku.fill();

  for (let i = 0; i < 9; i++) {
    nums.push(new cell(i, 9));
    nums[i].n = i + 1;
    nums[i].changeble = true;
    nums[i].col = color(168, 228, 255);
  }
  
  penbttn = new button(7 * w, 0, penimg, pencil);
  
  noLoop();
  redraw();
}

function draw() {
  imageMode(CENTER);
  image(bg, width / 2, height / 2);
  penbttn.show();
  for (let i in nums)
    nums[i].show();
  sudoku.show();
}

function mousePressed() {
  penbttn.press();
  let i = int((mouseX - xoff) / w);
  if (mouseY <= height - w - 1 - yoff && mouseY >= w + 1 + yoff && mouseX <= width - 1 - xoff && mouseX >= 1 + xoff && game) {
    let j = int((mouseY - yoff) / w) - 1;
    if (sudoku.cell(i, j).changeble) {
      start = true;
      sudoku.cell(curr[0], curr[1]).highlighted = false;
      sudoku.unhight(curr[0], curr[1]);
      sudoku.cell(curr[0], curr[1]).main = 80;
      sudoku.high(i, j);
      sudoku.cell(i, j).main = 140;
      sudoku.lookAtAll(i, j);
      curr = [i, j];
    }
  } else if (mouseY > height - w - 1 - yoff && mouseY <= height - yoff && mouseX <= width - 1 - xoff && mouseX >= 1 + xoff && game) {
    nums[i].highlighted = true;
    curnum = i;
    if (start) {
      sudoku.unhight(curr[0], curr[1]);
      sudoku.set(curr[0], curr[1], nums[i].n);
      sudoku.lookAtAll(curr[0], curr[1]);
      sudoku.corruption();
      if (sudoku.solved())
        win();
    }
  }
  redraw();
}

function mouseReleased() {
  penbttn.unpress();
  if (game) {
    sudoku.corruption();
    nums[curnum].highlighted = false;
  }
  redraw();
}

function doubleClicked() {
  if (game) {
    let i = int(mouseX / w);
    let j = int(mouseY / w) - 1;
    if (i == curr[0] && j == curr[1])
      sudoku.set(i, j, undefined);
  }
  redraw();
}

function keyPressed() {
  if (key == ' ') {
    sudoku.fill();
    start = false;
    game = true;
    curr = [0, 0];
  } else if (game) {
    if (key == '1')
      sudoku.set(curr[0], curr[1], 1);
    else if (key == '2')
      sudoku.set(curr[0], curr[1], 2);
    else if (key == '3')
      sudoku.set(curr[0], curr[1], 3);
    else if (key == '4')
      sudoku.set(curr[0], curr[1], 4);
    else if (key == '5')
      sudoku.set(curr[0], curr[1], 5);
    else if (key == '6')
      sudoku.set(curr[0], curr[1], 6);
    else if (key == '7')
      sudoku.set(curr[0], curr[1], 7);
    else if (key == '8')
      sudoku.set(curr[0], curr[1], 8);
    else if (key == '9')
      sudoku.set(curr[0], curr[1], 9);
    sudoku.corruption();
    if (sudoku.solved())
      win();
  }
  redraw();
}



function index(x, y) {
  return x + 9 * y;
}


function inArr(n, arr) {
  let count = 0;
  for (let i in arr)
    if (arr[i] == n)
      count++;
  return count;
}

function goodArr(arr) {
  let found = [false, false, false, false, false, false, false, false, false];
  for (let i = 1; i < 10; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] == i && !found[i - 1])
        found[i - 1] = true;
      else if (arr[j] == i && found[i - 1])
        return false;
    }
  }

  return true;
}

function sumArr(arr) {
  let s = 0;
  for (let i in arr)
    s += arr[i];
  return s;
}

function win() {
  start = false;
  game = false;
  for (let i = 0; i < 9; i++)
    for (let j = 0; j < 9; j++) {
      if (sudoku.cell(i, j).highlighted)
        sudoku.cell(i, j).highlighted = false;
      if (sudoku.cell(i, j).changeble){
        sudoku.cell(i, j).col = color(0, 200, 150);
        sudoku.cell(i, j).sure = 255;
      }
    }
}


function dims(){
  let wid;
  let hei;
  if (windowWidth / 9 > windowHeight / 11){
    hei = windowHeight;
    w = hei / 11;
    wid = w * 9;
  }
  else{
    wid = windowWidth;
    w = wid / 9;
    hei = w * 11;
  }
  return [wid, hei];
}

function pencil(){
  if (start)
        sudoku.alfa(curr[0], curr[1]);
}
