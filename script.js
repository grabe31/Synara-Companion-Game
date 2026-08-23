let playerCharacter;
let testEnemy;
let statModifier
let enemyArray = [];
let projectileArray = [];
let corruption;
let cameraX = 0;
let cameraY = 0;

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

    const rows = csvText.trim().split("\n");
    const rows2 = csvText2.trim().split("\n");

    const cleanRows = rows2.map(function (row) {
        return row.trim();
    });

    statModifier = new StatModifier(cleanRows);

    const firstPlayer = rows[1].split(",");
    const player = {
        loginCode: firstPlayer[0],
        studentName: firstPlayer[1],
        characterName: firstPlayer[2],
        classCode: firstPlayer[3],
        currentClass: firstPlayer[4],
        level: firstPlayer[5],
        currentXP: firstPlayer[6],

        hp: firstPlayer[22],
        attack: firstPlayer[23],
        defense: firstPlayer[24],
        speed: firstPlayer[25],
        dexterity: firstPlayer[26],
        luck: firstPlayer[27],
        attackType: firstPlayer[15],
        range: null,
        arc: null
    };


    playerCharacter = new Character(player);
    //console.log(playerCharacter);
    statModifier.buildPlayerStats(playerCharacter);
    corruption = new CorruptionMap();

    //  playerCharacter.printCharacterSheet();
}

function setup() {
    createCanvas(width, height);
    loadSpreadsheet();
    rectMode(CENTER);
    imageMode(CENTER);
    for (let i = 0; i < 5; i++) {
        let enemy = new Enemy(random(COLS * TILE_SIZE), random(ROWS * TILE_SIZE));
        enemyArray.push(enemy);
    }

    angleMode(DEGREES);
}

function draw() {
    background(30);

    if (playerCharacter !== undefined) { //player movement
        updateCamera();
        corruption.displayZones();
        fill("white")
        stroke("black")
        textSize(20);
        text(round(playerCharacter.currentHP), 50, 50);

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

       // playerCharacter.display();
       playerCharacter.display();
        playerCharacter.update();
        for (let enemy of enemyArray) {
            enemy.display();
           // enemy.update(playerCharacter);
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

    if (angleDifference <= attacker.arc / 2 && dist(attacker.x, attacker.y, defender.x, defender.y) < attacker.range) {
        defender.takeDamage(calculateDamage(defender, attacker));
    }


}


function mousePressed() {
    if (playerCharacter.attackReady) {
        playerCharacter.resetAttackTimer();
        if (playerCharacter.attackType == "M") {
            playerCharacter.flashAttackTimer = 6;
            for (let enemy of enemyArray) {
                playerAttack(enemy, playerCharacter);
            }
        }
        else {
            let p = new Projectile(playerCharacter, mouseX, mouseY, playerCharacter.projectileColor)
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
        fill("white");
        stroke("black");
        textSize(25);
        text("You Lose", width / 2, height / 2);
        noLoop();
    }
}


function hitDetectMelee(defender, attacker) {
    if (dist(defender.x, defender.y, attacker.x, attacker.y) <= 20 && attacker.attackReady) {
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