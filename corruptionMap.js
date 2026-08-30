class CorruptionMap {

    constructor() {
        this.tileSize = TILE_SIZE;
        this.rows = ROWS;
        this.cols = COLS;
        this.coreScale = 3;
        this.coreRow = floor(random(1, ROWS - 1));
        this.coreCol = floor(random(1, COLS - 1));
        this.coreScale = 3;
        this.coreShrinkRate = 0.005;
        this.coreRegrowRate = 0.002;
        this.coreSealed = false;
        this.spawnCooldown = 12000;
        this.lastSpawnTime = millis();
        this.corruptionArray = [];
        this.spreadList = [ {row: this.coreRow + 1, col: this.coreCol},
                            {row: this.coreRow -1, col: this.coreCol},
                            {row: this.coreRow, col: this.coreCol+1},
                            {row: this.coreRow, col: this.coreCol-1}
        ]
        this.buildCorruptionArray();



    }

   drawCorruptionCracks(cellX, cellY, cellSize, corruptionLevel) {
    push();

    const screenX = cellX - cameraX;
    const screenY = cellY - cameraY;

    const pulse = map(Math.sin(frameCount * 0.045), -1, 1, 0.7, 1);
    const crackColor = color(235, 20, 200, 255 * pulse);

    stroke(crackColor);
    strokeWeight(2);
    noFill();

    // Stable pattern selection based on cell position.
const col = floor(cellX / cellSize);
const row = floor(cellY / cellSize);

const patternIndex = abs((col * 13 + row * 17) % 8);
    switch (patternIndex) {

        case 0:
            this.corruptionPattern0(screenX, screenY, cellSize);
            break;

        case 1:
            this.corruptionPattern1(screenX, screenY, cellSize);
            break;

        case 2:
            this.corruptionPattern2(screenX, screenY, cellSize);
            break;

        case 3:
            this.corruptionPattern3(screenX, screenY, cellSize);
            break;

        case 4:
            this.corruptionPattern4(screenX, screenY, cellSize);
            break;

        case 5:
            this.corruptionPattern5(screenX, screenY, cellSize);
            break;

        case 6:
            this.corruptionPattern6(screenX, screenY, cellSize);
            break;

        case 7:
            this.corruptionPattern7(screenX, screenY, cellSize);
            break;
    }

    pop();
}

   displayZones() {
    for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.cols; col++) {

            let corruptionLevel = this.corruptionArray[row][col];

            // Uncorrupted cell — draw nothing.
            if (corruptionLevel === 0) {
                continue;
            }

            let cellX = col * this.tileSize;
            let cellY = row * this.tileSize;

            // Corrupted cell.
            if (corruptionLevel === 1) {
                this.drawCorruptionCracks(cellX, cellY, this.tileSize, corruptionLevel);
            }

            // Core cell — leave temporary visualization for now.
            if (corruptionLevel === 2) {
                push();
                fill(150, 30, 170);
                noStroke();
                this.drawCorruptionCore(cellX, cellY, this.tileSize*this.coreScale);
                pop();
            }
        }
    }
}

    buildCorruptionArray() {
        for (let row = 0; row < this.rows; row++) {
            let r = []

            for (let col = 0; col < this.cols; col++) {
                r[col] = 0;
            }
            this.corruptionArray.push(r);
        }

        this.corruptionArray[this.coreRow][this.coreCol] = 2;
    }

   cleanseCorruption(player) {
    for (var row = 0; row < this.rows; row++) {
        for (var col = 0; col < this.cols; col++) {

            if (dist(player.x, player.y, col * this.tileSize, row * this.tileSize) < player.cleanseRadius) {
                this.corruptionArray[row][col] = 0;

                if (!this.coreSealed) {
                    this.corruptionArray[this.coreRow][this.coreCol] = 2;
                }
            }
        }
    }
}
        

    spreadCorruption() {

    this.cleanseCorruption(playerCharacter);

    if (this.coreSealed) {
        this.corruptionArray[this.coreRow][this.coreCol] = 0;
        return;
    }

   for (let location of this.spreadList) {
    this.corruptionArray[location.row][location.col] = 1;
}
    this.corruptionArray[this.coreRow][this.coreCol] = 2;

    

    this.spreadList = [];

    if (this.buildCorruptionArray.length == 0 && enemyArray.length > 0) {
        this.spreadList = [
            {row: this.coreRow + 1, col: this.coreCol},
            {row: this.coreRow - 1, col: this.coreCol},
            {row: this.coreRow, col: this.coreCol + 1},
            {row: this.coreRow, col: this.coreCol - 1}
        ];
    }

    for (var row = 1; row < this.rows - 1; row++) {
        for (var col = 1; col < this.cols - 1; col++) {
            if (this.corruptionArray[row][col] == 1 && random(0, 1) > 0.75) {
                let dir = floor(random(1, 5));

                if (dir == 1) {
                    this.spreadList.push({row: row + 1, col: col});
                }
                else if (dir == 2) {
                    this.spreadList.push({row: row, col: col - 1});
                }
                else if (dir == 3) {
                    this.spreadList.push({row: row - 1, col: col});
                }
                else if (dir == 4) {
                    this.spreadList.push({row: row, col: col + 1});
                }
            }
        }
    }
}

