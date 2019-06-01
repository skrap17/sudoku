 var ingame = false;
    var K;
    
    document.body.onload = function(){
      setTimeout(function() {
        var pre = document.getElementById("pre");
        var ld = document.getElementById("ld");
        pre.style.display = "none";
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
      var e = document.getElementById("e");
      var m = document.getElementById("m");
      var h = document.getElementById("h");
      e.style.display = "none";
      m.style.display = "none";
      h.style.display = "none";
      ingame = true;
      setup();
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
