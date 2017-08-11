var v;
var slThrust;
var gravity;
var wind;
var thrust;
var drag;

function setup() {
    createCanvas(640, 640);
    v = new Vessel(100, 100, 5);
    slThrust = createSlider(0, 100, 1, 1);
    slThrust.position(15, 10);
    slThrust.style('width', '200px');

}

function draw() {
    background(0, 255, 150,);
    // stationary section; create Forces
    	// vector connecting mouse and the vessel, needed to calculate the direction of the thrust vector
	    var msToVes = createVector(mouseX, mouseY).sub(v.pos);
	    msToVes.normalize();
        gravity = createVector(0, 0.015);
        wind = createVector(0.007, 0);
    	thrust = createVector(slThrust.value()*0.001*msToVes.x, slThrust.value()*0.001*msToVes.y);

	// info
	stroke(255,0,0);
    line(v.pos.x + 20, v.pos.y + 20, v.pos.x + 20 + 10000*gravity.x, v.pos.y + 20 + 10000*gravity.y);
    stroke(0,0,255);
    line(v.pos.x + 20, v.pos.y + 20, v.pos.x + 20 + 10000*wind.x, v.pos.y + 20 + 10000*wind.y);
    stroke(255,0,255);
    line(v.pos.x + 20, v.pos.y + 20, v.pos.x + 20 + 1000*thrust.x, v.pos.y + 20 + 1000*thrust.y);
    stroke(0);

    text(slThrust.value(), 225, 25);
    text("Try to land the vessel, steer with mouse", width-300, 15);
    text("Click the slider, then use arrows or PG-UP + PG-DN", width-300, 30);
    text("arrows change thrust by 1, page keys by 10", width-300, 45);


    // section for rotating the rocket according to the mouse position
    var a = atan2(mouseY - (v.pos.y + 20), mouseX - (v.pos.x + 20));
    translate(v.pos.x + 20, v.pos.y + 20);
    rotate(a + PI/2);
    translate(-(v.pos.x + 20), -(v.pos.y + 20));
    
    // apply all Forces
    v.applyForce(gravity, true);
    v.applyForce(wind, false);
    v.applyForce(thrust, false);

    // draw the vessel
    v.update();
    v.edges();
    v.display();

}
 
var Vessel = function(xp, yp, mass) {
	this.mass = mass; 									// Vessel mass
	this.pos = createVector(xp, yp);
	this.vel = createVector(0, 0); 		//p5.Vector.fromAngle(0); this.vel.setMag(0);
	this.acc = createVector(0, 0);

	this.update = function() {
		// updating coordinates
		this.vel.add(this.acc);
		this.pos.add(this.vel);

		this.acc.set(0, 0);							// zero the acc vtr for each new frame to avoid a tempest-like accumulation
	}

	this.display = function() {
		rect(this.pos.x, this.pos.y, 40, 40, 10);
		fill(0,170,255);
		ellipse(this.pos.x + 20, this.pos.y + 20, 20, 20);
		fill(2.55*slThrust.value(), 0.5*slThrust.value(), 0);
		rect(this.pos.x - 10, this.pos.y + 30, 20, 20, 10, 10, 0, 0);
		rect(this.pos.x + 30, this.pos.y + 30, 20, 20, 10, 10, 0, 0);
		fill(255);
	}

	this.applyForce = function(force, isG) {
		var f = force.copy();
		if(isG){
			this.acc.add( f );
		}
		else{
			f.div(this.mass);
			this.acc.add( f );
		}
		
	}

	this.edges = function() {
		if(this.pos.y + 50 > height) {
			this.vel.y *= -1;
			this.pos.y = height - 50;
		}
		/**/
		if(this.pos.x + 25 > width) {
			this.vel.x *= -1;
			this.pos.x = width - 25;
		}
	}
}

	// section for rotating the rocket
    // var a = atan2(mouseY - (v.pos.y + 20), mouseX - (v.pos.x + 20));
    // translate(v.pos.x + 20, v.pos.y + 20);
    // rotate(a + PI/2);
    // translate(-(v.pos.x + 20), -(v.pos.y + 20));

	// rect(this.pos.x, this.pos.y, 40, 40, 10);
	// rect(this.pos.x - 10, this.pos.y + 30, 20, 20, 10, 10, 0, 0);
	// rect(this.pos.x + 30, this.pos.y + 30, 20, 20, 10, 10, 0, 0);
	// fill(0,170,255);
	// ellipse(this.pos.x + 20, this.pos.y + 20, 20, 20);
	// fill(255);