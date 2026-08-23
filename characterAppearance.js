class CharacterAppearance {

    constructor(character) {
        this.character = character;
    }

    display() {
    push();

    translate(
        screenX(this.character.x),
        screenY(this.character.y)
    );
    

    switch (this.character.classCode) {
        case "GR":
            this.drawGhostrunner();
            break;

        case "FB":
            // temporary
            this.drawForgeborn();
            break;

        case "EL":
            // temporary
            this.drawEverlight();
            break;

        case "HC":
            // temporary
            this.drawHexcaster();
            break;

        case "LU":
            // temporary
            this.drawLuminary();
            break;

        case "WF":
            // temporary
            this.drawWayfinder();
            break;

        default:
            this.drawGhostrunner();
    }

    pop();
}   drawWayfinder() {
        push();
        noStroke();

        //==============================
        // COLOR PALETTE
        //==============================

        const forestDark = color(32, 55, 39);
        const forest = color(46, 78, 52);
        const forestLight = color(70, 102, 69);

        const brassDark = color(111, 76, 28);
        const brass = color(174, 124, 46);
        const brassLight = color(220, 175, 80);

        const leatherDark = color(57, 42, 30);
        const leather = color(88, 61, 39);
        const leatherLight = color(121, 84, 50);

        const clothDark = color(72, 70, 64);
        const clothLight = color(187, 177, 154);

        const skin = color(205, 160, 128);
        const skinShadow = color(163, 118, 91);

        const hairDark = color(48, 34, 25);
        const hair = color(76, 50, 31);
        const hairLight = color(109, 74, 42);

        const lanternGlow = color(236, 181, 65);

        //==============================
        // SHADOW
        //==============================

        fill(0, 24);
        ellipse(0, 34, 40, 10);



        //==============================
        // COAT TAILS / LOWER BODY
        //==============================

        // Dark underbody.
        fill(leatherDark);

        beginShape();
        vertex(-13, 7);
        vertex(13, 7);
        vertex(15, 29);
        vertex(8, 39);
        vertex(0, 43);
        vertex(-8, 39);
        vertex(-15, 29);
        endShape(CLOSE);

        // Viewer-left green coat panel.
        fill(forestDark);

        beginShape();
        vertex(-13, 7);
        vertex(-5, 10);
        vertex(-6, 34);
        vertex(-13, 39);
        vertex(-17, 28);
        endShape(CLOSE);

        fill(forest);

        beginShape();
        vertex(-11, 9);
        vertex(-6, 11);
        vertex(-7, 31);
        vertex(-12, 36);
        vertex(-14, 27);
        endShape(CLOSE);

        // Viewer-right coat panel.
        fill(forestDark);

        beginShape();
        vertex(13, 7);
        vertex(5, 10);
        vertex(6, 34);
        vertex(13, 39);
        vertex(17, 28);
        endShape(CLOSE);

        fill(forest);

        beginShape();
        vertex(11, 9);
        vertex(6, 11);
        vertex(7, 31);
        vertex(12, 36);
        vertex(14, 27);
        endShape(CLOSE);

        // Brass coat edging.
        stroke(brass);
        strokeWeight(1);

        line(-6, 11, -7, 31);
        line(6, 11, 7, 31);

        noStroke();

        //==============================
        // TORSO / LEATHER ARMOR
        //==============================

        fill(leatherDark);

        beginShape();
        vertex(-13, -10);
        vertex(13, -10);
        vertex(17, 5);
        vertex(12, 18);
        vertex(-12, 18);
        vertex(-17, 5);
        endShape(CLOSE);

        fill(leather);

        beginShape();
        vertex(-10, -8);
        vertex(10, -8);
        vertex(13, 5);
        vertex(9, 16);
        vertex(-9, 16);
        vertex(-13, 5);
        endShape(CLOSE);

        // Cross-body strap.
        stroke(leatherLight);
        strokeWeight(4);
        line(-8, -9, 9, 15);

        stroke(brassDark);
        strokeWeight(1);
        line(-8, -9, 9, 15);

        noStroke();

        // Small strap buckle.
        fill(brass);
        rectMode(CENTER);
        rect(0, 3, 5, 5);

        fill(leatherDark);
        rect(0, 3, 2, 2);

        //==============================
        // SHOULDERS / GREEN COAT
        //==============================

        fill(forestDark);

        // Viewer-left shoulder.
        beginShape();
        vertex(-11, -12);
        vertex(-19, -11);
        vertex(-23, -6);
        vertex(-20, 0);
        vertex(-13, -3);
        endShape(CLOSE);

        // Viewer-right shoulder.
        beginShape();
        vertex(11, -12);
        vertex(19, -11);
        vertex(23, -6);
        vertex(20, 0);
        vertex(13, -3);
        endShape(CLOSE);

        fill(forest);

        beginShape();
        vertex(-12, -11);
        vertex(-18, -10);
        vertex(-21, -7);
        vertex(-18, -5);
        vertex(-12, -6);
        endShape(CLOSE);

        beginShape();
        vertex(12, -11);
        vertex(18, -10);
        vertex(21, -7);
        vertex(18, -5);
        vertex(12, -6);
        endShape(CLOSE);

        // Brass trim on shoulders.
        stroke(brass);
        strokeWeight(1);

        line(-18, -10, -21, -7);
        line(18, -10, 21, -7);

        noStroke();

        //==============================
        // ARMS
        //==============================

        //------------------------------
        // VIEWER-LEFT ARM
        // Her RIGHT arm
        // Wrist crossbow arm
        //------------------------------

        fill(forestDark);

        beginShape();
        vertex(-18, -4);
        vertex(-23, 0);
        vertex(-25, 11);
        vertex(-21, 20);
        vertex(-16, 15);
        vertex(-15, 4);
        endShape(CLOSE);

        // Leather forearm bracer.
        fill(leatherDark);

        beginShape();
        vertex(-24, 8);
        vertex(-27, 12);
        vertex(-25, 20);
        vertex(-20, 22);
        vertex(-17, 17);
        vertex(-19, 10);
        endShape(CLOSE);

        //------------------------------
        // WRIST CROSSBOW
        //------------------------------

        // Main crossbow body.
        fill(brassDark);
        rectMode(CENTER);
        rect(-22, 13, 5, 13);

        fill(brass);
        rect(-22, 10, 3, 8);

        // Crossbow limbs.
        stroke(brass);
        strokeWeight(2);

        line(-28, 9, -22, 12);
        line(-16, 9, -22, 12);

        // Bowstring.
        stroke(clothLight);
        strokeWeight(1);

        line(-28, 9, -22, 7);
        line(-16, 9, -22, 7);

        noStroke();

        // Small bolt.
        fill(brassLight);

        beginShape();
        vertex(-22, 4);
        vertex(-20, 8);
        vertex(-24, 8);
        endShape(CLOSE);

        // Crossbow hand.
        fill(skin);
        ellipse(-22, 21, 7, 8);

        //------------------------------
        // VIEWER-RIGHT ARM
        // Her LEFT arm
        //------------------------------

        fill(forestDark);

        beginShape();
        vertex(18, -4);
        vertex(23, 1);
        vertex(24, 11);
        vertex(21, 19);
        vertex(16, 15);
        vertex(15, 4);
        endShape(CLOSE);

        fill(leatherDark);

        beginShape();
        vertex(22, 8);
        vertex(26, 11);
        vertex(25, 18);
        vertex(21, 22);
        vertex(17, 18);
        vertex(19, 10);
        endShape(CLOSE);

        // Whip handle.
        stroke(leatherDark);
        strokeWeight(5);
        line(21, 18, 28, 25);

        stroke(brassDark);
        strokeWeight(2);
        line(21, 18, 28, 25);

        noStroke();

        //==============================
        // WHIP
        // Coiled in hand with loose end hanging down
        // Viewer-right side
        //==============================

        //--------------------------------
        // WHIP HANDLE
        //--------------------------------

        stroke(leatherDark);
        strokeWeight(5);

        // Short handle angled slightly down/right from hand.
        line(21, 19, 25, 23);

        stroke(brassDark);
        strokeWeight(2);
        line(21, 19, 25, 23);

        noStroke();

        // Brass end cap on handle.
        fill(brass);
        ellipse(25, 23, 4, 4);


        //--------------------------------
        // COILED WHIP
        // Shifted left so it sits in her hand.
        //--------------------------------

        noFill();

        // Dark outer stroke.
        stroke(leatherDark);
        strokeWeight(4);

        ellipse(25, 23, 15, 11);
        ellipse(26, 25, 13, 10);
        ellipse(25, 28, 11, 8);

        // Main leather color.
        stroke(leather);
        strokeWeight(2);

        ellipse(25, 23, 15, 11);
        ellipse(26, 25, 13, 10);
        ellipse(25, 28, 11, 8);

        noStroke();


        //--------------------------------
        // BRASS BANDS ON COILS
        //--------------------------------

        fill(brass);
        rectMode(CENTER);

        rect(19, 23, 3, 2);
        rect(30, 22, 3, 2);
        rect(21, 28, 3, 2);
        rect(29, 28, 3, 2);


        //--------------------------------
        // LOOSE WHIP SECTION
        // Hangs downward from coil.
        //--------------------------------
let whipSwing = Math.sin(frameCount * 0.045) * 1.5;
        noFill();

        // Dark outline.
        stroke(leatherDark);
        strokeWeight(3);

        bezier(
    29, 30,
    33 + whipSwing * 0.25, 36,
    30 + whipSwing * 0.6, 43,
    24 + whipSwing, 47
);

        // Main leather core.
        stroke(leather);
        strokeWeight(1.5);

      bezier(
    29, 30,
    33 + whipSwing * 0.25, 36,
    30 + whipSwing * 0.6, 43,
    24 + whipSwing, 47
);

        noStroke();


        //--------------------------------
        // BRASS BANDS ON LOOSE SECTION
        //--------------------------------

        fill(brass);

       ellipse(31 + whipSwing * 0.2, 34, 3, 3);
ellipse(31 + whipSwing * 0.45, 39, 3, 3);
ellipse(28 + whipSwing * 0.75, 44, 3, 3);


        //--------------------------------
        // WHIP TIP / BARB
        //--------------------------------

      fill(brassDark);

beginShape();
vertex(22 + whipSwing, 45);
vertex(17 + whipSwing, 51);
vertex(22 + whipSwing, 49);
vertex(25 + whipSwing, 52);
vertex(24 + whipSwing, 48);
vertex(26 + whipSwing, 46);
endShape(CLOSE);

fill(brass);

beginShape();
vertex(22 + whipSwing, 46);
vertex(18 + whipSwing, 50);
vertex(22 + whipSwing,48);
vertex(24 + whipSwing, 50);
vertex(23 + whipSwing, 47);
endShape(CLOSE);


        //==============================
        // WHIP HAND
        // Draw over handle and coil
        //==============================

        fill(skin);
        ellipse(21, 20, 7, 8);

        //==============================
        // BELT
        //==============================

        fill(leatherDark);
        rectMode(CENTER);
        rect(0, 15, 27, 4);

        fill(brass);
        rect(-3, 15, 5, 5);

        // Small hanging pouch.
        fill(leather);
        rect(8, 20, 6, 8);

        fill(brassDark);
        rect(8, 17, 5, 2);

       //==============================
// SMALL BELT LANTERN
// Bigger aura + stronger window flicker
//==============================

// Irregular flicker values.
let flicker = noise(frameCount * 0.18);
let windowFlicker = noise(frameCount * 0.37 + 100);
let coreFlicker = noise(frameCount * 0.53 + 250);

let glowStrength = map(flicker, 0, 1, 0.65, 1.0);
let glowSize = map(flicker, 0, 1, 12, 18);
let windowStrength = map(windowFlicker, 0, 1, 0.45, 1.0);
let coreStrength = map(coreFlicker, 0, 1, 0.55, 1.0);

// Large soft aura.
fill(255, 190, 60, 50 * glowStrength);
ellipse(2, 26, glowSize, glowSize);

// Smaller brighter inner aura.
fill(255, 205, 75, 65 * glowStrength);
ellipse(2, 26, glowSize * 0.6, glowSize * 0.6);

// Hanging hook.
stroke(brassDark);
strokeWeight(1);
line(2, 17, 2, 23);
noStroke();

// Lantern frame.
fill(brassDark);
rectMode(CENTER);
rect(2, 26, 6, 8);

// Flickering window.
let windowGreen = 145 + 90 * windowStrength;
fill(255, windowGreen, 35);
rect(2, 26, 3, 4);

// Hot center — independent flicker.
fill(255, 225 + 30 * coreStrength, 120, 150 + 100 * coreStrength);
rect(2, 26, 1.5, 2);

// Tiny white-hot center.
fill(255, 250, 200, 120 * coreStrength);
rect(2, 26, 1, 1);

// Lantern cap / base.
fill(brass);
rect(2, 22, 5, 2);
rect(2, 30, 5, 2);

        //==============================
        // UNDER-HOOD / NECK FILL
        //==============================

        fill(forestDark);

        beginShape();

        // High behind jaw.
        vertex(-8, -18);
        vertex(8, -18);

        // Flare outward.
        vertex(11, -14);
        vertex(14, -9);

        // Meet torso / shoulders.
        vertex(15, -5);
        vertex(-15, -5);
        vertex(-14, -9);
        vertex(-11, -14);

        endShape(CLOSE);


        //==============================
        // HOOD INTERIOR SHADOW
        // Viewer-right of chin
        // Creates empty recessed space
        //==============================

        fill(32, 32, 30);   // very dark warm gray

        beginShape();

        // Starts underneath right side of jaw.
        vertex(5, -18);
        vertex(9, -17);

        // Follow the opening toward hood.
        vertex(12, -14);
        vertex(13, -10);

        // Bottom disappears into collar/chest.
        vertex(11, -6);
        vertex(6, -6);

        // Tucks back beneath chin.
        vertex(7, -11);

        endShape(CLOSE);

        //==============================
        // BRAID TAIL
        // Comes FORWARD over viewer-left shoulder
        //==============================
        push();
        translate(4, 0);
        fill(hairDark);

        ellipse(-11, -14, 5, 7);
        ellipse(-12, -9, 5, 7);
        ellipse(-13, -4, 5, 7);
        ellipse(-14, 1, 4, 6);
        ellipse(-15, 6, 4, 6);

        fill(hairLight);

        ellipse(-10, -15, 2, 3);
        ellipse(-11, -10, 2, 3);
        ellipse(-12, -5, 2, 3);
        ellipse(-13, 0, 2, 3);
        ellipse(-14, 5, 2, 3);

        // Braid tie.
        fill(brass);
        rectMode(CENTER);
        rect(-15, 10, 3, 2);
        pop();

        //==============================
        // HEAD / FACE
        //==============================

        fill(skin);

        beginShape();
        vertex(-9, -26);
        vertex(-6, -32);
        vertex(0, -35);
        vertex(6, -32);
        vertex(9, -26);
        vertex(8, -17);
        vertex(4, -13);
        vertex(-4, -13);
        vertex(-8, -17);
        endShape(CLOSE);

        // Face shadow.
        fill(skinShadow);

        beginShape();
        vertex(5, -30);
        vertex(8, -25);
        vertex(7, -18);
        vertex(3, -14);
        vertex(1, -15);
        vertex(3, -21);
        endShape(CLOSE);

        //==============================
        // HAIR
        //==============================

        fill(hairDark);

        beginShape();
        vertex(-10, -29);
        vertex(-6, -36);
        vertex(0, -38);
        vertex(7, -34);
        vertex(10, -29);
        vertex(7, -31);
        vertex(4, -28);
        vertex(1, -32);
        vertex(-3, -29);
        vertex(-6, -27);
        endShape(CLOSE);

        fill(hair);

        beginShape();
        vertex(-6, -34);
        vertex(-1, -37);
        vertex(5, -34);
        vertex(2, -32);
        vertex(-2, -34);
        endShape(CLOSE);

        //==============================
        // HOOD
        // More open / flowing ranger hood
        // Draw AFTER head + hair
        // Draw BEFORE braid tail
        //==============================

        fill(forestDark);

        beginShape();

        vertex(0, -38);

        vertex(5, -37);
        vertex(9, -34);
        vertex(12, -29);

        vertex(13, -23);
        vertex(13, -17);

        vertex(11, -13);
        vertex(9, -12);

        // Inner right edge.
        vertex(8, -17);
        vertex(8, -23);
        vertex(7, -27);

        vertex(4, -30);
        vertex(1, -32);

        vertex(0, -31);

        vertex(-2, -32);
        vertex(-5, -30);
        vertex(-7, -27);

        vertex(-8, -23);
        vertex(-8, -17);

        // More room on braid side.
        vertex(-8, -12);

        vertex(-11, -13);
        vertex(-13, -17);
        vertex(-13, -23);

        vertex(-12, -29);
        vertex(-9, -34);
        vertex(-5, -37);

        endShape(CLOSE);


        //==============================
        // GOLD INNER TRIM
        // Follows face opening rather than
        // outlining entire hood.
        //==============================

        stroke(brass);
        strokeWeight(2);
        noFill();


        // Viewer-right trim.
        beginShape();

        vertex(0, -35);
        vertex(4, -33);
        vertex(7, -29);
        vertex(9, -24);
        vertex(10, -18);
        vertex(9, -13);

        endShape();


        // Viewer-left trim.
        beginShape();

        vertex(0, -35);
        vertex(-4, -33);
        vertex(-7, -29);
        vertex(-9, -24);
        vertex(-10, -18);
        vertex(-9, -13);

        endShape();

        noStroke();


        //==============================
        // TOP GOLD ACCENT
        //==============================

        fill(brassLight);

        beginShape();

        vertex(0, -40);
        vertex(2, -37);
        vertex(0, -34);
        vertex(-2, -37);

        endShape(CLOSE);





        //==============================
        // HOOD FOLD SHADOWS
        // Helps sides look like hanging cloth
        //==============================

        stroke(forestDark);
        strokeWeight(1);

        // Viewer-left fold.
        line(-11, -25, -13, -18);
        line(-13, -18, -11, -12);

        // Viewer-right fold.
        line(11, -25, 13, -18);
        line(13, -18, 11, -12);

        noStroke();

        //==============================
        // EYES
        //==============================

        fill(42, 38, 32);

        // Viewer-left eye.
        beginShape();
        vertex(-6, -23);
        vertex(-3, -24);
        vertex(-1, -23);
        vertex(-3, -22);
        endShape(CLOSE);

        // Viewer-right eye.
        beginShape();
        vertex(6, -23);
        vertex(3, -24);
        vertex(1, -23);
        vertex(3, -22);
        endShape(CLOSE);

        // Stronger brows.
        stroke(hairDark);
        strokeWeight(1);

        line(-6, -26, -2, -25);
        line(6, -26, 2, -25);

        noStroke();

        // Nose.
        fill(skinShadow);

        beginShape();
        vertex(0, -21);
        vertex(-1, -17);
        vertex(1, -17);
        endShape(CLOSE);

        pop();
    }

    drawLuminary() {
        push();
        noStroke();

        //==============================
        // COLOR PALETTE
        //==============================

        const sapphireDark = color(18, 47, 105);
        const sapphire = color(35, 83, 165);
        const sapphireLight = color(75, 125, 210);

        const saffronDark = color(142, 92, 20);
        const saffron = color(205, 145, 38);
        const saffronLight = color(239, 190, 74);

        const ivory = color(225, 222, 204);
        const ivoryShadow = color(185, 181, 163);

        const chainDark = color(72, 72, 76);
        const chainLight = color(130, 130, 132);

        const leatherDark = color(70, 48, 30);
        const leatherMid = color(105, 72, 39);

        const skin = color(211, 170, 136);
        const skinShadow = color(169, 127, 99);

        const hairDark = color(49, 38, 31);
        const hairMid = color(79, 59, 42);

        //==============================
        // SHADOW
        //==============================

        fill(0, 24);
        ellipse(0, 34, 38, 10);

        //==============================
        // SHIELD BEHIND BODY
        // Centered on back
        // Wider + raised for visibility
        //==============================

        push();

        // Centered on character.
        // Raised 5 pixels from previous position.
        translate(0, -7);


        //------------------------------
        // OUTER GOLD SHIELD
        //------------------------------

        fill(saffronDark);

        beginShape();

        // Top center
        vertex(0, -25);

        // Upper right
        vertex(14, -21);
        vertex(19, -13);
        vertex(20, 4);

        // Lower right
        vertex(15, 18);
        vertex(8, 29);

        // Bottom point
        vertex(0, 35);

        // Mirror left side
        vertex(-8, 29);
        vertex(-15, 18);
        vertex(-20, 4);
        vertex(-19, -13);
        vertex(-14, -21);

        endShape(CLOSE);


        //------------------------------
        // INNER DARK SHIELD FACE
        // Enlarged so gold reads as a rim
        // rather than a large gold surface.
        //------------------------------

        fill(leatherDark);

        beginShape();

        // Top
        vertex(0, -22);

        // Upper right
        vertex(12, -19);
        vertex(16, -11);
        vertex(17, 3);

        // Lower right
        vertex(13, 16);
        vertex(7, 26);

        // Bottom
        vertex(0, 31);

        // Mirror left side
        vertex(-7, 26);
        vertex(-13, 16);
        vertex(-17, 3);
        vertex(-16, -11);
        vertex(-12, -19);

        endShape(CLOSE);


        //------------------------------
        // INNER GOLD RIM
        //------------------------------

        stroke(saffron);
        strokeWeight(1);
        noFill();

        beginShape();

        vertex(0, -22);

        vertex(12, -19);
        vertex(16, -11);
        vertex(17, 3);

        vertex(13, 16);
        vertex(7, 26);

        vertex(0, 31);

        vertex(-7, 26);
        vertex(-13, 16);
        vertex(-17, 3);

        vertex(-16, -11);
        vertex(-12, -19);

        endShape(CLOSE);

        noStroke();


        //------------------------------
        // CENTRAL EMBLEM
        // Mostly hidden by character,
        // but still part of shield design.
        //------------------------------

        fill(saffron);

        beginShape();

        vertex(0, -5);

        vertex(2, 1);
        vertex(7, 3);

        vertex(2, 5);
        vertex(0, 12);

        vertex(-2, 5);
        vertex(-7, 3);
        vertex(-2, 1);

        endShape(CLOSE);


        pop();

        //==============================
        // LOWER BODY / TABARD
        //==============================

        fill(ivoryShadow);

        beginShape();
        vertex(-12, 8);
        vertex(12, 8);
        vertex(15, 30);
        vertex(8, 40);
        vertex(0, 44);
        vertex(-8, 40);
        vertex(-15, 30);
        endShape(CLOSE);

        fill(ivory);

        beginShape();
        vertex(-9, 8);
        vertex(9, 8);
        vertex(11, 28);
        vertex(5, 38);
        vertex(0, 41);
        vertex(-5, 38);
        vertex(-11, 28);
        endShape(CLOSE);

        // Sapphire vertical tabard stripe.
        fill(sapphire);

        beginShape();
        vertex(-4, 9);
        vertex(4, 9);
        vertex(5, 34);
        vertex(0, 39);
        vertex(-5, 34);
        endShape(CLOSE);

        // Gold edging.
        stroke(saffron);
        strokeWeight(1);
        line(-5, 9, -6, 34);
        line(5, 9, 6, 34);
        noStroke();

        //==============================
        // TORSO
        //==============================

        fill(ivory);

        beginShape();
        vertex(-13, -10);
        vertex(13, -10);
        vertex(17, 4);
        vertex(12, 17);
        vertex(-12, 17);
        vertex(-17, 4);
        endShape(CLOSE);

        // Sapphire torso stripe.
        fill(sapphireDark);

        beginShape();
        vertex(-7, -9);
        vertex(0, -9);
        vertex(0, 16);
        vertex(-7, 16);
        endShape(CLOSE);

        fill(sapphire);

        beginShape();
        vertex(-6, -8);
        vertex(-2, -8);
        vertex(-2, 15);
        vertex(-6, 15);
        endShape(CLOSE);

        // Gold chest border.
        stroke(saffron);
        strokeWeight(1);
        line(-8, -9, -8, 16);
        noStroke();

        //==============================
        // CHAINMAIL SHOULDERS
        //==============================

        fill(chainDark);

        // Left chainmail.
        beginShape();
        vertex(-12, -11);
        vertex(-20, -7);
        vertex(-22, 4);
        vertex(-17, 11);
        vertex(-12, 5);
        endShape(CLOSE);

        // Right chainmail.
        beginShape();
        vertex(12, -11);
        vertex(20, -7);
        vertex(22, 4);
        vertex(17, 11);
        vertex(12, 5);
        endShape(CLOSE);

        // Chainmail highlights.
        stroke(chainLight);
        strokeWeight(1);

        line(-19, -5, -15, -3);
        line(-20, 0, -16, 2);
        line(19, -5, 15, -3);
        line(20, 0, 16, 2);

        noStroke();

        //==============================
        // GOLD SHOULDER/NECK ARMOR
        //==============================

        fill(saffronDark);

        beginShape();
        vertex(-12, -13);
        vertex(-21, -10);
        vertex(-23, -4);
        vertex(-18, 0);
        vertex(-11, -4);
        endShape(CLOSE);

        beginShape();
        vertex(12, -13);
        vertex(21, -10);
        vertex(23, -4);
        vertex(18, 0);
        vertex(11, -4);
        endShape(CLOSE);

        fill(saffron);

        beginShape();
        vertex(-13, -12);
        vertex(-20, -9);
        vertex(-21, -6);
        vertex(-16, -7);
        vertex(-11, -7);
        endShape(CLOSE);

        beginShape();
        vertex(13, -12);
        vertex(20, -9);
        vertex(21, -6);
        vertex(16, -7);
        vertex(11, -7);
        endShape(CLOSE);

        // Gold armored collar / gorget.
        fill(saffronDark);

        beginShape();
        vertex(-8, -11);
        vertex(-5, -14);
        vertex(0, -12);
        vertex(5, -14);
        vertex(8, -11);
        vertex(6, -7);
        vertex(0, -9);
        vertex(-6, -7);
        endShape(CLOSE);

        fill(saffron);

        beginShape();
        vertex(-7, -11);
        vertex(-4, -13);
        vertex(0, -11);
        vertex(4, -13);
        vertex(7, -11);
        vertex(5, -9);
        vertex(0, -10);
        vertex(-5, -9);
        endShape(CLOSE);


        //==============================
        // BELT
        //==============================

        fill(leatherDark);
        rectMode(CENTER);
        rect(0, 15, 25, 4);

        fill(saffron);
        rect(0, 15, 5, 5);

        //==============================
        // HEAD / FACE
        // Moved DOWN 4 pixels from original
        //==============================

        fill(skin);

        beginShape();
        vertex(-9, -25);
        vertex(-6, -31);
        vertex(0, -34);
        vertex(6, -31);
        vertex(9, -25);
        vertex(8, -16);
        vertex(4, -12);
        vertex(-4, -12);
        vertex(-8, -16);
        endShape(CLOSE);

        // Slight face shadow.
        fill(skinShadow);

        beginShape();
        vertex(5, -29);
        vertex(8, -24);
        vertex(7, -17);
        vertex(3, -13);
        vertex(1, -14);
        vertex(3, -20);
        endShape(CLOSE);

        //==============================
        // HAIR
        // Moved DOWN 4 pixels from original
        //==============================

        fill(hairDark);

        beginShape();
        vertex(-9, -29);
        vertex(-5, -35);
        vertex(1, -36);
        vertex(8, -32);
        vertex(10, -27);
        vertex(6, -30);
        vertex(3, -27);
        vertex(-2, -31);
        vertex(-5, -27);
        endShape(CLOSE);

        fill(hairMid);

        beginShape();
        vertex(-4, -33);
        vertex(1, -35);
        vertex(6, -32);
        vertex(3, -31);
        vertex(0, -32);
        endShape(CLOSE);

        //==============================
        // HEADBAND
        // Moved DOWN 4 pixels from original
        //==============================

        fill(ivory);

        beginShape();
        vertex(-9, -28);
        vertex(-5, -30);
        vertex(0, -29);
        vertex(5, -30);
        vertex(9, -28);
        vertex(8, -25);
        vertex(0, -26);
        vertex(-8, -25);
        endShape(CLOSE);

        fill(sapphire);
        rectMode(CENTER);
        rect(0, -27, 2, 4);

        //==============================
        // EYES
        // Moved DOWN 4 pixels from original
        //==============================

        fill(42, 39, 35);

        beginShape();
        vertex(-6, -22);
        vertex(-3, -23);
        vertex(-1, -22);
        vertex(-3, -21);
        endShape(CLOSE);

        beginShape();
        vertex(6, -22);
        vertex(3, -23);
        vertex(1, -22);
        vertex(3, -21);
        endShape(CLOSE);

        // Nose.
        fill(skinShadow);

        beginShape();
        vertex(0, -20);
        vertex(-1, -16);
        vertex(1, -16);
        endShape(CLOSE);

        //==============================
        // CHEST STAR
        //==============================

        fill(saffronLight);

        beginShape();
        vertex(0, -2);
        vertex(2, 2);
        vertex(7, 3);
        vertex(2, 5);
        vertex(0, 10);
        vertex(-2, 5);
        vertex(-7, 3);
        vertex(-2, 2);
        endShape(CLOSE);

        //==============================
        // ARMS
        //==============================

        //------------------------------
        // LEFT ARM - LOW SPEAR HAND
        // Viewer-left
        //------------------------------

        fill(chainDark);

        beginShape();
        vertex(-18, -4);
        vertex(-23, 0);
        vertex(-25, 8);
        vertex(-24, 14);
        vertex(-20, 19);
        vertex(-16, 14);
        vertex(-15, 4);
        endShape(CLOSE);

        // Gold forearm guard.
        fill(saffronDark);

        beginShape();
        vertex(-23, 8);
        vertex(-27, 12);
        vertex(-25, 19);
        vertex(-21, 22);
        vertex(-17, 18);
        vertex(-19, 11);
        endShape(CLOSE);


        //------------------------------
        // RIGHT ARM - HIGH SPEAR HAND
        // Viewer-right
        //------------------------------

        fill(chainDark);

        beginShape();
        vertex(18, -4);
        vertex(22, -2);
        vertex(22, 4);
        vertex(18, 9);
        vertex(14, 7);
        vertex(14, 1);
        endShape(CLOSE);

        // Gold forearm guard.
        fill(saffronDark);

        beginShape();
        vertex(20, 1);
        vertex(24, 3);
        vertex(23, 8);
        vertex(19, 11);
        vertex(15, 8);
        vertex(16, 3);
        endShape(CLOSE);


        //==============================
        // SPEAR
        // Across front of body
        //==============================

        // Main spear coordinates.
        //
        // Lower grip area:
        //   about (-24, 20)
        //
        // Upper grip area:
        //   about (18, 5)
        //
        // Spearhead:
        //   about (42, -34)

        stroke(leatherDark);
        strokeWeight(5);

        line(-32, 30, 42, -15);

        // Gold highlight on shaft.
        stroke(saffronDark);
        strokeWeight(2);

        line(-32, 30, 42, -15);

        noStroke();


        //==============================
        // SPEAR BUTT CAP
        //==============================

        push();

        translate(-32, 30);
        rotate(1.02);

        fill(saffronDark);
        rectMode(CENTER);
        rect(0, 3, 6, 8);

        fill(saffron);

        beginShape();
        vertex(-3, 7);
        vertex(3, 7);
        vertex(0, 13);
        endShape(CLOSE);

        pop();

        push();

        translate(42, -15);

        // Correct rotation.
        // Local "up" now follows the spear shaft
        // toward the upper-right.
        rotate(degrees(1.02));

        //==============================
        // SPEARHEAD
        //==============================

        fill(sapphireDark);

        beginShape();
        vertex(0, -28);
        vertex(8, -16);
        vertex(0, -7);
        vertex(-8, -16);
        endShape(CLOSE);

        fill(sapphire);

        beginShape();
        vertex(0, -25);
        vertex(5, -16);
        vertex(0, -9);
        vertex(-5, -16);
        endShape(CLOSE);

        // Crystal highlight.
        fill(sapphireLight);

        beginShape();
        vertex(-2, -22);
        vertex(2, -17);
        vertex(0, -12);
        vertex(-4, -16);
        endShape(CLOSE);
        //==============================
        // SPEAR SOCKET / HEAD
        //==============================




        //------------------------------
        // GOLD SOCKET
        //------------------------------

        fill(saffronDark);

        beginShape();
        vertex(-5, 0);
        vertex(5, 0);
        vertex(4, -7);
        vertex(0, -11);
        vertex(-4, -7);
        endShape(CLOSE);

        fill(saffron);

        beginShape();
        vertex(-3, -1);
        vertex(3, -1);
        vertex(3, -6);
        vertex(0, -9);
        vertex(-3, -6);
        endShape(CLOSE);


        //==============================
        // RIBBON / PENNANT
        //==============================

        let ribbonWave = Math.sin(frameCount * 0.04) * 2;

        // Ribbon should trail BACK toward the body,
        // not stick out in random opposite directions.

        // Main blue ribbon.
        fill(sapphire);

        beginShape();
        vertex(-4, -3);   // tied near socket
        vertex(-1, -1);
        vertex(-4, 8);
        vertex(-9 + ribbonWave, 17);
        vertex(-11 + ribbonWave, 13);
        vertex(-7, 5);
        endShape(CLOSE);

        // Gold edge.
        stroke(saffron);
        strokeWeight(1);
        line(-4, -2, -7, 5);
        line(-7, 5, -11 + ribbonWave, 13);
        noStroke();


        // Second, shorter ribbon.
        fill(sapphireDark);

        beginShape();
        vertex(3, -3);
        vertex(5, -1);
        vertex(7, 5);
        vertex(5 + ribbonWave, 12);
        vertex(2 + ribbonWave, 8);
        vertex(2, 2);
        endShape(CLOSE);

        // Gold edge.
        stroke(saffron);
        strokeWeight(1);
        line(4, -2, 6, 5);
        line(6, 5, 5 + ribbonWave, 11);
        noStroke();

        //==============================
        // SPEARHEAD FLARE
        //==============================

        // One flare every 3 seconds or so.
        let flareCycle = frameCount % 180;

        // Flare only exists for 12 frames.
        if (flareCycle < 12) {

            // 0 -> 1 -> 0 over the life of the flare.
            let flareStrength;

            if (flareCycle < 6) {
                flareStrength = flareCycle / 6;
            } else {
                flareStrength = (12 - flareCycle) / 6;
            }

            // Size grows quickly and then disappears.
            let flareSize = 3 + flareStrength * 7;

            // Center of sapphire crystal.
            let flareX = 0;
            let flareY = -17;

            // Bright center.
            fill(255, 245, 190, 220 * flareStrength);
            ellipse(flareX, flareY, 3, 3);

            // Four-point saffron star.
            fill(
                red(saffronLight),
                green(saffronLight),
                blue(saffronLight),
                220 * flareStrength
            );

            beginShape();

            vertex(flareX, flareY - flareSize);
            vertex(flareX + 1.5, flareY - 1.5);

            vertex(flareX + flareSize, flareY);
            vertex(flareX + 1.5, flareY + 1.5);

            vertex(flareX, flareY + flareSize);
            vertex(flareX - 1.5, flareY + 1.5);

            vertex(flareX - flareSize, flareY);
            vertex(flareX - 1.5, flareY - 1.5);

            endShape(CLOSE);
        }


        pop();

        //==============================
        // HANDS
        // Draw AFTER spear shaft
        //==============================

        // Lower left hand gripping shaft.
        fill(skin);
        ellipse(-23, 19, 8, 9);

        // Slight shadow where fingers wrap.
        fill(skinShadow);
        arc(-23, 20, 7, 6, 0, PI);


        // Upper right hand gripping shaft.
        fill(skin);
        ellipse(18, 5, 8, 9);

        // Finger/shadow hint.
        fill(skinShadow);
        arc(18, 6, 7, 6, 0, PI);

        pop();
    }

    drawHexcaster() {
        push();

        //==============================
        // COLOR PALETTE
        //==============================

        const robeDark = color(42, 20, 53);
        const robeMid = color(74, 30, 79);
        const robeLight = color(108, 44, 94);

        const crimsonDark = color(76, 17, 37);
        const crimsonMid = color(122, 27, 53);

        const goldDark = color(116, 80, 38);
        const goldLight = color(192, 145, 65);

        const skinShadow = color(177, 160, 166);
        const skinMid = color(216, 202, 202);
        const skinLight = color(238, 226, 220);

        const hairDark = color(118, 113, 129);
        const hairMid = color(178, 173, 187);
        const hairLight = color(221, 217, 225);

        const corruptionDark = color(45, 10, 52);
        const corruptionMid = color(99, 14, 99);

        // The corruption pulses without moving the body.
        const corruptionPulse =
            map(Math.sin(frameCount * 0.045), -1, 1, 0, 1);

        const corruptionGlow = lerpColor(
            color(105, 13, 111),
            color(255, 47, 222),
            corruptionPulse
        );

        noStroke();

        //==============================
        // BACK HAIR
        // Draw this first so it remains behind the body.
        //==============================

        fill(hairDark);

        beginShape();
        vertex(-16, -23);
        vertex(-22, -12);
        vertex(-21, 11);
        vertex(-15, 27);
        vertex(-8, 18);
        vertex(-10, -17);
        endShape(CLOSE);

        beginShape();
        vertex(16, -23);
        vertex(22, -12);
        vertex(22, 12);
        vertex(16, 29);
        vertex(8, 18);
        vertex(10, -17);
        endShape(CLOSE);

        fill(hairMid);

        beginShape();
        vertex(-13, -21);
        vertex(-18, -9);
        vertex(-17, 17);
        vertex(-12, 23);
        vertex(-8, 12);
        vertex(-8, -18);
        endShape(CLOSE);

        beginShape();
        vertex(13, -21);
        vertex(18, -9);
        vertex(17, 17);
        vertex(12, 23);
        vertex(8, 12);
        vertex(8, -18);
        endShape(CLOSE);

        //==============================
        // ROBE SKIRT
        //==============================

        fill(robeDark);

        beginShape();
        vertex(-13, 7);
        vertex(13, 7);
        vertex(23, 41);
        vertex(11, 47);
        vertex(0, 44);
        vertex(-11, 47);
        vertex(-22, 41);
        endShape(CLOSE);

        // Central robe panel.
        fill(robeMid);

        beginShape();
        vertex(-7, 8);
        vertex(7, 8);
        vertex(11, 42);
        vertex(0, 45);
        vertex(-11, 42);
        endShape(CLOSE);

        // Crimson inner panel.
        fill(crimsonDark);

        beginShape();
        vertex(-3, 10);
        vertex(4, 10);
        vertex(6, 40);
        vertex(0, 43);
        vertex(-5, 40);
        endShape(CLOSE);

        fill(crimsonMid);

        beginShape();
        vertex(-1, 12);
        vertex(2, 12);
        vertex(3, 37);
        vertex(0, 40);
        vertex(-2, 37);
        endShape(CLOSE);

        // Robe edge highlights.
        stroke(robeLight);
        strokeWeight(1);

        line(-14, 15, -19, 39);
        line(14, 15, 20, 39);

        noStroke();

        //==============================
        // TORSO
        //==============================

        fill(robeDark);

        beginShape();
        vertex(-13, -5);
        vertex(-8, -13);
        vertex(8, -13);
        vertex(14, -4);
        vertex(12, 15);
        vertex(-12, 15);
        endShape(CLOSE);

        // High noble collar.
        fill(crimsonDark);

        beginShape();
        vertex(-9, -12);
        vertex(-4, -18);
        vertex(0, -13);
        vertex(4, -18);
        vertex(9, -12);
        vertex(6, -5);
        vertex(-6, -5);
        endShape(CLOSE);

        // Chest panel.
        fill(robeMid);

        beginShape();
        vertex(-7, -5);
        vertex(7, -5);
        vertex(9, 12);
        vertex(0, 16);
        vertex(-9, 12);
        endShape(CLOSE);

        // Gold chest clasp.
        fill(goldDark);
        ellipse(0, -6, 7, 6);

        fill(goldLight);
        ellipse(0, -7, 4, 3);

        //==============================
        // NORMAL RIGHT ARM
        // Character's right side appears on our left.
        //==============================

        fill(robeMid);

        beginShape();
        vertex(-10, -5);
        vertex(-18, -1);
        vertex(-22, 14);
        vertex(-17, 25);
        vertex(-11, 21);
        vertex(-13, 8);
        endShape(CLOSE);

        // Normal hand.
        fill(skinMid);
        ellipse(-17, 25, 8, 9);

        // Small gold cuff.
        fill(goldDark);
        quad(
            -21, 18,
            -14, 18,
            -13, 23,
            -19, 24
        );

        //==============================
        // CORRUPTED LEFT SHOULDER
        // Character's left side appears on our right.
        //==============================

        fill(corruptionDark);

        beginShape();
        vertex(8, -9);
        vertex(17, -8);
        vertex(23, -2);
        vertex(20, 8);
        vertex(11, 9);
        vertex(8, 1);
        endShape(CLOSE);

        // Corrupted shoulder armor growth.
        fill(corruptionMid);

        beginShape();
        vertex(11, -9);
        vertex(18, -13);
        vertex(17, -7);
        vertex(24, -8);
        vertex(20, -2);
        vertex(25, 1);
        vertex(17, 3);
        vertex(11, 0);
        endShape(CLOSE);

        //==============================
        // CORRUPTED LEFT ARM
        // Larger and more angular than the normal arm.
        //==============================

        fill(corruptionDark);

        beginShape();
        vertex(17, -2);
        vertex(24, 1);
        vertex(27, 13);
        vertex(25, 25);
        vertex(20, 34);
        vertex(13, 30);
        vertex(15, 18);
        vertex(12, 7);
        endShape(CLOSE);

        fill(corruptionMid);

        beginShape();
        vertex(20, 2);
        vertex(24, 5);
        vertex(24, 16);
        vertex(21, 27);
        vertex(17, 30);
        vertex(18, 17);
        vertex(15, 7);
        endShape(CLOSE);

        // Corrupted claw-like hand.
        fill(corruptionDark);

        beginShape();
        vertex(14, 27);
        vertex(19, 25);
        vertex(25, 28);

        vertex(29, 34);
        vertex(25, 33);

        vertex(27, 39);
        vertex(22, 35);

        vertex(20, 41);
        vertex(18, 35);

        vertex(14, 38);
        vertex(15, 32);

        vertex(11, 34);
        vertex(13, 29);
        endShape(CLOSE);

        //==============================
        // NECK
        //==============================

        // fill(skinShadow);
        // rect(-5, -20, 10, 10, 3);

        //==============================
        // FACE
        //==============================

        fill(skinMid);

        beginShape();
        vertex(-11, -34);
        vertex(-7, -41);
        vertex(0, -44);
        vertex(8, -41);
        vertex(11, -34);
        vertex(9, -22);
        vertex(4, -17);
        vertex(-4, -17);
        vertex(-9, -22);
        endShape(CLOSE);

        // Face highlight.
        fill(skinLight);

        beginShape();
        vertex(-5, -40);
        vertex(2, -42);
        vertex(7, -38);
        vertex(6, -24);
        vertex(2, -20);
        vertex(-3, -21);
        vertex(-5, -27);
        endShape(CLOSE);

        //==============================
        // FRONT HAIR
        //==============================

        fill(hairDark);

        beginShape();
        vertex(-12, -35);
        vertex(-8, -43);
        vertex(0, -47);
        vertex(9, -43);
        vertex(13, -35);
        vertex(8, -37);
        vertex(5, -29);
        vertex(1, -37);
        vertex(-5, -30);
        vertex(-7, -38);
        endShape(CLOSE);

        fill(hairLight);

        beginShape();
        vertex(-5, -42);
        vertex(0, -45);
        vertex(5, -42);
        vertex(2, -37);
        vertex(0, -32);
        vertex(-2, -38);
        endShape(CLOSE);

        // Long front side strands.
        fill(hairMid);

        beginShape();
        vertex(-10, -35);
        vertex(-6, -31);
        vertex(-7, -15);
        vertex(-12, -7);
        vertex(-11, -24);
        endShape(CLOSE);

        beginShape();
        vertex(10, -35);
        vertex(7, -29);
        vertex(8, -16);
        vertex(13, -7);
        vertex(12, -25);
        endShape(CLOSE);

        //==============================
        // EYES
        //==============================

        // Normal right eye.
        fill(40, 27, 37);

        beginShape();
        vertex(-7, -31);
        vertex(-3, -33);
        vertex(-1, -31);
        vertex(-3, -29);
        endShape(CLOSE);

        // Corrupted left eye: dark outer shape.
        fill(corruptionDark);

        beginShape();
        vertex(1, -31);
        vertex(5, -34);
        vertex(9, -31);
        vertex(5, -28);
        endShape(CLOSE);

        // Glowing center.
        fill(corruptionGlow);
        ellipse(5, -31, 4, 4);

        // Tiny nose.
        fill(skinShadow);

        beginShape();
        vertex(0, -29);
        vertex(-1, -24);
        vertex(2, -24);
        endShape(CLOSE);

        //==============================
        // FACE CORRUPTION
        // Starts at the eye and travels downward.
        //==============================

        stroke(corruptionGlow);
        strokeWeight(1.5);
        noFill();

        line(6, -29, 8, -25);
        line(8, -25, 6, -21);
        line(6, -21, 9, -17);
        line(9, -17, 10, -11);

        // Small branch beneath eye.
        line(7, -25, 10, -23);

        noStroke();

        // Corrupted patch where face meets neck.
        fill(corruptionMid);

        beginShape();
        vertex(5, -20);
        vertex(9, -18);
        vertex(11, -10);
        vertex(6, -8);
        vertex(3, -14);
        endShape(CLOSE);

        //==============================
        // CORRUPTION VEINS
        //==============================

        this.drawHexcasterCorruption(
            corruptionGlow,
            corruptionPulse
        );

        pop();
    }

    drawHexcasterCorruption(corruptionGlow, corruptionPulse) {
        push();

        noFill();
        stroke(corruptionGlow);

        // The width subtly changes with the pulse.
        strokeWeight(
            map(corruptionPulse, 0, 1, 0, 1)
        );

        // Shoulder-to-arm main vein.
        beginShape();
        vertex(13, -5);
        vertex(17, 1);
        vertex(16, 8);
        vertex(21, 14);
        vertex(19, 22);
        vertex(21, 29);
        endShape();

        // Upper branch.
        beginShape();
        vertex(17, 2);
        vertex(21, 5);
        vertex(23, 10);
        endShape();

        // Middle branch.
        beginShape();
        vertex(17, 10);
        vertex(14, 15);
        vertex(17, 19);
        endShape();

        // Lower branch into the hand.
        beginShape();
        vertex(20, 23);
        vertex(17, 28);
        vertex(18, 34);
        endShape();

        // Palm fractures.
        line(18, 31, 14, 34);
        line(19, 32, 22, 37);
        line(21, 30, 26, 34);

        // Bright nodes along the corruption.
        noStroke();
        fill(corruptionGlow);

        ellipse(17, 2, 3, 3);
        ellipse(17, 11, 3, 3);
        ellipse(20, 22, 3, 3);
        ellipse(19, 31, 3, 3);

        pop();
    }


    drawEverlight() {
        noStroke();

        //==============================
        // COLOR PALETTE
        //==============================

        const greenDark = color(32, 76, 47);
        const greenMid = color(50, 122, 68);
        const greenLight = color(92, 177, 98);

        const whiteCloth = color(228, 226, 205);
        const clothShadow = color(181, 188, 162);

        const goldDark = color(116, 89, 35);
        const goldMid = color(176, 139, 55);
        const goldLight = color(232, 199, 103);

        const skin = color(213, 171, 132);
        const hairDark = color(104, 74, 38);
        const hairMid = color(158, 116, 63);
        const hairLight = color(204, 164, 92);

        const gemDark = color(24, 91, 46);
        const gemMid = color(50, 170, 76);
        const gemLight = color(167, 244, 146);

        //==============================
        // FLOATING SHADOW
        //==============================

        fill(0, 20);
        ellipse(0, 34, 34, 9);

        //==============================
        // WINGS
        // Draw first so the body overlaps them.
        //==============================

        // Left upper wing.
        fill(214, 228, 194, 145);
        stroke(goldDark);
        strokeWeight(1);

        beginShape();
        vertex(-8, -19);
        vertex(-24, -37);
        vertex(-30, -34);
        vertex(-27, -15);
        vertex(-14, 3);
        vertex(-7, 4);
        endShape(CLOSE);

        // Right upper wing.
        beginShape();
        vertex(8, -19);
        vertex(24, -37);
        vertex(30, -34);
        vertex(27, -15);
        vertex(14, 3);
        vertex(7, 4);
        endShape(CLOSE);

        // Left lower wing.
        fill(194, 219, 179, 125);

        beginShape();
        vertex(-10, -4);
        vertex(-27, 1);
        vertex(-29, 9);
        vertex(-18, 18);
        vertex(-7, 12);
        endShape(CLOSE);

        // Right lower wing.
        beginShape();
        vertex(10, -4);
        vertex(27, 1);
        vertex(29, 9);
        vertex(18, 18);
        vertex(7, 12);
        endShape(CLOSE);

        // Wing veins.
        stroke(goldMid);
        strokeWeight(1);

        line(-9, -17, -25, -32);
        line(-11, -8, -26, 3);
        line(9, -17, 25, -32);
        line(11, -8, 26, 3);

        noStroke();

        //==============================
        // HAIR BEHIND BODY
        //==============================

        fill(hairDark);

        beginShape();
        vertex(-10, -25);
        vertex(-15, -16);
        vertex(-16, 4);
        vertex(-10, 19);
        vertex(-5, 12);
        vertex(0, -6);
        endShape(CLOSE);

        beginShape();
        vertex(10, -25);
        vertex(15, -16);
        vertex(16, 4);
        vertex(10, 19);
        vertex(5, 12);
        vertex(0, -6);
        endShape(CLOSE);

        fill(hairMid);

        beginShape();
        vertex(-8, -22);
        vertex(-14, -13);
        vertex(-13, 8);
        vertex(-8, 15);
        vertex(-3, 7);
        endShape(CLOSE);

        beginShape();
        vertex(8, -22);
        vertex(14, -13);
        vertex(13, 8);
        vertex(8, 15);
        vertex(3, 7);
        endShape(CLOSE);

        //==============================
        // ROBE SILHOUETTE
        //==============================

        fill(whiteCloth);

        beginShape();
        vertex(-9, -8);
        vertex(9, -8);
        vertex(14, 5);
        vertex(12, 21);
        vertex(5, 33);
        vertex(0, 37);
        vertex(-5, 33);
        vertex(-12, 21);
        vertex(-14, 5);
        endShape(CLOSE);

        // Green side panels.
        fill(greenDark);

        beginShape();
        vertex(-9, -5);
        vertex(-14, 5);
        vertex(-11, 22);
        vertex(-4, 31);
        vertex(-6, 12);
        endShape(CLOSE);

        beginShape();
        vertex(9, -5);
        vertex(14, 5);
        vertex(11, 22);
        vertex(4, 31);
        vertex(6, 12);
        endShape(CLOSE);

        // Layered robe tails.
        fill(clothShadow);

        beginShape();
        vertex(-7, 15);
        vertex(-2, 17);
        vertex(-4, 34);
        vertex(-9, 29);
        endShape(CLOSE);

        beginShape();
        vertex(7, 15);
        vertex(2, 17);
        vertex(4, 34);
        vertex(9, 29);
        endShape(CLOSE);

        // Central emerald bodice.
        fill(greenMid);

        beginShape();
        vertex(-6, -7);
        vertex(6, -7);
        vertex(8, 5);
        vertex(4, 16);
        vertex(0, 21);
        vertex(-4, 16);
        vertex(-8, 5);
        endShape(CLOSE);

        // Gold trim.
        stroke(goldMid);
        strokeWeight(1);

        line(-6, -6, -4, 15);
        line(6, -6, 4, 15);
        line(-4, 15, 0, 20);
        line(4, 15, 0, 20);

        noStroke();

        //==============================
        // ARMS
        // Narrower and closer to the body.
        //==============================

        fill(skin);

        // Left arm.
        beginShape();
        vertex(-7, -3);
        vertex(-13, 0);
        vertex(-16, 8);
        vertex(-13, 11);
        vertex(-9, 6);
        endShape(CLOSE);

        // Right arm.
        beginShape();
        vertex(7, -3);
        vertex(13, 0);
        vertex(16, 8);
        vertex(13, 11);
        vertex(9, 6);
        endShape(CLOSE);

        //==============================
        // GREEN BRACERS
        //==============================

        fill(greenDark);

        // Left bracer.
        beginShape();
        vertex(-14, 5);
        vertex(-17, 8);
        vertex(-14, 12);
        vertex(-11, 9);
        endShape(CLOSE);

        // Right bracer.
        beginShape();
        vertex(14, 5);
        vertex(17, 8);
        vertex(14, 12);
        vertex(11, 9);
        endShape(CLOSE);

        // Small gold trim.
        stroke(goldMid);
        strokeWeight(1);

        line(-15, 7, -12, 10);
        line(15, 7, 12, 10);

        noStroke();

        //==============================
        // NECK AND FACE
        //==============================

        fill(skin);
        rectMode(CENTER);
        rect(0, -11, 6, 8);

        ellipse(0, -21, 20, 22);

        // Hair framing face.
        fill(hairMid);

        beginShape();
        vertex(-10, -27);
        vertex(-5, -31);
        vertex(0, -32);
        vertex(-3, -24);
        vertex(-7, -17);
        vertex(-11, -16);
        endShape(CLOSE);

        beginShape();
        vertex(10, -27);
        vertex(5, -31);
        vertex(0, -32);
        vertex(3, -24);
        vertex(7, -17);
        vertex(11, -16);
        endShape(CLOSE);

        // Hair highlight.
        fill(hairLight);

        beginShape();
        vertex(-4, -30);
        vertex(1, -32);
        vertex(5, -28);
        vertex(1, -27);
        endShape(CLOSE);

        //==============================
        // EYES
        // Small, soft, feminine.
        //==============================

        //EYELIDS
        stroke(155, 118, 78);
        strokeWeight(1);

        line(-5, -23, -2, -23);
        line(2, -23, 5, -23);

        noStroke();

        // // Thin upper lash.
        // stroke(120, 95, 70);
        // strokeWeight(1);

        // line(-5.5, -22, -2.5, -22.5);
        // line( 5.5, -22,  2.5, -22.5);

        // noStroke();

        // Soft ivory eye.
        fill(245, 242, 225);

        ellipse(-4, -21, 2.2, 1.2);
        ellipse(4, -21, 2.2, 1.2);

        // Small green iris.
        fill(84, 130, 86);

        ellipse(-4, -21, 0.8, 0.8);
        ellipse(4, -21, 0.8, 0.8);

        //==============================
        // LEAF CIRCLET
        //==============================

        fill(greenMid);

        beginShape();
        vertex(-9, -28);
        vertex(-14, -32);
        vertex(-12, -25);
        endShape(CLOSE);

        beginShape();
        vertex(-5, -31);
        vertex(-8, -36);
        vertex(-3, -33);
        endShape(CLOSE);

        beginShape();
        vertex(9, -28);
        vertex(14, -32);
        vertex(12, -25);
        endShape(CLOSE);

        beginShape();
        vertex(5, -31);
        vertex(8, -36);
        vertex(3, -33);
        endShape(CLOSE);

        // Central circlet gem.
        fill(gemMid);

        beginShape();
        vertex(0, -34);
        vertex(4, -30);
        vertex(0, -26);
        vertex(-4, -30);
        endShape(CLOSE);

        fill(gemLight);
        ellipse(0, -30, 2, 2);

        //==============================
        // NOSE
        // Small and subtle.
        //==============================

        fill(178, 133, 98);

        beginShape();
        vertex(0, -22);
        vertex(1.5, -19);
        vertex(0, -18);
        vertex(-1, -19);
        endShape(CLOSE);

        //==============================
        // ORBITING GEMS
        //==============================

        // Controls how fast the gems orbit.
        const orbitSpeed = 0.015;

        // Controls the size of the orbit.
        const orbitWidth = 33;
        const orbitHeight = 25;

        // Current animation angle.
        const orbitAngle = frameCount * orbitSpeed;

        // Keep the three gems evenly spaced around the orbit.
        const gemAngle1 = orbitAngle;
        const gemAngle2 = orbitAngle + TWO_PI / 3;
        const gemAngle3 = orbitAngle + (TWO_PI * 2) / 3;

        // Center of the orbit.
        // Moving orbitCenterY upward keeps the gems around her upper body.
        const orbitCenterX = 0;
        const orbitCenterY = -10;

        // Gem 1 position.
        const gem1X = orbitCenterX + Math.cos(gemAngle1) * orbitWidth;
        const gem1Y = orbitCenterY + Math.sin(gemAngle1) * orbitHeight;

        // Gem 2 position.
        const gem2X = orbitCenterX + Math.cos(gemAngle2) * orbitWidth;
        const gem2Y = orbitCenterY + Math.sin(gemAngle2) * orbitHeight;

        // Gem 3 position.
        const gem3X = orbitCenterX + Math.cos(gemAngle3) * orbitWidth;
        const gem3Y = orbitCenterY + Math.sin(gemAngle3) * orbitHeight;

        // Draw gems at their calculated positions.
        // The gems remain upright because drawEverlightGem()
        // does not rotate the canvas.
        this.drawEverlightGem(
            gem1X,
            gem1Y,
            gemDark,
            gemMid,
            gemLight,
            goldMid
        );

        this.drawEverlightGem(
            gem2X,
            gem2Y,
            gemDark,
            gemMid,
            gemLight,
            goldMid
        );

        this.drawEverlightGem(
            gem3X,
            gem3Y,
            gemDark,
            gemMid,
            gemLight,
            goldMid
        );
    }

    drawEverlightGem(x, y, gemDark, gemMid, gemLight, goldMid) {
        push();

        translate(x, y);

        // Gold base.
        fill(goldMid);

        beginShape();
        vertex(0, -7);
        vertex(7, 1);
        vertex(4, 8);
        vertex(0, 11);
        vertex(-4, 8);
        vertex(-7, 1);
        endShape(CLOSE);

        // Emerald crystal.
        fill(gemDark);

        beginShape();
        vertex(0, -10);
        vertex(6, -2);
        vertex(4, 7);
        vertex(0, 10);
        vertex(-4, 7);
        vertex(-6, -2);
        endShape(CLOSE);

        fill(gemMid);

        beginShape();
        vertex(0, -8);
        vertex(4, -2);
        vertex(2, 6);
        vertex(0, 8);
        endShape(CLOSE);

        fill(gemLight);

        beginShape();
        vertex(-1, -6);
        vertex(2, -3);
        vertex(0, 2);
        vertex(-3, 0);
        endShape(CLOSE);

        pop();
    }

    drawForgeborn() {
        noStroke();

        //==============================
        // COLOR PALETTE
        //==============================

        const bronzeDark = color(48, 39, 31);
        const bronzeMid = color(79, 62, 46);
        const bronzeLight = color(112, 84, 56);

        const armorDark = color(27, 28, 30);
        const armorMid = color(44, 43, 42);

        // Slow repeating pulse from dark orange to bright orange.
        const pulseAmount = map(Math.sin(frameCount * 0.025), -1, 1, 0, 1); 
        const orange = lerpColor(
            color(132, 52, 8),
            color(255, 127, 24),
            pulseAmount
        );

        const orangeBright = lerpColor(
            color(176, 76, 12),
            color(255, 205, 82),
            pulseAmount
        );
       

        //==============================
        // SHADOW
        //==============================

        fill(0, 32);
        ellipse(0, 32, 54, 14);

        //==============================
        // HAMMER
        // Draw before the body/shoulders.
        //==============================

        //HANDLE
        stroke(armorDark);
        strokeWeight(6);
        line(-7, 0, -28, -29);

        stroke(bronzeLight);
        strokeWeight(3);
        line(-7, 0, -28, -29);

        noStroke();
        //==============================
        // HAMMER HEAD
        //==============================

        push();

        // Shift the hammer over the shoulder
        translate(-22, -26);

        // Rotate to match the handle
        rotate(radians(-28));

        // ------------------------------
        // Outer frame
        // ------------------------------
        fill(bronzeDark);

        beginShape();
        vertex(-17, -14);
        vertex(0, -17);
        vertex(10, -12);
        vertex(13, -4);
        vertex(9, 3);
        vertex(0, 5);
        vertex(-15, 2);
        vertex(-21, -4);
        vertex(-21, -11);
        endShape(CLOSE);

        // ------------------------------
        // Main side plate
        // ------------------------------
        fill(bronzeMid);

        beginShape();
        vertex(-15, -11);
        vertex(-1, -13);
        vertex(7, -9);
        vertex(10, -4);
        vertex(7, 0);
        vertex(-1, 2);
        vertex(-13, 0);
        vertex(-18, -5);
        vertex(-18, -9);
        endShape(CLOSE);

        // ------------------------------
        // Top bevel
        // ------------------------------
        fill(bronzeLight);

        beginShape();
        vertex(-15, -11);
        vertex(-1, -13);
        vertex(7, -9);
        vertex(-3, -7);
        vertex(-18, -9);
        endShape(CLOSE);

        // ------------------------------
        // Striking face
        // ------------------------------
        fill(armorDark);

        beginShape();
        vertex(-21, -11);
        vertex(-15, -9);
        vertex(-15, -1);
        vertex(-21, -4);
        endShape(CLOSE);

        // ------------------------------
        // Rear machine housing
        // ------------------------------
        fill(armorMid);

        beginShape();
        vertex(-1, -8);
        vertex(8, -7);
        vertex(9, -2);
        vertex(3, 2);
        vertex(-2, -1);
        endShape(CLOSE);

        // ------------------------------
        // Orange vents
        // ------------------------------
        fill(orange);

        rectMode(CENTER);
        rect(-9, -6, 3, 6);
        rect(-3, -5.5, 3, 7);

        fill(orangeBright);
        rect(-9, -6, 1.25, 4.5);
        rect(-3, -5.5, 1.25, 5);

        stroke(orange);
        strokeWeight(1.5);
        line(-12, -10, -2, -11);

        noStroke();

        pop();

        //==============================
        // BACK SHOULDER MASS
        //==============================

        fill(bronzeDark);

        beginShape();
        vertex(-25, -14);
        vertex(-15, -23);
        vertex(15, -23);
        vertex(25, -14);
        vertex(24, 7);
        vertex(15, 15);
        vertex(-15, 15);
        vertex(-24, 7);
        endShape(CLOSE);

        //==============================
        // LEFT SHOULDER PLATE
        // Hammer side
        //==============================

        fill(bronzeMid);

        beginShape();
        vertex(-14, -18);
        vertex(-26, -15);
        vertex(-31, -7);
        vertex(-29, 3);
        vertex(-20, 7);
        vertex(-13, 1);
        endShape(CLOSE);

        fill(bronzeLight);

        beginShape();
        vertex(-16, -16);
        vertex(-25, -13);
        vertex(-28, -7);
        vertex(-20, -9);
        vertex(-14, -6);
        endShape(CLOSE);

        //==============================
        // RIGHT SHOULDER PLATE
        // Shield side
        //==============================

        fill(bronzeMid);

        beginShape();
        vertex(14, -18);
        vertex(26, -15);
        vertex(31, -7);
        vertex(29, 3);
        vertex(20, 7);
        vertex(13, 1);
        endShape(CLOSE);

        fill(bronzeLight);

        beginShape();
        vertex(16, -16);
        vertex(25, -13);
        vertex(28, -7);
        vertex(20, -9);
        vertex(14, -6);
        endShape(CLOSE);

        //==============================
        // TORSO
        //==============================

        fill(armorDark);

        beginShape();
        vertex(-15, -15);
        vertex(15, -15);
        vertex(20, 2);
        vertex(15, 24);
        vertex(7, 31);
        vertex(-7, 31);
        vertex(-15, 24);
        vertex(-20, 2);
        endShape(CLOSE);

        // Bronze chest armor.
        fill(bronzeMid);

        beginShape();
        vertex(-12, -12);
        vertex(12, -12);
        vertex(16, 2);
        vertex(10, 19);
        vertex(0, 24);
        vertex(-10, 19);
        vertex(-16, 2);
        endShape(CLOSE);

        // Dark central chest plate.
        fill(armorMid);

        beginShape();
        vertex(-7, -10);
        vertex(7, -10);
        vertex(10, 2);
        vertex(6, 16);
        vertex(0, 20);
        vertex(-6, 16);
        vertex(-10, 2);
        endShape(CLOSE);

        // Orange chest vent.
        fill(orange);

        beginShape();
        vertex(-5, 0);
        vertex(5, 0);
        vertex(7, 4);
        vertex(4, 7);
        vertex(-4, 7);
        vertex(-7, 4);
        endShape(CLOSE);

        fill(orangeBright);
        rectMode(CENTER);
        rect(0, 3, 6, 2);

        //==============================
        // LOWER ARMOR
        //==============================

        fill(bronzeDark);

        beginShape();
        vertex(-15, 18);
        vertex(-6, 22);
        vertex(-8, 33);
        vertex(-18, 29);
        endShape(CLOSE);

        beginShape();
        vertex(15, 18);
        vertex(6, 22);
        vertex(8, 33);
        vertex(18, 29);
        endShape(CLOSE);

        //==============================
        // HAMMER ARM — VIEWER LEFT
        //==============================

        fill(armorMid);

        beginShape();
        vertex(-19, -7);
        vertex(-28, -3);
        vertex(-31, 7);
        vertex(-27, 16);
        vertex(-20, 14);
        vertex(-15, 5);
        endShape(CLOSE);

        // Forearm gauntlet.
        fill(bronzeMid);

        beginShape();
        vertex(-27, 6);
        vertex(-34, 10);
        vertex(-34, 18);
        vertex(-27, 23);
        vertex(-20, 18);
        vertex(-21, 10);
        endShape(CLOSE);

        // Forearm highlight.
        fill(bronzeLight);

        beginShape();
        vertex(-27, 8);
        vertex(-32, 11);
        vertex(-31, 15);
        vertex(-26, 13);
        vertex(-22, 11);
        endShape(CLOSE);


        // //==============================
        // HAMMER ARM — VIEWER LEFT
        //==============================

        // Forearm and fist.
        fill(bronzeMid);

        beginShape();
        vertex(-21, 8);
        vertex(-30, 10);
        vertex(-34, 17);
        vertex(-31, 24);
        vertex(-23, 26);
        vertex(-18, 19);
        endShape(CLOSE);

        // Dark fist.
        fill(armorDark);

        beginShape();
        vertex(-27, 14);
        vertex(-34, 17);
        vertex(-32, 23);
        vertex(-25, 24);
        vertex(-21, 19);
        endShape(CLOSE);

        //==============================
        // HAMMER HANDLE
        //==============================

        // Short vertical handle rising from the fist.
        stroke(armorDark);
        strokeWeight(7);
        line(-28, 17, -28, -2);

        stroke(bronzeLight);
        strokeWeight(3);
        line(-28, 17, -28, -2);

        noStroke();



        //==============================
        // SHIELD ARM — VIEWER RIGHT
        //==============================

        // Upper arm underneath the shield.
        fill(armorMid);

        beginShape();
        vertex(18, -8);
        vertex(27, -5);
        vertex(31, 4);
        vertex(29, 16);
        vertex(22, 20);
        vertex(17, 10);
        endShape(CLOSE);

        //==============================
        // BUILT-IN FOREARM SHIELD
        //==============================

        // The shield begins high near the shoulder and wraps
        // directly over the forearm instead of hanging below it.
        fill(bronzeDark);

        beginShape();
        vertex(22, -9);
        vertex(34, -5);
        vertex(41, 4);
        vertex(42, 19);
        vertex(35, 32);
        vertex(27, 38);
        vertex(20, 29);
        vertex(18, 12);
        endShape(CLOSE);

        // Main bronze shield plate.
        fill(bronzeMid);

        beginShape();
        vertex(24, -5);
        vertex(33, -2);
        vertex(38, 5);
        vertex(38, 18);
        vertex(33, 28);
        vertex(27, 33);
        vertex(23, 26);
        vertex(21, 12);
        endShape(CLOSE);

        // Upper shield highlight.
        fill(bronzeLight);

        beginShape();
        vertex(24, -5);
        vertex(33, -2);
        vertex(38, 5);
        vertex(30, 3);
        vertex(23, 7);
        endShape(CLOSE);

        // Dark inset panel.
        fill(armorDark);

        beginShape();
        vertex(27, 3);
        vertex(33, 5);
        vertex(35, 11);
        vertex(34, 22);
        vertex(29, 28);
        vertex(25, 23);
        vertex(24, 11);
        endShape(CLOSE);

        // Orange shield circuitry.
        stroke(orange);
        strokeWeight(2);

        //line(29, 6, 29, 11);
        line(29, 4, 25, 8);
        line(29, 4, 34, 8);

        line(25, 8, 25, 22);
        line(34, 8, 34, 22);

        line(25, 22, 29, 27);
        line(34, 22, 29, 27);

        noStroke();

        // Shield core.
        fill(orange);

        beginShape();
        vertex(29, 10);
        vertex(33, 14);
        vertex(29, 18);
        vertex(25, 14);
        endShape(CLOSE);

        fill(orangeBright);
        ellipse(29, 14, 4, 4);

        //==============================
        // HELMET
        //==============================

        fill(bronzeDark);

        beginShape();
        vertex(0, -35);
        vertex(11, -30);
        vertex(15, -21);
        vertex(12, -8);
        vertex(5, -3);
        vertex(-5, -3);
        vertex(-12, -8);
        vertex(-15, -21);
        vertex(-11, -30);
        endShape(CLOSE);

        // Helmet faceplate.
        fill(armorDark);

        beginShape();
        vertex(0, -31);
        vertex(9, -27);
        vertex(11, -19);
        vertex(8, -10);
        vertex(3, -6);
        vertex(-3, -6);
        vertex(-8, -10);
        vertex(-11, -19);
        vertex(-9, -27);
        endShape(CLOSE);

        // Helmet central ridge.
        fill(bronzeLight);

        beginShape();
        vertex(0, -34);
        vertex(3, -29);
        vertex(2, -8);
        vertex(0, -8);
        vertex(-2, -8);
        vertex(-3, -29);
        endShape(CLOSE);

        // Helmet brow armor.
        fill(bronzeMid);

        beginShape();
        vertex(-10, -23);
        vertex(-3, -20);
        vertex(0, -17);
        vertex(3, -20);
        vertex(10, -23);
        vertex(8, -16);
        vertex(3, -13);
        vertex(0, -15);
        vertex(-3, -13);
        vertex(-8, -16);
        endShape(CLOSE);

        // Orange eyes.
        fill(orangeBright);

        beginShape();
        vertex(-8, -20);
        vertex(-3, -18);
        vertex(-1, -16);
        vertex(-6, -17);
        endShape(CLOSE);

        beginShape();
        vertex(8, -20);
        vertex(3, -18);
        vertex(1, -16);
        vertex(6, -17);
        endShape(CLOSE);

        // Forehead core.
        fill(orange);

        beginShape();
        vertex(0, -27);
        vertex(3, -24);
        vertex(0, -21);
        vertex(-3, -24);
        endShape(CLOSE);

        fill(orangeBright);
        ellipse(0, -24, 2, 2);

        // TEMP COLOR TEST
fill(orangeBright);
rectMode(CENTER);
rect(48, -35, 12, 12);
}
    

   drawGhostrunner() {
        noStroke();

        //==============================
        // SHADOW
        //==============================
        fill(0, 25);
        ellipse(0, 31, 34, 10);

        //==============================
        // BODY
        //==============================
        fill(18, 22, 29);

        beginShape();
        vertex(-9, -13);
        vertex(9, -13);
        vertex(11, 4);
        vertex(8, 25);
        vertex(0, 33);
        vertex(-8, 25);
        vertex(-11, 4);
        endShape(CLOSE);

        //==============================
        // CENTER PANEL
        //==============================
        fill(30, 36, 46);

        beginShape();
        vertex(-5, -10);
        vertex(5, -10);
        vertex(7, 7);
        vertex(4, 23);
        vertex(0, 28);
        vertex(-4, 23);
        vertex(-7, 7);
        endShape(CLOSE);

        // Subtle center highlight
        stroke(55, 63, 78);
        strokeWeight(1);
        line(0, -8, 0, 20);
        noStroke();

        //==============================
        // LEFT ARM
        //==============================
        fill(23, 28, 36);

        beginShape();
        vertex(-8, -9);
        vertex(-14, -5);
        vertex(-16, 7);
        vertex(-14, 14);
        vertex(-10, 7);
        endShape(CLOSE);

        //==============================
        // RIGHT ARM
        //==============================
        beginShape();
        vertex(8, -9);
        vertex(14, -5);
        vertex(16, 7);
        vertex(14, 14);
        vertex(10, 7);
        endShape(CLOSE);

        //==============================
        // BLADE HILTS
        //==============================
        fill(42, 47, 58);

        rectMode(CENTER);

        rect(-15, 9, 3, 5);
        rect(15, 9, 3, 5);

        //==============================
        // LEFT BLADE GLOW
        //==============================
        fill(91, 224, 239, 100);

        beginShape();
        vertex(-16, 6);
        vertex(-27, 27);
        vertex(-26, 32);
        vertex(-13, 10);
        endShape(CLOSE);

        // LEFT BLADE
        fill(77, 225, 239);

        beginShape();
        vertex(-15, 7);
        vertex(-25, 28);
        vertex(-24, 31);
        vertex(-13, 10);
        endShape(CLOSE);

        stroke(196, 250, 255);
        strokeWeight(1.5);
        line(-15, 9, -24, 29);

        noStroke();

        //==============================
        // RIGHT BLADE GLOW
        //==============================
        fill(91, 224, 239, 100);

        beginShape();
        vertex(16, 6);
        vertex(27, 27);
        vertex(26, 32);
        vertex(13, 10);
        endShape(CLOSE);

        // RIGHT BLADE
        fill(77, 225, 239);

        beginShape();
        vertex(15, 7);
        vertex(25, 28);
        vertex(24, 31);
        vertex(13, 10);
        endShape(CLOSE);

        stroke(196, 250, 255);
        strokeWeight(1.5);
        line(15, 9, 24, 29);

        noStroke();

        //==============================
        // HOOD
        //==============================
        fill(24, 29, 38);

        beginShape();
        vertex(0, -42);
        vertex(13, -30);
        vertex(16, -14);
        vertex(12, -3);
        vertex(6, 3);
        vertex(0, 7);
        vertex(-6, 3);
        vertex(-12, -3);
        vertex(-16, -14);
        vertex(-13, -30);
        endShape(CLOSE);

        // Outside highlights
        fill(43, 51, 65);

        beginShape();
        vertex(0, -39);
        vertex(-11, -28);
        vertex(-13, -15);
        vertex(-9, -20);
        vertex(-5, -31);
        endShape(CLOSE);

        beginShape();
        vertex(0, -39);
        vertex(11, -28);
        vertex(13, -15);
        vertex(9, -20);
        vertex(5, -31);
        endShape(CLOSE);

        //==============================
        // INNER HOOD RIM
        //==============================
        stroke(32, 38, 48);
        strokeWeight(1);

        line(-10, -22, -6, -4);
        line(10, -22, 6, -4);

        noStroke();

        //==============================
        // FACE OPENING
        //==============================
        fill(5, 8, 12);

        beginShape();
        vertex(0, -29);
        vertex(10, -22);
        vertex(11, -11);
        vertex(6, -3);
        vertex(0, 1);
        vertex(-6, -3);
        vertex(-11, -11);
        vertex(-10, -22);
        endShape(CLOSE);

        //==============================
        // EYES
        //==============================
        fill(77, 225, 239);

        beginShape();
        vertex(-9, -14);
        vertex(-6, -15);
        vertex(-3, -13);
        vertex(-6, -12);
        endShape(CLOSE);

        beginShape();
        vertex(9, -14);
        vertex(6, -15);
        vertex(3, -13);
        vertex(6, -12);
        endShape(CLOSE);

        this.drawGhostrunnerSparks();
        this.drawGhostrunnerSparks();
        this.drawGhostrunnerSparks();
        this.drawGhostrunnerSparks();
    }

    drawGhostrunnerSparks() {
        // Only create a spark on some frames.
        if (random() > 0.18) {
            return;
        }

        const sparkSide = random([-1, 1]);

        // Start near the lower half of either blade.
        const sparkX = sparkSide * random(18, 25);
        const sparkY = random(16, 29);

        const sparkLength = random(2, 5);
        stroke('black');
        //stroke(196, 250, 255);
        strokeWeight(1);

        line(
            sparkX,
            sparkY,
            sparkX + random(-2, 2),
            sparkY + sparkLength
        );

        noStroke();
    }
}