corruptionRemaining() {
    for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.cols; col++) {
           if (this.corruptionArray[row][col] > 0) {
            console.log("Core: ", this.coreRow, this.coreCol)
    console.log("Corruption remains:", row, col, this.corruptionArray[row][col]);
    return true;
}
        }
    }

    return false;
}

spawnEnemy() {
    if (this.coreSealed) {
        return;
    }

    if (millis() - this.lastSpawnTime < this.spawnCooldown) {
        return;
    }

   let coreX = this.coreCol * this.tileSize + this.tileSize / 2;
let coreY = this.coreRow * this.tileSize + this.tileSize / 2;

// Small random offset so bugs don't appear at exactly the same point.
let spawnOffsetX = random(-12, 12);
let spawnOffsetY = random(-12, 12);

let enemy = new Enemy(coreX + spawnOffsetX, coreY + spawnOffsetY, "RC");
enemyArray.push(enemy);
this.coreScale += 0.15;
this.coreScale = constrain(this.coreScale, 0, 3);

    this.lastSpawnTime = millis();
}

drawCorruptionCore(cellX, cellY, cellSize) {
   if(this.coreScale > 0.01){
    push();

    let screenX = cellX - cameraX;
    let screenY = cellY - cameraY;

   let centerX = screenX + this.tileSize / 2;
    let centerY = screenY + this.tileSize / 2;

    //==============================
    // DARK GAP
    //==============================
    noStroke();
    fill(18, 8, 22);

    beginShape();
    vertex(centerX - cellSize * 0.34, centerY - cellSize * 0.42);
    vertex(centerX - cellSize * 0.12, centerY - cellSize * 0.18);
    vertex(centerX - cellSize * 0.24, centerY + cellSize * 0.04);
    vertex(centerX - cellSize * 0.06, centerY + cellSize * 0.22);
    vertex(centerX - cellSize * 0.14, centerY + cellSize * 0.42);

    vertex(centerX + cellSize * 0.12, centerY + cellSize * 0.24);
    vertex(centerX + cellSize * 0.28, centerY + cellSize * 0.06);
    vertex(centerX + cellSize * 0.14, centerY - cellSize * 0.12);
    vertex(centerX + cellSize * 0.30, centerY - cellSize * 0.34);
    vertex(centerX + cellSize * 0.06, centerY - cellSize * 0.22);

    endShape(CLOSE);

    //==============================
    // GLOWING INNER EDGE
    //==============================

    let pulse = map(Math.sin(frameCount * 0.04), -1, 1, 0.6, 1);
    let glow = color(235, 20, 200, 255 * pulse);

    noFill();
    stroke(glow);
    strokeWeight(3);

    beginShape();
    vertex(centerX - cellSize * 0.34, centerY - cellSize * 0.42);
    vertex(centerX - cellSize * 0.12, centerY - cellSize * 0.18);
    vertex(centerX - cellSize * 0.24, centerY + cellSize * 0.04);
    vertex(centerX - cellSize * 0.06, centerY + cellSize * 0.22);
    vertex(centerX - cellSize * 0.14, centerY + cellSize * 0.42);
    endShape();

    beginShape();
    vertex(centerX + cellSize * 0.12, centerY + cellSize * 0.24);
    vertex(centerX + cellSize * 0.28, centerY + cellSize * 0.06);
    vertex(centerX + cellSize * 0.14, centerY - cellSize * 0.12);
    vertex(centerX + cellSize * 0.30, centerY - cellSize * 0.34);
    vertex(centerX + cellSize * 0.06, centerY - cellSize * 0.22);
    endShape();

    //==============================
    // CRACKS RADIATING OUT
    //==============================

    strokeWeight(2);

    line(centerX - cellSize * 0.28, centerY - cellSize * 0.28, centerX - cellSize * 0.48, centerY - cellSize * 0.42);
    line(centerX - cellSize * 0.20, centerY + cellSize * 0.10, centerX - cellSize * 0.46, centerY + cellSize * 0.24);

    line(centerX + cellSize * 0.22, centerY - cellSize * 0.18, centerX + cellSize * 0.46, centerY - cellSize * 0.30);
    line(centerX + cellSize * 0.24, centerY + cellSize * 0.12, centerX + cellSize * 0.48, centerY + cellSize * 0.30);

    pop();
   }
}

