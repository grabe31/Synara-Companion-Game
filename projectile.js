class Projectile {

    constructor(owner, targetX, targetY, projectileColor) {
        this.owner = owner;
        this.x = owner.x;
        this.y = owner.y;
        this.team = owner.team;
        let worldTargetX = targetX + cameraX;
        let worldTargetY = targetY + cameraY;

        this.angle = atan2(
            worldTargetY - owner.y,
            worldTargetX - owner.x
        );
        this.dx = cos(this.angle);
        this.dy = sin(this.angle);
        this.speed = 6;
        this.radius = 5;
        this.dead = false;
        this.attackDamage = owner.attackDamage;
        this.critChance = owner.critChance;
        this.projectileColor = projectileColor;

    }

   display() {
    push();

    let drawX = this.x - cameraX;
    let drawY = this.y - cameraY;

    // Soft outer glow
    noStroke();
    fill(red(this.projectileColor), green(this.projectileColor), blue(this.projectileColor), 70);
    circle(drawX, drawY, 18);

    // Colored bolt
    fill(this.projectileColor);
    circle(drawX, drawY, 10);

    // Bright center
    fill(255);
    circle(drawX, drawY, 4);

    // Tail points opposite the direction of travel
    stroke(this.projectileColor);
    strokeWeight(3);
    line(drawX, drawY, drawX - this.dx * 16, drawY - this.dy * 16);

    // Bright inner tail
    stroke(255);
    strokeWeight(1);
    line(drawX, drawY, drawX - this.dx * 10, drawY - this.dy * 10);

    pop();
}

    update() {
    this.x += this.dx * this.speed;
    this.y += this.dy * this.speed;

    if (this.collidesWithObstacle()) {
        this.dead = true;
        return;
    }

    if (
        this.x < 0 ||
        this.x > COLS * TILE_SIZE ||
        this.y < 0 ||
        this.y > ROWS * TILE_SIZE
    ) {
        this.dead = true;
    }
}

collidesWithObstacle() {

    for (let obstacle of obstacleArray) {

        let closestX = constrain(this.x, obstacle.x - obstacle.w / 2, obstacle.x + obstacle.w / 2);
        let closestY = constrain(this.y, obstacle.y - obstacle.h / 2, obstacle.y + obstacle.h / 2);

        let distance = dist(this.x, this.y, closestX, closestY);

        if (distance < this.radius) {
            return true;
        }
    }

    return false;
}




}