let cnv;
let formResolution = 3;
let stepSize = 3;
let distortionFactor = 5;
let initRadius = 0;
let centerX;
let centerY;
let x = [];
let y = [];
let xX;
let yY;
let offX = Math.random()
let offY = Math.random()
let distOff = Math.random()
let globalSize = 800;
let filled = true;
let freeze = false;

function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.position(0, 0)
    cnv.style('z-index', '-99')
    // init shape
    centerX = width / 2;
    centerY = height / 2;
    let angle = 0;
    for (let i = 0; i < formResolution; i++) {
        x.push(cos(angle * i) * initRadius);
        y.push(sin(angle * i) * initRadius);
    }

    stroke(255, 150);
    strokeWeight(1);
    xX = width / 2
    yY = height / 2
    background(255);
}

function draw() {
    push()
    xX = map(noise(offX), 0, 1, 0, width)
    yY = map(noise(offY), 0, 1, 0, height)
    distortionFactor = Math.round(map(noise(distOff), 0, 1, 1, 10));
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = -3;
    drawingContext.shadowBlur = distortionFactor;
    drawingContext.shadowColor = color(0, 150);
    // speed
    // centerX += (mouseX - centerX) * 0.025;
    // centerY += (mouseY - centerY) * 0.025;
    // print(mouseX, mouseY)
    centerX += (xX - centerX) * 0.5;
    centerY += (yY - centerY) * 0.5;
    // calculate new points
    for (let i = 0; i < formResolution; i++) {
        x[i] += random(-stepSize, stepSize);
        y[i] += random(-stepSize, stepSize);
        // uncomment the following line to show position of the agents
        // ellipse(x[i] + centerX, y[i] + centerY, 5, 5);
    }

    if (filled) {
        fill(map(noise(offY), 0, 1, 255, 255));
    } else {
        noFill();
    }
    beginShape();
    // first controlpoint
    curveVertex(x[formResolution - 1] + centerX, y[formResolution - 1] + centerY);
    for (let i = 0; i < formResolution; i++) {
        curveVertex(x[i] + centerX, y[i] + centerY);
    }
    curveVertex(x[0] + centerX, y[0] + centerY);
    // end controlpoint
    curveVertex(x[1] + centerX, y[1] + centerY);
    endShape();

    offX += 0.0025;
    offY += 0.00125;
    distOff += 0.08005;
}

function mousePressed() {
    clear();
    background(255);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}