updateCore(player) {
    if (this.coreSealed) {
        return;
    }

    let coreX = this.coreCol * this.tileSize + this.tileSize / 2;
    let coreY = this.coreRow * this.tileSize + this.tileSize / 2;
    let distance = dist(player.x, player.y, coreX, coreY);

    if (distance < player.cleanseRadius) {
        this.coreScale -= this.coreShrinkRate;
    } else {
        this.coreScale += this.coreRegrowRate;
    }

    this.coreScale = constrain(this.coreScale, 0, 3);

    if (this.coreScale <= 0) {
    this.coreScale = 0;
    this.coreSealed = true;
    this.corruptionArray[this.coreRow][this.coreCol] = 0;
}
}

corruptionPattern0(x, y, s) {
    beginShape();
    vertex(x + 2, y + s * 0.45);
    vertex(x + s * 0.22, y + s * 0.28);
    vertex(x + s * 0.38, y + s * 0.52);
    vertex(x + s * 0.58, y + s * 0.30);
    vertex(x + s * 0.78, y + s * 0.48);
    vertex(x + s - 2, y + s * 0.34);
    endShape();

    line(x + s * 0.38, y + s * 0.52, x + s * 0.30, y + s * 0.72);
    line(x + s * 0.58, y + s * 0.30, x + s * 0.66, y + s * 0.12);
}

corruptionPattern1(x, y, s) {
    beginShape();
    vertex(x + s * 0.15, y + 2);
    vertex(x + s * 0.28, y + s * 0.22);
    vertex(x + s * 0.18, y + s * 0.42);
    vertex(x + s * 0.40, y + s * 0.56);
    vertex(x + s * 0.32, y + s * 0.78);
    vertex(x + s * 0.48, y + s - 2);
    endShape();

    line(x + s * 0.18, y + s * 0.42, x + s * 0.02, y + s * 0.50);
    line(x + s * 0.40, y + s * 0.56, x + s * 0.62, y + s * 0.48);
}

corruptionPattern2(x, y, s) {
    beginShape();
    vertex(x + 2, y + s * 0.70);
    vertex(x + s * 0.20, y + s * 0.58);
    vertex(x + s * 0.35, y + s * 0.72);
    vertex(x + s * 0.52, y + s * 0.50);
    vertex(x + s * 0.72, y + s * 0.64);
    vertex(x + s - 2, y + s * 0.52);
    endShape();

    line(x + s * 0.52, y + s * 0.50, x + s * 0.48, y + s * 0.24);
    line(x + s * 0.35, y + s * 0.72, x + s * 0.28, y + s * 0.90);
}

