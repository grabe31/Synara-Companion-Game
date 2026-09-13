class Obstacle {

    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    display() {
        push();

        let drawX = this.x - cameraX;
        let drawY = this.y - cameraY;

        fill(55, 60, 68);
        stroke(95, 103, 115);
        strokeWeight(2);

        rect(drawX, drawY, this.w, this.h);

        pop();
    }
}