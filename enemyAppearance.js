class EnemyAppearance {
    constructor(enemy) {
        this.enemy = enemy;
    }

display() {
    push();

    translate(
        this.enemy.x - cameraX,
        this.enemy.y - cameraY
    );
    scale(this.enemy.spawnScale);

    switch (this.enemy.enemyCode) {
        case "BT":
            this.drawBeetle();
            break;
        case "RC":
            this.drawRoach();
            break;
        case "WS":
            this.drawWaterStrider();
            break;
    }

    pop();
}


drawWaterStrider() {

    //==============================
    // COLORS
    //==============================

    const bodyDark = color(28, 34, 43);
    const bodyMid = color(48, 57, 69);
    const bodyLight = color(72, 84, 98);

    const legDark = color(24, 28, 34);
    const legLight = color(58, 66, 76);

    const corruptionDark = color(105, 13, 111);
    const corruptionBright = color(255, 47, 222);

    const corruptionPulse = map(Math.sin(frameCount * 0.06), -1, 1, 0, 1);
    const corruptionGlow = lerpColor(corruptionDark, corruptionBright, corruptionPulse);

    //==============================
    // LEG MOTION
    //==============================

   const frontFlitter = Math.sin(frameCount * 0.18) * 2;
const middleFlitter = Math.sin(frameCount * 0.22 + 1.2) * 2;
const rearFlitter = Math.sin(frameCount * 0.20 + 2.4) * 2;

    //==============================
    // SHADOW
    //==============================

    noStroke();
    fill(0, 20);
    ellipse(0, 8, 28, 7);

    //==============================
    // LONG SPINDLY LEGS
    //==============================

    stroke(legDark);
    strokeWeight(2);
    strokeCap(ROUND);

    // Front left
    line(-7, -8, -22, -20 + frontFlitter);
    line(-22, -20 + frontFlitter, -37, -25 - frontFlitter);

    // Middle left
    line(-9, 0, -27, 0 + middleFlitter);
    line(-27, 0 + middleFlitter, -43, 5 - middleFlitter);

    // Rear left
    line(-6, 8, -20, 20 + rearFlitter);
    line(-20, 20 + rearFlitter, -34, 27 - rearFlitter);

    // Front right
    line(7, -8, 22, -20 - frontFlitter);
    line(22, -20 - frontFlitter, 37, -25 + frontFlitter);

    // Middle right
    line(9, 0, 27, 0 - middleFlitter);
    line(27, 0 - middleFlitter, 43, 5 + middleFlitter);

    // Rear right
    line(6, 8, 20, 20 - rearFlitter);
    line(20, 20 - rearFlitter, 34, 27 + rearFlitter);

    // Tiny leg highlights
    stroke(legLight);
    strokeWeight(1);

    line(-22, -20 + frontFlitter, -28, -22);
    line(-27, middleFlitter, -33, 2);
    line(-20, 20 + rearFlitter, -26, 23);

    line(22, -20 - frontFlitter, 28, -22);
    line(27, -middleFlitter, 33, 2);
    line(20, 20 - rearFlitter, 26, 23);

    noStroke();

    //==============================
    // ANGULAR BODY
    //==============================

    fill(bodyDark);

    beginShape();
    vertex(0, -20);
    vertex(9, -10);
    vertex(11, 0);
    vertex(7, 12);
    vertex(0, 20);
    vertex(-7, 12);
    vertex(-11, 0);
    vertex(-9, -10);
    endShape(CLOSE);

    //==============================
    // UPPER BODY PLATE
    //==============================

    fill(bodyMid);

    beginShape();
    vertex(0, -17);
    vertex(7, -9);
    vertex(8, -2);
    vertex(0, 3);
    vertex(-8, -2);
    vertex(-7, -9);
    endShape(CLOSE);

    //==============================
    // LOWER BODY PLATE
    //==============================

    fill(bodyMid);

    beginShape();
    vertex(0, 3);
    vertex(7, 7);
    vertex(5, 13);
    vertex(0, 17);
    vertex(-5, 13);
    vertex(-7, 7);
    endShape(CLOSE);

    //==============================
    // CENTER RIDGE
    //==============================

    fill(bodyLight);

    beginShape();
    vertex(0, -15);
    vertex(3, -7);
    vertex(2, 10);
    vertex(0, 15);
    vertex(-2, 10);
    vertex(-3, -7);
    endShape(CLOSE);

    //==============================
    // CORRUPTION CRACKS
    // Body only
    //==============================

    stroke(corruptionGlow);
    strokeWeight(map(corruptionPulse, 0, 1, 1, 2));
    noFill();

    beginShape();
    vertex(-4, -12);
    vertex(0, -7);
    vertex(-3, -2);
    vertex(2, 3);
    endShape();

    line(-1, -6, 5, -9);

    beginShape();
    vertex(3, 5);
    vertex(-1, 9);
    vertex(2, 14);
    endShape();

    line(0, 9, -5, 12);

    noStroke();
}

drawRoach() {

    //==============================
    // COLORS
    //==============================

    const shellDark = color(43, 29, 24);
    const shellMid = color(72, 48, 36);
    const shellLight = color(98, 67, 49);

    const legDark = color(30, 22, 20);
    const legMid = color(58, 41, 34);

    const corruptionDark = color(105, 13, 111);
    const corruptionBright = color(255, 47, 222);

    const corruptionPulse = map(Math.sin(frameCount * 0.05), -1, 1, 0, 1);
    const corruptionGlow = lerpColor(corruptionDark, corruptionBright, corruptionPulse);

    //==============================
    // LEG FLITTER
    //==============================

    const legFlitter = Math.sin(frameCount * 0.5) * 2.5;

    //==============================
    // ANTENNA TWITCH
    //==============================

    const antennaTwitch = Math.sin(frameCount * 0.12) * 2;

    //==============================
    // SHADOW
    //==============================

    noStroke();
    fill(0, 25);
    ellipse(0, 12, 40, 10);

    //==============================
// ANTENNAE
//==============================

stroke(legDark);
strokeWeight(2);
noFill();

line(-6, -30, -16 + antennaTwitch, -43);
line(-16 + antennaTwitch, -43, -28 + antennaTwitch, -51);

line(6, -30, 16 - antennaTwitch, -43);
line(16 - antennaTwitch, -43, 28 - antennaTwitch, -51);

   //==============================
// LEGS
//==============================

stroke(legDark);
strokeWeight(3);
strokeCap(ROUND);

// Upper left.
line(-13, -16, -23, -21 + legFlitter);
line(-23, -21 + legFlitter, -30, -17 - legFlitter);

// Middle left.
line(-16, 0, -27, -1 - legFlitter);
line(-27, -1 - legFlitter, -33, 4 + legFlitter);

// Lower left.
line(-13, 16, -23, 22 + legFlitter);
line(-23, 22 + legFlitter, -30, 27 - legFlitter);

// Upper right.
line(13, -16, 23, -21 - legFlitter);
line(23, -21 - legFlitter, 30, -17 + legFlitter);

// Middle right.
line(16, 0, 27, -1 + legFlitter);
line(27, -1 + legFlitter, 33, 4 - legFlitter);

// Lower right.
line(13, 16, 23, 22 - legFlitter);
line(23, 22 - legFlitter, 30, 27 + legFlitter);

    //==============================
// MAIN BODY
//==============================

fill(shellDark);

beginShape();
vertex(0, -31);
vertex(8, -29);
vertex(14, -23);
vertex(17, -13);
vertex(18, 0);
vertex(17, 13);
vertex(13, 24);
vertex(7, 31);
vertex(0, 34);
vertex(-7, 31);
vertex(-13, 24);
vertex(-17, 13);
vertex(-18, 0);
vertex(-17, -13);
vertex(-14, -23);
vertex(-8, -29);
endShape(CLOSE);

//==============================
// SEGMENTED SHELL
//==============================

// Upper thorax plate
fill(shellLight);

beginShape();
vertex(-13, -22);
vertex(13, -22);
vertex(16, -15);
vertex(14, -9);
vertex(-14, -9);
vertex(-16, -15);
endShape(CLOSE);

// First abdominal plate
fill(shellMid);

beginShape();
vertex(-14, -7);
vertex(14, -7);
vertex(16, -1);
vertex(15, 5);
vertex(-15, 5);
vertex(-16, -1);
endShape(CLOSE);

// Second abdominal plate
fill(shellLight);

beginShape();
vertex(-15, 7);
vertex(15, 7);
vertex(14, 13);
vertex(12, 17);
vertex(-12, 17);
vertex(-14, 13);
endShape(CLOSE);

// Third abdominal plate
fill(shellMid);

beginShape();
vertex(-11, 19);
vertex(11, 19);
vertex(9, 25);
vertex(5, 30);
vertex(-5, 30);
vertex(-9, 25);
endShape(CLOSE);

// Small rear plate
fill(shellLight);

beginShape();
vertex(-5, 30);
vertex(5, 30);
vertex(0, 34);
endShape(CLOSE);

//==============================
// HEAD
//==============================

fill(legDark);

beginShape();
vertex(-8, -29);
vertex(-5, -35);
vertex(0, -38);
vertex(5, -35);
vertex(8, -29);
vertex(7, -24);
vertex(-7, -24);
endShape(CLOSE);

    

    //==============================
    // CORRUPTION CRACKS
    //==============================

    stroke(corruptionGlow);
    strokeWeight(map(corruptionPulse, 0, 1, 1, 2));
    noFill();

    // Upper left crack.
    beginShape();
    vertex(-11, -13);
    vertex(-7, -8);
    vertex(-10, -3);
    vertex(-5, 2);
    endShape();

    line(-8, -7, -14, -4);

    // Upper right crack.
    beginShape();
    vertex(9, -15);
    vertex(6, -9);
    vertex(11, -4);
    vertex(7, 1);
    endShape();

    line(9, -6, 15, -2);

    // Lower center crack.
    beginShape();
    vertex(-2, 5);
    vertex(3, 9);
    vertex(0, 14);
    vertex(4, 19);
    endShape();

    line(1, 11, -4, 15);

    noStroke();
}


drawBeetle(){
 //==============================
    // COLORS
    //==============================

    const shellDark = color(30, 25, 35);
    const shellMid = color(54, 42, 61);
    const shellLight = color(76, 57, 79);

    const legDark = color(25, 20, 29);
    const legMid = color(48, 36, 52);

    const corruptionDark = color(105, 13, 111);
    const corruptionBright = color(255, 47, 222);

    const corruptionPulse = map(Math.sin(frameCount * 0.045), -1, 1, 0, 1);
    const corruptionGlow = lerpColor(corruptionDark, corruptionBright, corruptionPulse);

    //==============================
    // LEG FLITTER
    //==============================

    const legFlitter = Math.sin(frameCount * 0.35) * 2;

    //==============================
    // SHADOW
    //==============================

    noStroke();
    fill(0, 30);
    ellipse(0, 15, 52, 15);

    //==============================
    // BACK LEGS
    //==============================

    stroke(legDark);
    strokeWeight(5);
    strokeCap(ROUND);

    // Upper left leg.
    line(-17, -7, -29, -15 + legFlitter);
    line(-29, -15 + legFlitter, -36, -11 - legFlitter);

    // Middle left leg.
    line(-20, 1, -32, 1 - legFlitter);
    line(-32, 1 - legFlitter, -39, 5 + legFlitter);

    // Lower left leg.
    line(-16, 9, -28, 16 + legFlitter);
    line(-28, 16 + legFlitter, -34, 22 - legFlitter);

    // Upper right leg.
    line(17, -7, 29, -15 - legFlitter);
    line(29, -15 - legFlitter, 36, -11 + legFlitter);

    // Middle right leg.
    line(20, 1, 32, 1 + legFlitter);
    line(32, 1 + legFlitter, 39, 5 - legFlitter);

    // Lower right leg.
    line(16, 9, 28, 16 - legFlitter);
    line(28, 16 - legFlitter, 34, 22 + legFlitter);

    // Small lighter joints.
    stroke(legMid);
    strokeWeight(2);

    point(-29, -15 + legFlitter);
    point(-32, 1 - legFlitter);
    point(-28, 16 + legFlitter);

    point(29, -15 - legFlitter);
    point(32, 1 + legFlitter);
    point(28, 16 - legFlitter);

    noStroke();

    //==============================
    // ABDOMEN / MAIN CARAPACE
    //==============================

    fill(shellDark);

    beginShape();
    vertex(0, -22);
    vertex(14, -20);
    vertex(24, -13);
    vertex(28, -2);
    vertex(25, 12);
    vertex(17, 21);
    vertex(0, 25);
    vertex(-17, 21);
    vertex(-25, 12);
    vertex(-28, -2);
    vertex(-24, -13);
    vertex(-14, -20);
    endShape(CLOSE);

    //==============================
    // CARAPACE SIDE PANELS
    //==============================

    fill(shellMid);

    // Left shell plate.
    beginShape();
    vertex(-2, -18);
    vertex(-14, -17);
    vertex(-22, -10);
    vertex(-24, 1);
    vertex(-19, 13);
    vertex(-8, 19);
    vertex(-3, 12);
    endShape(CLOSE);

    // Right shell plate.
    beginShape();
    vertex(2, -18);
    vertex(14, -17);
    vertex(22, -10);
    vertex(24, 1);
    vertex(19, 13);
    vertex(8, 19);
    vertex(3, 12);
    endShape(CLOSE);

    //==============================
    // CENTER SHELL RIDGE
    //==============================

    fill(shellLight);

    beginShape();
    vertex(0, -19);
    vertex(5, -13);
    vertex(4, 13);
    vertex(0, 20);
    vertex(-4, 13);
    vertex(-5, -13);
    endShape(CLOSE);

    //==============================
    // SMALL TUCKED HEAD
    //==============================

    fill(legDark);

    beginShape();
    vertex(-11, -20);
    vertex(-7, -27);
    vertex(0, -30);
    vertex(7, -27);
    vertex(11, -20);
    vertex(7, -15);
    vertex(-7, -15);
    endShape(CLOSE);

    //==============================
    // SHORT MANDIBLES
    //==============================

    stroke(legDark);
    strokeWeight(3);

    line(-5, -26, -10, -32);
    line(5, -26, 10, -32);

    noStroke();

    //==============================
    // SHELL EDGE HIGHLIGHTS
    //==============================

    stroke(shellLight);
    strokeWeight(1);

    line(-21, -10, -24, 1);
    line(21, -10, 24, 1);

    noStroke();

    //==============================
    // CORRUPTION CRACKS
    //==============================

    stroke(corruptionGlow);
    strokeWeight(map(corruptionPulse, 0, 1, 1, 2));
    noFill();

    // Left crack.
    beginShape();
    vertex(-16, -12);
    vertex(-11, -7);
    vertex(-14, -1);
    vertex(-8, 5);
    vertex(-10, 12);
    endShape();

    // Left branch.
    line(-12, -4, -18, 1);

    // Right crack.
    beginShape();
    vertex(11, -15);
    vertex(8, -8);
    vertex(13, -3);
    vertex(9, 4);
    vertex(14, 10);
    endShape();

    // Right branch.
    line(11, -2, 18, 2);

    // Rear fracture.
    beginShape();
    vertex(-2, 10);
    vertex(2, 14);
    vertex(0, 20);
    endShape();

    noStroke();


    
    
}


}