corruptionPattern3(x, y, s) {
    beginShape();
    vertex(x + s * 0.72, y + 2);
    vertex(x + s * 0.58, y + s * 0.18);
    vertex(x + s * 0.68, y + s * 0.38);
    vertex(x + s * 0.50, y + s * 0.54);
    vertex(x + s * 0.60, y + s * 0.76);
    vertex(x + s * 0.46, y + s - 2);
    endShape();

    line(x + s * 0.68, y + s * 0.38, x + s * 0.88, y + s * 0.30);
    line(x + s * 0.50, y + s * 0.54, x + s * 0.30, y + s * 0.62);
}

corruptionPattern4(x, y, s) {

    beginShape();
    vertex(x + s * 0.10, y + s * 0.18);
    vertex(x + s * 0.28, y + s * 0.30);
    vertex(x + s * 0.20, y + s * 0.48);
    vertex(x + s * 0.42, y + s * 0.62);
    vertex(x + s * 0.56, y + s * 0.46);
    vertex(x + s * 0.78, y + s * 0.58);
    vertex(x + s * 0.94, y + s * 0.42);
    endShape();

    line(x + s * 0.28, y + s * 0.30, x + s * 0.34, y + s * 0.10);
    line(x + s * 0.42, y + s * 0.62, x + s * 0.34, y + s * 0.82);
    line(x + s * 0.56, y + s * 0.46, x + s * 0.68, y + s * 0.28);
}

corruptionPattern5(x, y, s) {

    beginShape();
    vertex(x + s * 0.82, y + 2);
    vertex(x + s * 0.68, y + s * 0.20);
    vertex(x + s * 0.76, y + s * 0.38);
    vertex(x + s * 0.58, y + s * 0.52);
    vertex(x + s * 0.66, y + s * 0.72);
    vertex(x + s * 0.48, y + s * 0.88);
    vertex(x + s * 0.52, y + s - 2);
    endShape();

    line(x + s * 0.76, y + s * 0.38, x + s * 0.92, y + s * 0.30);
    line(x + s * 0.58, y + s * 0.52, x + s * 0.38, y + s * 0.44);
    line(x + s * 0.66, y + s * 0.72, x + s * 0.82, y + s * 0.82);
}

corruptionPattern6(x, y, s) {

    beginShape();
    vertex(x + 2, y + s * 0.32);
    vertex(x + s * 0.18, y + s * 0.24);
    vertex(x + s * 0.34, y + s * 0.40);
    vertex(x + s * 0.48, y + s * 0.26);
    vertex(x + s * 0.64, y + s * 0.44);
    vertex(x + s * 0.82, y + s * 0.34);
    vertex(x + s - 2, y + s * 0.48);
    endShape();

    line(x + s * 0.34, y + s * 0.40, x + s * 0.28, y + s * 0.66);
    line(x + s * 0.48, y + s * 0.26, x + s * 0.54, y + s * 0.08);
    line(x + s * 0.64, y + s * 0.44, x + s * 0.72, y + s * 0.66);
}

corruptionPattern7(x, y, s) {

    beginShape();
    vertex(x + s * 0.24, y + 2);
    vertex(x + s * 0.34, y + s * 0.20);
    vertex(x + s * 0.22, y + s * 0.38);
    vertex(x + s * 0.40, y + s * 0.54);
    vertex(x + s * 0.30, y + s * 0.72);
    vertex(x + s * 0.46, y + s * 0.88);
    vertex(x + s * 0.42, y + s - 2);
    endShape();

    line(x + s * 0.22, y + s * 0.38, x + s * 0.06, y + s * 0.30);
    line(x + s * 0.40, y + s * 0.54, x + s * 0.62, y + s * 0.46);
    line(x + s * 0.30, y + s * 0.72, x + s * 0.16, y + s * 0.86);
}

}//end class