class Character {

    constructor(playerData) {

        this.loginCode = playerData.loginCode;
        this.studentName = playerData.studentName;
        this.characterName = playerData.characterName;
        this.currentClass = playerData.currentClass;
        this.level = playerData.level;
       // this.classCode = playerData.classCode;
        this.classCode = "WF";
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
        //this.attackType = playerData.attackType;
        this.attackType = "P";
        this.projectileColor = this.getProjectileColor();
        console.log(this.attackType);

        this.maxHP = map(this.hp, 0, 99, 20, 120); //units
        this.currentHP = this.maxHP;
        this.moveSpeed = map(this.speed, 0, 99, 2, 5); //pixels
        this.attackDamage = map(this.attack, 0, 99, 2, 20); //units
        this.damageReduction = map(this.defense, 0, 99, 0, 0.5); //fractional
        this.attackCoolDown = map(this.dexterity, 0, 99, 1200, 350); //frames
        this.critChance = map(this.luck, 0, 99, 0.02, 0.30); //fractional
        this.appearance = new CharacterAppearance(this);


        if (this.attackType == "M") {
            this.range = map(this.dexterity, 0, 99, 50, 90);
        }
        else {
            this.range = map(this.dexterity, 0, 99, 180, 300);

        }

        this.arc = map(this.dexterity, 0, 99, 30, 120)

        this.mouseAngle = 0;
        this.startAngle = 0;
        this.stopAngle = 0;
        this.flashAttackTimer = 0;
        this.attackTime = millis();
        this.attackReady = false;
        this.team = "player";
        this.cleanseRadius = 90;
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
        console.log("Range: " + this.range);
        console.log("Arc: " + this.arc);
        console.log("Luck: " + this.critChance);


        console.log("=======================");
    }

    display() {
        this.appearance.display();
       
    }

    
    resetAttackTimer() {
        this.attackTime = millis();
    }


    displayAttackArc() {
        //attack arc

        noFill();
        stroke(255, 255, 0);
        strokeWeight(4);
        fill(0, 255, 255, 60);   // semi-transparent white
        stroke('cyan');
        arc(
            this.x - cameraX,
            this.y - cameraY,
            this.range * 2,
            this.range * 2,
            this.stopAngle, //start and stop angle swapped not sure why but it works
            this.startAngle
        );
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

 getProjectileColor() {
    switch (this.classCode) {

        case "EL":
            return color(90, 220, 120);   // Everlight green

        case "HC":
            return color(180, 70, 210);   // Hexcaster purple

        case "WF":
            return color(205, 215, 225);  // Wayfinder silver

        default:
            return color(255);
    }
}
}
