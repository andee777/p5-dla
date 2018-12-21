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

  if (!current.finished() &&  !current.intersects(snowflake)) {
    snowflake.push(current);
    current = new Particle();
  }
  for(var i =0; i < 6; i++) {
    rotate(PI/3);
    current.show();
    console.log(snowflake.length);
    for (p in snowflake) {
      p.show();
    }
  }

}

class Particle {

  constructor(a, b) {
    this.pos = createVector(a, b);
    this.r = 3;
  }

  update() {
    this.pos.x -= 1;
    this.pos.y += random(-3, 3);
    var angle = this.pos.heading();
    angle = constrain(angle, 0, PI/6);
    var magnitude = this.pos.mag();
    this.pos = p5.Vector.fromAngle(angle);
    this.pos.setMag(magnitude);

  }

  show() {
    fill(255);
    stroke(255);
    ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
  }

  intersects(snowflake) {
      var result =  false;
      for (s in snowflake) {
        var d = p5.Vector.dist(s.pos.x, s.pos.y, this.pos.x, this.pos.y);
        if (d < this.r*2) {
          result = true;
          break;
        }
      }
      return result;
  }

  finished() {
    return (this.pos.x < 0);
  }


}
