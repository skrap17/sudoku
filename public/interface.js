var url = new URL(location.href);

var playerid = url.searchParams.get("id");

var K;

document.body.onload = function() {
  setTimeout(function() {
    var ld = document.getElementById("ld");
    ld.style.display = "none";
    var x = document.getElementById("b1");
    x.style.display = "inline-block";
  }, 500);
}

function startGame() {
  var x = document.getElementById("b1");
  x.style.display = "none";
  var e = document.getElementById("e");
  var m = document.getElementById("m");
  var h = document.getElementById("h");
  e.style.display = "inline-block";
  m.style.display = "inline-block";
  h.style.display = "inline-block";
}

function butt() {
  var pre = document.getElementById("pre");
  pre.style.display = "none";

  var e = document.getElementById("e");
  var m = document.getElementById("m");
  var h = document.getElementById("h");
  e.style.display = "none";
  m.style.display = "none";
  h.style.display = "none";
  newGame();
  redraw();
}

function easy() {
  K = 10;
  butt();
}

function medium() {
  K = 30;
  butt();
}

function hard() {
  K = 50;
  butt();
}

function resume() {
  let ovl = document.getElementById("pre");
  ovl.style.display = "none";
  let cont = document.getElementById("cont");
  cont.style.display = "none";
  let ng = document.getElementById("ng");
  ng.style.display = "none";
  let rest = document.getElementById("rest");
  rest.style.display = "none";
  start = true;
}

function NewGame() {
  let cont = document.getElementById("cont");
  cont.style.display = "none";
  let ng = document.getElementById("ng");
  ng.style.display = "none";
  let rest = document.getElementById("rest");
  rest.style.display = "none";

  var e = document.getElementById("e");
  var m = document.getElementById("m");
  var h = document.getElementById("h");
  e.style.display = "inline-block";
  m.style.display = "inline-block";
  h.style.display = "inline-block";

}

function restart() {
   reset();
   s = 0;
   redraw();
   resume(); 
}
