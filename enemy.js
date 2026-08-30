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
        this.spawnScale = 0.1;
        this.spawned = false;


    }
    resetAttackTimer() {
        this.attackTime = millis();
    }

    updateSpawnScale() {
    if (this.spawned) {
        return;
    }

    this.spawnScale += 0.05;

    if (this.spawnScale >= 1) {
        this.spawnScale = 1;
        this.spawned = true;
    }
}

   display() {
    this.appearance.display();
    let screenX = this.x - cameraX;
    let screenY = this.y - cameraY;

 //==============================
    // HP DISPLAY
    //==============================
    fill(220, 215, 200);
    noStroke();
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
        this.separateFromEnemies();
        this.attackReady = millis() > this.attackTime + this.cooldown;
        this.updateSpawnScale();
    }

    separateFromEnemies() {

    for (let other of enemyArray) {

        if (other === this) {
            continue;
        }

        let dx = this.x - other.x;
        let dy = this.y - other.y;

        let distance = Math.sqrt(dx * dx + dy * dy);

        // Approximate collision radius using enemy width.
        let myRadius = this.w / 2 + this.seperationPadding;
        let otherRadius = other.w / 2 + other.seperationPadding;

        let minDistance = myRadius + otherRadius;

        // Prevent divide-by-zero if two bugs are exactly stacked.
        if (distance === 0) {
            dx = random(-1, 1);
            dy = random(-1, 1);
            distance = 1;
        }

        if (distance < minDistance) {

            let overlap = minDistance - distance;

            // Normalize direction.
            let pushX = dx / distance;
            let pushY = dy / distance;

            // Each enemy handles half of the separation.
            this.x += pushX * overlap * 0.5;
            this.y += pushY * overlap * 0.5;
        }
    }
}

   takeDamage(damage) {
    this.currentHP -= damage;
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
            this.seperationPadding = 10;
            this.attackRange = 40;
            this.radius = 22;
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
            this.seperationPadding = 8;
            this.attackRange = 34;
            this.radius = 16;

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
            this.seperationPadding = 14;
            this.attackRange = 44;
            this.radius = 10;

            break;
    }

    this.currentHP = floor(this.maxHP);
}
}