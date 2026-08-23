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
        this.dead = false;
        this.attackDamage = owner.attackDamage;
        this.critChance = owner.critChance;
        this.projectileColor = projectileColor;

    }

    display() {
        fill(this.projectileColor)
        circle(this.x - cameraX, this.y - cameraY, 10);
    }

    update() {
        this.x = this.x + this.dx * this.speed;
        this.y = this.y + this.dy * this.speed;

        if (
    this.x < 0 ||
    this.x > COLS * TILE_SIZE ||
    this.y < 0 ||
    this.y > ROWS * TILE_SIZE
) {
    this.dead = true;
}
    }




}