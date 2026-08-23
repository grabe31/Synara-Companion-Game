class Enemy {
    constructor(x, y, enemyCode) {
        this.x = x;
        this.y = y;
        this.enemyCode = enemyCode;
        this.setEnemyStats();
        this.attackTime = millis();
        this.attackReady = false;
        this.dead = false;
        this.team = "monster";
        this.appearance = new EnemyAppearance(this);


    }
    resetAttackTimer() {
        this.attackTime = millis();
    }

   display() {
    this.appearance.display();
    let screenX = this.x - cameraX;
    let screenY = this.y - cameraY;

 //==============================
    // HP DISPLAY
    //==============================

    noStroke();
    fill(100);
    textSize(10);
    textAlign(CENTER);
    text(round(this.currentHP), screenX, screenY - 42);

}
    update(target) {
        if (this.currentHP <= 0) {
            this.dead = true;
        }

        if (!this.dead) {
            if (this.x < target.x) {
                this.x = this.x + this.moveSpeed;
            }
            else if (this.x > target.x) {
                this.x = this.x - this.moveSpeed;
            }
            if (this.y < target.y) {
                this.y = this.y + this.moveSpeed;
            }
            else if (this.y > target.y) {
                this.y = this.y - this.moveSpeed;
            }
            this.x = constrain(this.x, 0, WORLD_WIDTH);
            this.y = constrain(this.y, 0, WORLD_HEIGHT);
        }

        this.attackReady = millis() > this.attackTime + this.cooldown;
    }

   takeDamage(damage) {
    let actualDamage = damage * (1 - this.damageReduction);
    this.currentHP -= actualDamage;
}

   setEnemyStats() {
    switch (this.enemyCode) {

        case "BT":
            // Beetle — tank
            this.w = 32;
            this.h = 28;
            this.maxHP = random(200, 251);
            this.attackDamage = 3;
            this.moveSpeed = 0.55;
            this.damageReduction = 0.08;
            this.cooldown = 2200;
            this.critChance = 0.03;
            break;

        case "RC":
            // Roach — baseline
            this.w = 22;
            this.h = 28;
            this.maxHP = random(100, 151);
            this.attackDamage = 2;
            this.moveSpeed = 1;
            this.damageReduction = 0.02;
            this.cooldown = 1500;
            this.critChance = 0.05;
            break;

        case "WS":
            // Water Strider — fast / fragile
            this.w = 14;
            this.h = 18;
            this.maxHP = random(50, 76);
            this.attackDamage = 1;
            this.moveSpeed = 1.65;
            this.damageReduction = 0;
            this.cooldown = 800;
            this.critChance = 0.08;
            break;
    }

    this.currentHP = floor(this.maxHP);
}
}