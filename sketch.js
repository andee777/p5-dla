var current = new Particle();

function setup() {
  createCanvas(720, 400);
  snowflake = new ArrayList<Particle>();

}

function draw() {
  translate(width/2, height/2);
  background(0);
  current.update();
  for(var i =0; i < 6; i++) {
    current.show();
    for (Particle p : snowflake) {
      p.show;
    }
  }

}

class Particle {
  PVector pos;
  var r;
  constructor(a, b) {
    pos = new PVector(a, b);
    r = 3;
  }

  function update() {
    pos.x -= 1;
    pos.y += random(-1, 1);

    float angle = pos.heading();

  }

  function show() {
    fill(255);
    stroke(255);
    ellipse(pos.x, pos.y, r*2, r*2);
  }

  function intersects() {

  }

  function finished() {
    return (x < 0);
  }


}
