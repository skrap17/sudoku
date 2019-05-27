let w = 50;
let K = 40;
let sudoku;
let curr = [0, 0];
let start = false;
let game = true;
let nums = [];
let curnum = 0;
let pencil = false;
let penimg;
let bg;
let vert;
let horiz;

function preload(){
   penimg = loadImage("pencil.png");
  bg = loadImage("background.jpg");
  vert = loadImage("vertical_line.png");
  horiz = loadImage("gorizontal_line.png");
}

function setup() {
  let d = dims();
  let cnv = createCanvas(d[0], d[1]);
  cnv.style('display', 'block');
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  sudoku = new grid();
  sudoku.fill();

  for (let i = 0; i < 9; i++) {
    nums.push(new cell(i, 9));
    nums[i].n = i + 1;
    nums[i].changeble = true;
    nums[i].col = color(100, 50, 200);
  }
  
  noLoop();
  redraw();
}

function draw() {
  
  //background(220);
  //image(bg, -bg.width + width, -bg.height + height, width, height);
  //image(bg, 0, 0, width, height, (bg.width - width) * 0.5, (bg.height - height) * 0.5, width, height);
  image(bg, 0, 0, width, height);
  pen();
  for (let i in nums)
    nums[i].show();
  sudoku.show();
}

function mousePressed() {
  let i = int(mouseX / w);
  if (mouseY <= height - w - 1 && mouseY >= w + 1 && mouseX <= width - 1 && game) {
    let j = int(mouseY / w) - 1;
    if (sudoku.cell(i, j).changeble) {
      start = true;
      sudoku.cell(curr[0], curr[1]).highlighted = false;
      sudoku.high(i, j);
      curr = [i, j];
    }
  } else if (mouseY > height - w - 1 && mouseY <= height && game) {
    nums[i].highlighted = true;
    curnum = i;
    if (start) {
      sudoku.set(curr[0], curr[1], nums[i].n);
      sudoku.corruption();
      if (sudoku.solved())
        win();
    }
  } else if (i == 7 && mouseY > 0 && mouseY < w && game) {
    pencil = true;
    if (start)
      sudoku.alfa(curr[0], curr[1]);
  }
  redraw();
}

function mouseReleased() {
  if (game) {
    sudoku.corruption();
    nums[curnum].highlighted = false;
    pencil = false;
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
    sudoku.cell(curr[0], curr[1]).highlighted = false;
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
  //console.log[arr];
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

function pen() {
  fill(255);
  if (pencil)
    fill(240);
  noStroke();
  rect(7 * w, 0, w, w);
  image(penimg, 7 * w, 0, w - 2, w - 2);
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
