var tree = [];
var walkers = [];
//var r = 4;
var maxWalkers = 50;
var iterations = 1000;
var radius = 8;
var hu = 0;
var shrink = 0.995;

function setup() {
  createCanvas(windowWidth, windowHeight - 50);
  colorMode(HSB);
  // for (var x = 0; x < width; x += r * 2) {
  //   tree.push(new Walker(x, height));
  // }

  tree[0] = new Walker(width / 2, height / 2);
  radius *= shrink;
  for (var i = 0; i < maxWalkers; i++) {
    walkers[i] = new Walker();
    radius *= shrink;
  }
}

function draw() {
  background(51);

  for (var i = 0; i < tree.length; i++) {
    tree[i].show();
  }

  for (var i = 0; i < walkers.length; i++) {
    walkers[i].show();
  }

  for (var n = 0; n < iterations; n++) {
    for (var i = walkers.length - 1; i >= 0; i--) {
      walkers[i].walk();
      if (walkers[i].checkStuck(tree)) {
        walkers[i].setHue(hu % 360);
        hu += 2;
        tree.push(walkers[i]);
        walkers.splice(i, 1);
      }
    }
  }

  var r = walkers[walkers.length - 1].r;
  while (walkers.length < maxWalkers && radius > 1) {
    radius *= shrink;
    walkers.push(new Walker());
  }

}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 50);
}

function Walker(x, y) {
  if (arguments.length == 2) {
    this.pos = createVector(x, y);
    this.stuck = true;
  } else {
    this.pos = randomPoint();
    this.stuck = false;
  }
  this.r = radius;

  this.walk = function() {
    var vel = p5.Vector.random2D();
    // var vel = createVector(random(-1, 1), random(-0.5, 1));
    this.pos.add(vel);
    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, height);
  }


  this.checkStuck = function(others) {
    for (var i = 0; i < others.length; i++) {
      var d = distSq(this.pos, others[i].pos);
      if (d < (this.r * this.r + others[i].r * others[i].r +  2 * others[i].r * this.r)) {
        //if (random(1) < 0.1) {
        this.stuck = true;
        return true;
        break;
        //}
      }
    }
    return false;
  }

  this.setHue = function(hu) {
    this.hu = hu;
  }

  this.show = function() {
    noStroke();
    if (this.stuck && typeof this.hu !== 'undefined') {
      fill(this.hu, 255, 100, 200);
    } else {
      fill(360, 0, 255);
    }
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
  }

}

function randomPoint() {
  var i = floor(random(4));

  if (i === 0) {
    var x = random(width);
    return createVector(x, 0);
  } else if (i === 1) {
    var x = random(width);
    return createVector(x, height);
  } else if (i === 2) {
    var y = random(height);
    return createVector(0, y);
  } else {
    var y = random(height);
    return createVector(width, y);
  }
}


function distSq(a, b) {
  var dx = b.x - a.x;
  var dy = b.y - a.y;
  return dx * dx + dy * dy;
}
