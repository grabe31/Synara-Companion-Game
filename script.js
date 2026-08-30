let canvas;
let playerCharacter;
let testEnemy;
let statModifier
let enemyArray = [];
let projectileArray = [];
let characterRows = [];
let corruption;
let cameraX = 0;
let cameraY = 0;
let gameState = "LOGIN";
let loginMessage = "";
let codeInput;
let loginButton;
let dataLoaded;

const width = 960
const height = 540
const TILE_SIZE = 32;
const ROWS = 80;
const COLS = 80;
const WORLD_WIDTH = COLS * TILE_SIZE;
const WORLD_HEIGHT = ROWS * TILE_SIZE;

const CSV_URL = "https://docs.google.com/spreadsheets/d/1YIzPtZJUSD8bXTbDT0JOsx0HzGvfKJdxz25lL0HvSCc/export?format=csv&gid=1645591615";
const CSV_URL2 = "https://docs.google.com/spreadsheets/d/1YIzPtZJUSD8bXTbDT0JOsx0HzGvfKJdxz25lL0HvSCc/export?format=csv&gid=25528368"

async function loadSpreadsheet() {

    const response = await fetch(CSV_URL);
    const response2 = await fetch(CSV_URL2);
    const csvText = await response.text();
    const csvText2 = await response2.text();

    characterRows = csvText.trim().split("\n");
    const rows2 = csvText2.trim().split("\n");

    const cleanRows = rows2.map(function (row) {
        return row.trim();
    });

    statModifier = new StatModifier(cleanRows);
    dataLoaded = true;
    
}

function setup() {
    canvas = createCanvas(width, height);
    loadSpreadsheet();
    rectMode(CENTER);
    textAlign(CENTER);
    angleMode(DEGREES);
    corruption = new CorruptionMap();

    // for (let i = 0; i < 5; i++) {
    //    let enemy = new Enemy(random(COLS * TILE_SIZE), random(ROWS * TILE_SIZE), "WS");
    //     enemyArray.push(enemy);
    //        let enemy2 = new Enemy(random(COLS * TILE_SIZE), random(ROWS * TILE_SIZE), "RC");
    //      enemyArray.push(enemy2);
    //        let enemy3 = new Enemy(random(COLS * TILE_SIZE), random(ROWS * TILE_SIZE), "BT");
    //      enemyArray.push(enemy3);
    // }
    codeInput = createInput("t2e7b9");
   // codeInput.attribute("placeholder", "Enter 6-character code");
    codeInput.input(function() {
    loginMessage = "";
});

    

    loginButton = createButton("Enter Archive");
    loginButton.mousePressed(checkLoginCode);
}

function draw() {
    background(30);
   // console.log(gameState, corruption.coreSealed, enemyArray.length, !corruption.corruptionRemaining)
    //console.log(enemyArray);
    checkForWin();
    

    if (gameState === "LOGIN") {
    displayLoginScreen();
    return;
}
else if (playerCharacter !== undefined) { //player movement
        updateCamera();
        drawArenaFloor();
        corruption.displayZones();
        corruption.updateCore(playerCharacter);
        corruption.spawnEnemy();
        fill("white");
        stroke("black");
        textSize(20);
        displayPlayerHP();
        if (keyIsDown(87)) { // W
            playerCharacter.move(0, -playerCharacter.moveSpeed);
        }

        if (keyIsDown(83)) { // S
            playerCharacter.move(0, playerCharacter.moveSpeed);
        }

        if (keyIsDown(65)) { // A
            playerCharacter.move(-playerCharacter.moveSpeed, 0);
        }

        if (keyIsDown(68)) { // D
            playerCharacter.move(playerCharacter.moveSpeed, 0);
        }

       playerCharacter.display();
        playerCharacter.update();
        for (let enemy of enemyArray) {
            enemy.display();
            enemy.update(playerCharacter);
            let distance = dist(enemy.x, enemy.y, playerCharacter.x, playerCharacter.y)
            hitDetectMelee(playerCharacter, enemy);
            
        }
        for (let p of projectileArray) {
            p.display();
            p.update();
            if (p.team == "player") {
                for (let e of enemyArray) {
                    hitDetectRanged(e, p);
                }
            }
        }
        //corruption.cleanseCorruption(playerCharacter);
        if (frameCount % 30 == 0) {
            corruption.spreadCorruption();
        }

        for (let i = enemyArray.length - 1; i >= 0; i--) {
            if (enemyArray[i].dead) {
                enemyArray.splice(i, 1);
            }
        }
        for (let i = projectileArray.length - 1; i >= 0; i--) {
            if (projectileArray[i].dead) {
                projectileArray.splice(i, 1);
            }
        }
    }
    else if(gameState == "WIN"){
        displayWinScreen();
    }
    else{
        text("Game Load Error", windowWidth/2, windowHeight/2);
    }
    let playerCol = floor(playerCharacter.x / TILE_SIZE);
let playerRow = floor(playerCharacter.y / TILE_SIZE);
let cellValue = corruption.corruptionArray[playerRow][playerCol];

fill(255);
textSize(14);
textAlign(LEFT);
text("Row: " + playerRow + "  Col: " + playerCol + "  Value: " + cellValue, 20, 30);
}

