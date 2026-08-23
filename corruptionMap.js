class CorruptionMap {

    constructor() {
        this.tileSize = TILE_SIZE;
        this.rows = ROWS;
        this.cols = COLS;

        this.coreRow = floor(random(ROWS));
        this.coreCol = floor(random(COLS));

        this.corruptionArray = [];
        this.spreadList = [ {row: this.coreRow + 1, col: this.coreCol},
                            {row: this.coreRow -1, col: this.coreCol},
                            {row: this.coreRow, col: this.coreCol+1},
                            {row: this.coreRow, col: this.coreCol-1}
        ]
        this.buildCorruptionArray();



    }

    displayZones() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.corruptionArray[row][col] == 0) {
                    fill('white');
                }
                else if (this.corruptionArray[row][col] == 1) {
                    fill('purple');
                }
                else if (this.corruptionArray[row][col] == 2) {
                    fill('pink')
                }

                stroke('black')
                strokeWeight(1);
                square(col * this.tileSize - cameraX, row * this.tileSize - cameraY, this.tileSize);
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

    cleanseCorruption(player){
         for(var row = 0; row < this.rows; row++){ //start at 2nd row, 2nd cell and end loop 1 early
            for(var col = 0; col < this.cols; col++){
        if(dist(player.x, player.y, col*this.tileSize, row*this.tileSize ) < player.cleanseRadius){
            this.corruptionArray[row][col] = 0;
            this.corruptionArray[this.coreRow][this.coreCol] = 2;

    }
         }
        }
    
}

    spreadCorruption(){
        for(let location of this.spreadList){
            this.corruptionArray[location.row][location.col] = 1
            this.corruptionArray[this.coreRow][this.coreCol] = 2;

        }

        this.spreadList = [];
        this.cleanseCorruption(playerCharacter);

        if(this.buildCorruptionArray.length == 0 && enemyArray.length > 0){
             this.spreadList = [ {row: this.coreRow + 1, col: this.coreCol},
                            {row: this.coreRow -1, col: this.coreCol},
                            {row: this.coreRow, col: this.coreCol+1},
                            {row: this.coreRow, col: this.coreCol-1}
             ]
        }

        for(var row = 1; row < this.rows-1; row++){ //start at 2nd row, 2nd cell and end loop 1 early
            for(var col = 1; col < this.cols-1; col++){
                if(this.corruptionArray[row][col] == 1 && random(0, 1) > 0.75){
                    let dir = floor(random(1,5));
                    if(dir == 1){
                        this.spreadList.push({row: row+1, col: col})
                    }
                     else if(dir == 2){
                        this.spreadList.push({row: row, col: col-1})
                    }
                     else if(dir == 3){
                        this.spreadList.push({row: row-1, col: col})
                    }
                    else if(dir == 4){
                        this.spreadList.push({row: row, col: col+1})
                    }

    }
    }

        }

}

}//end class