let xoff = 0.01
let yoff = 0.02
let noiseY, noiseX;
let zoneMax, zoneMin;
let sclXVal;
let fac;
let graph;
let word;

function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.position(0, 0)
    cnv.style('z-index', '-99')
    graph = createGraphics(width, height)
    rectMode(CENTER)
    imageMode(CENTER)
    zoneMax = height * 0.15
    zoneMin = height
    // sclXVal = 10
    sclXVal = random(10, 25)
    fac = random(0.1, 0.025)
    word = random(["NIFTIES", "ART", "NFT", "GEN-ART"]);
}

function draw() {
    background(255, 25)
    push()
    graph.noStroke()
    graph.fill(0)
    graph.blendMode(ADD)
    graph.triangle(graph.width * .25, graph.height * 0.25, graph.width * 0.75, graph.height * 0.025, graph.width / 2, graph.height * 0.5)
    graph.textSize(graph.width / 5)
    graph.textAlign(CENTER, CENTER)
    graph.fill(255)
    graph.text(word, graph.width/2, graph.height*0.25)
    image(graph, width / 2, height / 2)
    pop()
    noiseY = map(noise(yoff), 0, 1, -10, 10)
    noiseX = map(noise(xoff), 0, 1, -5, 5)
    noiser()
    xoff += 0.00085
    yoff += 0.00025
}

function noiser() {
    let l1 = {
        maxH: zoneMax,
        minH: zoneMin,
        relief: 0.025,
        clr1: color(10),
        clr2: color(255),
        dens: height,
        factor: fac,
        sclX: sclXVal,
        sclY: 10 + noiseX,
    }
    push()
    // drawingContext.filter = 'contrast(1.4) drop-shadow(20px 20px 10px #000)';
    terrain(...Object.values(l1));
    pop()
}

function terrain(maxH, minH, relief, clr1, clr2, dens, factor, sclX, sclY) {
    // translate(-width / 2, -height / 2)
    for (let y = maxH; y < minH; y += sclY) {
        let row = [];
        let xoff = 0.01;
        row.push(createVector(0, y));
        for (let x = 0; x < width + sclX; x += sclX) {
            strokeWeight(0.25)
            let n = noise(x * relief, y * relief);
            let ampli = map(y, 0, height, factor, 0) * dens;
            let off = y + map(n, 0, 1, -ampli, ampli)
            row.push(createVector(x, off));
        }
        row.push(createVector(width, height));
        row.push(createVector(0, height));
        let lvl = map(y, maxH, height, 0, 1.5);
        let c = lerpColor(color(clr1), color(clr2), lvl);
        noFill()
        stroke(c)
        // fill(c)
        beginShape();
        for (let v of row) {

            vertex(v.x, v.y);
        }
        endShape(CLOSE);
    }
}

function mousePressed() {
    clear();
    background(255);
    setup()
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}