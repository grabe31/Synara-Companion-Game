class Character {

    constructor(playerData) {

        this.loginCode = playerData.loginCode;
        this.studentName = playerData.studentName;
        this.characterName = playerData.characterName;
        this.currentClass = playerData.currentClass;
        this.level = playerData.level;
        this.classCode = playerData.classCode;
        //this.classCode = "EL";
        this.hp = playerData.hp;
        this.currentXP = playerData.currentXP;
        this.attack = playerData.attack;
        this.defense = playerData.defense;
        this.speed = playerData.speed;
        this.dexterity = playerData.dexterity;
        this.luck = playerData.luck;
        this.x = ROWS * TILE_SIZE / 2;
        this.y = COLS * TILE_SIZE / 2;
        this.w = 48
        this.h = 48
        this.attackType = playerData.attackType;
        //this.attackType = "P";
        this.attackColor = this.getAttackColor();
        console.log(this.attackType);

        this.maxHP = map(this.hp, 0, 99, 20, 120); //units
        this.currentHP = this.maxHP;
        this.moveSpeed = map(this.speed, 0, 99, 2, 5); //pixels
        this.attackDamage = map(this.attack, 0, 99, 2, 20); //units
        this.damageReduction = map(this.defense, 0, 99, 0, 0.5); //fractional
        this.attackCoolDown = map(this.dexterity, 0, 99, 1200, 350); //frames
        this.critChance = map(this.luck, 0, 99, 0.02, 0.30); //fractional
        this.appearance = new CharacterAppearance(this);
        this.radius = 18;

        if (this.attackType == "M") {
            this.attackRange = map(this.dexterity, 0, 99, 50, 90);
        }
        else {
            this.attackRange = map(this.dexterity, 0, 99, 180, 300);

        }

        this.arc = map(this.dexterity, 0, 99, 30, 120)
        this.mouseAngle = 0;
        this.startAngle = 0;
        this.stopAngle = 0;
        this.flashAttackTimer = 0;
        this.attackTime = millis();
        this.attackReady = false;
        this.team = "player";
        this.cleanseRadius = 120;
        this.appearance = new CharacterAppearance(this);

    }

    printCharacterSheet() {

        console.log("=== CHARACTER SHEET ===");
        console.log("Name: " + this.characterName);
        console.log("Class: " + this.currentClass);
        console.log("Class Code: " + this.classCode);

        console.log("Level: " + this.level);
        console.log("XP: " + this.currentXP);

        console.log("");

        console.log("HP: " + this.maxHP);
        console.log("Attack: " + this.attackDamage);
        console.log("Defense: " + this.damageReduction);
        console.log("Speed: " + this.moveSpeed);
        console.log("CoolDown: " + this.attackCoolDown);
        console.log("Range: " + this.attackRange);
        console.log("Arc: " + this.arc);
        console.log("Luck: " + this.critChance);


        console.log("=======================");
    }

   display() {
    this.appearance.display();

    if (this.flashAttackTimer > 0) {
        this.displayAttackArc();
        this.flashAttackTimer--;
    }
}

    
    resetAttackTimer() {
        this.attackTime = millis();
    }


  displayAttackArc() {
    push();

    noFill();
    strokeCap(ROUND);

    // flashAttackTimer starts at 8 and counts down to 0.
    let life = this.flashAttackTimer / 8;

    // Fade the slash as it disappears.
    let mainAlpha = 255 * life;
    let trailAlpha = 120 * life;
    let faintAlpha = 55 * life;

    // Read the permanent attack color.
    let attackR = red(this.attackColor);
    let attackG = green(this.attackColor);
    let attackB = blue(this.attackColor);

    // Create temporary transparent colors.
    let mainColor = color(attackR, attackG, attackB, mainAlpha);
    let trailColor = color(attackR, attackG, attackB, trailAlpha);
    let faintColor = color(attackR, attackG, attackB, faintAlpha);

    let screenX = this.x - cameraX;
    let screenY = this.y - cameraY;

    //==============================
    // OUTER MOTION TRAIL
    //==============================

    stroke(faintColor);
    strokeWeight(7);
    arc(screenX, screenY, this.attackRange * 2.05, this.attackRange * 2.05, this.stopAngle, this.startAngle);

    //==============================
    // MIDDLE TRAIL
    //==============================

    stroke(trailColor);
    strokeWeight(5);
    arc(screenX, screenY, this.attackRange * 1.90, this.attackRange * 1.90, this.stopAngle, this.startAngle);

    //==============================
    // BRIGHT WEAPON EDGE
    //==============================

    stroke(mainColor);
    strokeWeight(2);
    arc(screenX, screenY, this.attackRange * 1.75, this.attackRange * 1.75, this.stopAngle, this.startAngle);

    pop();
}
    move(dx, dy) {

        this.x += dx;
        this.y += dy;
        this.x = constrain(this.x, 0, WORLD_WIDTH);
        this.y = constrain(this.y, 0, WORLD_HEIGHT);


    }

    update() {
        this.attackReady = millis() > this.attackTime + this.attackCoolDown;
        this.mouseAngle = atan2(mouseY - (this.y - cameraY), mouseX - (this.x - cameraX));
        this.stopAngle = this.mouseAngle - this.arc / 2;
        this.startAngle = this.mouseAngle + this.arc / 2;


    }

    resetAttackTimer() {
        this.attackTime = millis();
    }

    takeDamage(damage) {
        this.currentHP -= damage;
    }

 getAttackColor() {
    switch (this.classCode) {

        case "EL":
            return color(90, 220, 120);   // Everlight green

        case "HC":
            return color(180, 70, 210);   // Hexcaster purple

        case "WF":
            return color(35, 110, 65);  // Wayfinder silver

        case "GR":
            return color(40, 220, 235);   // Ghostrunner cyan

        case "FB":
            return color(255, 125, 25);   // Forgeborn orange

        case "LU":
            return color(35, 83, 165);    // Luminary sapphire

        default:
            return color(255);
    }
}
}
