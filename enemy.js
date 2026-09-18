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
        this.avoidAxis = null;
        this.avoidDirection = 0;
        this.avoidingObstacle = false;
        this.currentObstacle = null;
        this.obstacleClearance = 12;


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
        this.moveTowardTarget(target);
    }

    this.separateFromEnemies();
    this.attackReady = millis() > this.attackTime + this.cooldown;
    this.updateSpawnScale();
}

  moveTowardTarget(target) {

    if (this.avoidingObstacle) {
        this.avoidObstacle(target);
        return;
    }

    let dx = 0;
    let dy = 0;

    if (this.x < target.x) {
        dx = this.moveSpeed;
    }
    else if (this.x > target.x) {
        dx = -this.moveSpeed;
    }

    if (this.y < target.y) {
        dy = this.moveSpeed;
    }
    else if (this.y > target.y) {
        dy = -this.moveSpeed;
    }

    let hitX = this.collidesWithObstacle(this.x + dx, this.y);
    let hitY = this.collidesWithObstacle(this.x, this.y + dy);

    if (!hitX && !hitY) {
        this.x += dx;
        this.y += dy;
        return;
    }

    this.avoidingObstacle = true;
    this.avoidDirection = random() < 0.5 ? -1 : 1;

    if (hitX) {
        this.avoidAxis = "y";
        this.currentObstacle = hitX;
    }
    else if (hitY) {
        this.avoidAxis = "x";
        this.currentObstacle = hitY;
    }

    this.avoidObstacle(target);
}

avoidObstacle(target) {

    let obstacle = this.currentObstacle;

    if (obstacle == null) {
        this.avoidingObstacle = false;
        return;
    }

    if (this.avoidAxis === "y") {

        let nextY = this.y + this.moveSpeed * this.avoidDirection;

        if (!this.collidesWithObstacle(this.x, nextY)) {
            this.y = nextY;
        }
        else {
            this.avoidDirection *= -1;
            return;
        }

        let obstacleTop = obstacle.y - obstacle.h / 2;
        let obstacleBottom = obstacle.y + obstacle.h / 2;

       let clearedTop = this.y + this.radius + this.obstacleClearance < obstacleTop;
        let clearedBottom = this.y - this.radius - this.obstacleClearance > obstacleBottom;

        if (clearedTop || clearedBottom) {
            this.avoidingObstacle = false;
            this.avoidAxis = null;
            this.currentObstacle = null;
        }
    }

    else if (this.avoidAxis === "x") {

        let nextX = this.x + this.moveSpeed * this.avoidDirection;

        if (!this.collidesWithObstacle(nextX, this.y)) {
            this.x = nextX;
        }
        else {
            this.avoidDirection *= -1;
            return;
        }

        let obstacleLeft = obstacle.x - obstacle.w / 2;
        let obstacleRight = obstacle.x + obstacle.w / 2;

        let clearedLeft = this.x + this.radius + this.obstacleClearance < obstacleLeft;
        let clearedRight = this.x - this.radius - this.obstacleClearance > obstacleRight;

        if (clearedLeft || clearedRight) {
            this.avoidingObstacle = false;
            this.avoidAxis = null;
            this.currentObstacle = null;
        }
    }
}

collidesWithObstacle(x, y) {

    for (let obstacle of obstacleArray) {

        let closestX = constrain(x, obstacle.x - obstacle.w / 2, obstacle.x + obstacle.w / 2);
        let closestY = constrain(y, obstacle.y - obstacle.h / 2, obstacle.y + obstacle.h / 2);

        let distance = dist(x, y, closestX, closestY);

        if (distance < this.radius) {
            return obstacle;
        }
    }

    return null;
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
           let moveX = pushX * overlap * 0.5;
let moveY = pushY * overlap * 0.5;

let nextX = this.x + moveX;
let nextY = this.y + moveY;

if (!this.collidesWithObstacle(nextX, nextY)) {
    this.x = nextX;
    this.y = nextY;
}
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