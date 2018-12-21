var current;
var snowflake;

function setup() {
  createCanvas(720, 400);
  current = new Particle(width/2, random(10));
  snowflake = [];

}

function draw() {
  translate(width/2, height/2);
  rotate(PI/6);
  background(0);
  current.update();

  if (current.finished() &&  !current.intersects(snowflake)) {
    snowflake.add(current);
    current = new Particle();
  }
  for(var i =0; i < 6; i++) {
    rotate(PI/3);
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
    this.pos = new PVector(a, b);
    this.r = 3;
  }

  update() {
    pos.x -= 1;
    pos.y += random(-3, 3);
    var angle = pos.heading();
    angle = constrain(angle, 0, PI/6);
    var magnitude = pos.mag();
    pos = PVector.fromAngle(angle);
    pos.setMag(magnitude);

  }

  show() {
    fill(255);
    stroke(255);
    ellipse(pos.x, pos.y, r*2, r*2);
  }

  intersects() {

  }

  finished() {
    return (x < 0);
  }


}
