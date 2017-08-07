/*
The Nature Of Code course - https://www.kadenze.com/courses/the-nature-of-code
SEESION 1 ASSIGNMENT
Buiild your own walker with position, velocity and acceleration vectors
*/

// assumption: the 'walker' accelerates towards the mouse position, once the mouse stops moving, the effect of acceleration is decreased each frame
// M DANLOWSKI
// github.com/mdanlowski

var w;

function setup() {
    createCanvas(640, 640);
    w = new Walker();

}

function draw() {
    background(0, 255, 150,);
    w.update();
    w.display();
}
 
var Walker = function() {
	this.pos = createVector(width/2, height/2);
	this.vel = createVector(0, 0); //p5.Vector.fromAngle(0); this.vel.setMag(0);
	this.acc = createVector(0, 0);

	this.update = function() {
		// updating mouse position
		var mouse = createVector(mouseX, mouseY);
		
		// calculating acceleration
		this.acc = p5.Vector.sub(mouse, this.pos);
		this.acc.setMag(0.2);

		// updating coordinates
		this.vel.add(this.acc);
		this.pos.add(this.vel);

		// if the mouse is stationary, decrease speed gradually
		if (pmouseX - mouseX == 0 && pmouseY - mouseY == 0) {
			this.vel.mult(0.99);
		}

		// diag help
		// text(this.acc, 10, 30);
		
	}

	this.display = function() {
		strokeWeight(3);
		fill(255, 150, 0);
		ellipse(this.pos.x, this.pos.y, 40, 40);
		// triangle(this.pos.x-15, this.pos.y+30, this.pos.x, this.pos.y, this.pos.x+15, this.pos.y+30);

		// draw the vectors
		strokeWeight(2);
		stroke(255, 0, 0);
		// DIR OF ACC
		line(this.pos.x, this.pos.y, this.pos.x + 200*this.acc.x, this.pos.y + 200*this.acc.y);	
		stroke(0, 100, 255);
		/*DIR
		var dir = this.vel.copy();	
		dir.normalize(); */	
		// VEL
		line(this.pos.x, this.pos.y, this.pos.x + 10*this.vel.x, this.pos.y + 10*this.vel.y);

		// printing position data in the T-L corner of the canvas
		stroke(0);
		fill(0);
		strokeWeight(0);
		text("x: " + round(this.pos.x) + "	y: " + round(this.pos.y), 10, 15);

	}
}