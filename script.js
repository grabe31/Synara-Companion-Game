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

let codeInput;
let loginButton;

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
    
}

function setup() {
    canvas = createCanvas(width, height);
    loadSpreadsheet();
    rectMode(CENTER);
    textAlign(CENTER);
    angleMode(DEGREES);

    for (let i = 0; i < 5; i++) {
       // let enemy = new Enemy(random(COLS * TILE_SIZE), random(ROWS * TILE_SIZE), "WS");
        //enemyArray.push(enemy);
           let enemy2 = new Enemy(random(COLS * TILE_SIZE), random(ROWS * TILE_SIZE), "RC");
         enemyArray.push(enemy2);
        //   let enemy3 = new Enemy(random(COLS * TILE_SIZE), random(ROWS * TILE_SIZE), "BT");
        // enemyArray.push(enemy3);
    }
    codeInput = createInput("");
    codeInput.attribute("placeholder", "Enter 6-character code");

    loginButton = createButton("Enter Archive");
    loginButton.mousePressed(checkLoginCode);
}

function draw() {
    background(30);

    if (gameState === "LOGIN") {
    displayLoginScreen();
    return;
}

    if (playerCharacter !== undefined) { //player movement
        updateCamera();
        corruption.displayZones();
        fill("white")
        stroke("black")
        textSize(20);
        displayPlayerHP();
        console.log("Enemies:", enemyArray.length);
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
    let enteredCode = codeInput.value().trim().toUpperCase();

    if (enteredCode.length !== 6) {
        console.log("Invalid code length");
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
        console.log("Code not found");
        return;
    }

    console.log("Character found:", matchingRow);

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
    background(15);

    // Eventually:
    // Archive title
    // emblem/logo
    // atmospheric background
    // instructions
}

function startGame() {
    corruption = new CorruptionMap();
    gameState = "GAME";
}
// function keyPressed(){
//     if(key == 'w'){
//         playerCharacter.move(0, -10);
//     }
//     else if(key == 's'){
//         playerCharacter.move(0, 10);
//     }
//     else if(key == 'a'){
//         playerCharacter.move(-10, 0);
//     }
//     else if(key == 'd'){
//         playerCharacter.move(10, 0);
//     }
// }