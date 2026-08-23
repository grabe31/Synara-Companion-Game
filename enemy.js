class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 20;
        this.h = 20;
        this.maxHP = 200;
        this.currentHP = this.maxHP;
        this.attackDamage = 1;
        this.moveSpeed = 1
        this.damageReduction = 0.01;
        this.cooldown = 1500;
        this.attackTime = millis();
        this.attackReady = false;
        this.critChance = 0.05;
        this.dead = false;
        this.team = "monster";


    }
    resetAttackTimer() {
        this.attackTime = millis();
    }

    display() {
        let screenX = this.x - cameraX;
        let screenY = this.y - cameraY;

        fill("red");
        stroke("red");
        strokeWeight(1);
        rect(screenX, screenY, this.w, this.h);


        noStroke();
        textSize(10);
        text(round(this.currentHP), screenX - 25, screenY - 25);
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

        this.currentHP -= damage;
    }
}