function updateCamera() {
    cameraX = playerCharacter.x - width / 2
    cameraY = playerCharacter.y - height / 2

    cameraX = constrain(cameraX, 0, WORLD_WIDTH - width);
    cameraY = constrain(cameraY, 0, WORLD_HEIGHT - height);
}

function playerAttack(defender, attacker) {


    let enemyAngle = atan2(defender.y - attacker.y,
        defender.x - attacker.x);

    let angleDifference = abs(attacker.mouseAngle - enemyAngle);

    if (angleDifference > 180) {
        angleDifference = 360 - angleDifference;
    }

    if (angleDifference <= attacker.arc / 2 && dist(attacker.x, attacker.y, defender.x, defender.y) < attacker.attackRange) {
        defender.takeDamage(calculateDamage(defender, attacker));
    }


}


function mousePressed() {
    if(gameState != "GAME"){
        return;
    }
    if (playerCharacter.attackReady) {
        playerCharacter.resetAttackTimer();
        if (playerCharacter.attackType == "M") {
            playerCharacter.flashAttackTimer = 8;
            for (let enemy of enemyArray) {
                playerAttack(enemy, playerCharacter);
            }
        }
        else {
            let p = new Projectile(playerCharacter, mouseX, mouseY, playerCharacter.attackColor)
            projectileArray.push(p);
        }
    }
}

function calculateDamage(defender, attacker) {
    let damage = attacker.attackDamage * (1 - defender.damageReduction)
    if (random(0, 1) < attacker.critChance) {
        damage = damage * 2;
    }

    return damage;
}

function checkGameOver() {
    if (playerCharacter.currentHP <= 0) {
        fill(playerCharacter.attackColor);
        stroke("black");
        textSize(25);
        text("You Lose", width / 2, height / 2);
        noLoop();
    }
}


function hitDetectMelee(defender, attacker) {
    if (dist(defender.x, defender.y, attacker.x, attacker.y) <= defender.radius + attacker.attackRange && attacker.attackReady) {
        defender.takeDamage(calculateDamage(defender, attacker));
        attacker.resetAttackTimer();
        checkGameOver();

    }
}

function hitDetectRanged(defender, attacker) {
    if (dist(defender.x, defender.y, attacker.x, attacker.y) < 25 && !attacker.dead) {
        defender.takeDamage(calculateDamage(defender, attacker));
        attacker.dead = true;
    }
}

function screenX(worldX) {
    return worldX - cameraX;
}

function screenY(worldY) {
    return worldY - cameraY;
}

function displayPlayerHP() {

    //==============================
    // HP DISPLAY
    //==============================

    push();

    textAlign(LEFT, CENTER);
    textSize(18);
    textStyle(BOLD);

    fill(playerCharacter.attackColor);
    noStroke();
    rect(61, 40, 70, 40, 6);

    fill(230);
    text("HP", 32, 40);
    text(round(playerCharacter.currentHP), 70, 40);

    pop();
}

