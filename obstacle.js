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

    // Main slab
    fill(48, 53, 61);
    stroke(105, 115, 128);
    strokeWeight(3);
    rect(drawX, drawY, this.w, this.h);

    // Inner edge gives the slab some depth
    noFill();
    stroke(72, 80, 91);
    strokeWeight(2);
    rect(drawX, drawY, this.w - 10, this.h - 10);

    // A few fractured seams
    stroke(90, 99, 110);
    strokeWeight(2);

    line(
        drawX - this.w * 0.35,
        drawY - this.h * 0.5,
        drawX - this.w * 0.18,
        drawY - this.h * 0.1
    );

    line(
        drawX - this.w * 0.18,
        drawY - this.h * 0.1,
        drawX - this.w * 0.28,
        drawY + this.h * 0.25
    );

    line(
        drawX + this.w * 0.15,
        drawY + this.h * 0.5,
        drawX + this.w * 0.08,
        drawY + this.h * 0.12
    );

    line(
        drawX + this.w * 0.08,
        drawY + this.h * 0.12,
        drawX + this.w * 0.27,
        drawY - this.h * 0.18
    );

    // Small Archive-style geometric marking
    noFill();
    stroke(120, 130, 143);
    strokeWeight(1);

    let symbolX = drawX + this.w * 0.25;
    let symbolY = drawY;

    rect(symbolX, symbolY, 12, 12);
    line(symbolX - 6, symbolY, symbolX + 6, symbolY);
    line(symbolX, symbolY - 6, symbolX, symbolY + 6);

    pop();
}
}