function checkLoginCode() {
    if (!dataLoaded) {
    loginMessage = "Archive data is still synchronizing. Try again in a moment.";
    return;
}

    let enteredCode = codeInput.value().trim().toUpperCase();

   if (enteredCode.length !== 6) {
    loginMessage = "Archive Codes must contain 6 characters.";
    return;
}

    let matchingRow = null;

    for (let i = 1; i < characterRows.length; i++) {
        let rowData = characterRows[i].split(",");
        let rowCode = rowData[0].trim().toUpperCase();

        if (rowCode === enteredCode) {
            matchingRow = rowData;
            break;
        }
    }
      if (matchingRow === null) {
        loginMessage = "Archive Code not recognized. Check your code and try again.";
        return;
    }


    loginMessage = "";


    const player = {
    loginCode: matchingRow[0],
    studentName: matchingRow[1],
    characterName: matchingRow[2],
    classCode: matchingRow[3],

    currentClass: matchingRow[4],
    level: matchingRow[5],
    currentXP: matchingRow[6],

    hp: matchingRow[22],
    attack: matchingRow[23],
    defense: matchingRow[24],
    speed: matchingRow[25],
    dexterity: matchingRow[26],
    luck: matchingRow[27],

    attackType: matchingRow[15],
    attackRange: null,
    arc: null
};

playerCharacter = new Character(player);
statModifier.buildPlayerStats(playerCharacter);
//playerCharacter.printCharacterSheet();
codeInput.hide();
loginButton.hide();
startGame();
}

function displayLoginScreen() {

    //==============================
    // BACKGROUND
    //==============================

    background(12, 14, 18);

    //==============================
    // TITLE
    //==============================

    fill(235);
    textAlign(CENTER);
    textStyle(BOLD);
    textSize(34);

    text("THE ARCHIVE OF SYNARA", width / 2, 110);

    //==============================
    // SUBTITLE
    //==============================

    textStyle(NORMAL);
    textSize(16);
    fill(150);

    text(
        "Archive synchronization required",
        width / 2,
        145
    );

    //==============================
    // ARCHIVE SYMBOL
    //==============================

    noFill();
    stroke(80, 180, 220);
    strokeWeight(3);

    ellipse(width / 2, 245, 110, 110);
    ellipse(width / 2, 245, 75, 75);

    line(width / 2 - 55, 245, width / 2 + 55, 245);
    line(width / 2, 190, width / 2, 300);

    noStroke();

    //==============================
    // LOGIN INSTRUCTIONS
    //==============================

    fill(220);
    textSize(18);

    text(
        "Enter your 6-character Archive Code below",
        width / 2,
        355
    );

    fill(120);
    textSize(13);

    text(
        "Your assigned character and progression will synchronize automatically.",
        width / 2,
        382
    );

     //==============================
// LOGIN MESSAGE
//==============================

if (loginMessage !== "") {
    fill(255, 100, 100);
    textSize(14);
    textStyle(BOLD);
    text(loginMessage, width / 2, 510);
    textStyle(NORMAL);
}

    //==============================
    // BETA LABEL
    //==============================

    fill(255, 170, 50);
    textStyle(BOLD);
    textSize(13);

    text(
        "BETA TEST BUILD",
        width / 2,
        480
    );

    textStyle(NORMAL);
}

function displayWinScreen() {
    background(20, 24, 30);

    fill(255);
    textAlign(CENTER);
    textStyle(BOLD);
    textSize(42);
    text("RIFT SEALED", width / 2, 200);

    textStyle(NORMAL);
    textSize(20);
    text("The corruption has been contained.", width / 2, 250);

    textSize(16);
    text("Archive synchronization complete.", width / 2, 290);
}

function startGame() {
    corruption = new CorruptionMap();
    gameState = "GAME";
}

function checkForWin() {
    if (corruption.coreSealed && enemyArray.length === 0 && !corruption.corruptionRemaining()) {
        gameState = "WIN";    }
}

function drawArenaFloor() {

    //==============================
    // BASE FLOOR
    //==============================

    background(75, 80, 88);
    //==============================
    // LARGE FLOOR PANELS
    //==============================

    stroke(62, 67, 74);
    strokeWeight(1);

    const panelSize = 120;

    for (let x = 0; x < WORLD_WIDTH; x += panelSize) {
        line(x - cameraX, -cameraY, x - cameraX, WORLD_HEIGHT - cameraY);
    }

    for (let y = 0; y < WORLD_HEIGHT; y += panelSize) {
        line(-cameraX, y - cameraY, WORLD_WIDTH - cameraX, y - cameraY);
    }

    //==============================
    // ARCHIVE ACCENT LINES
    //==============================

    stroke(95, 103, 115);
    strokeWeight(2);

    const centerX = WORLD_WIDTH / 2 - cameraX;
    const centerY = WORLD_HEIGHT / 2 - cameraY;

    noFill();
    ellipse(centerX, centerY, 500, 500);
    ellipse(centerX, centerY, 300, 300);

    line(centerX - 250, centerY, centerX + 250, centerY);
    line(centerX, centerY - 250, centerX, centerY + 250);
}