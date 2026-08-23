class StatModifier {

    constructor(mods) {
        // HP, Attack, Defense, Speed, Dexterity, Luck
        this.mods = mods;

    }

    findModifiers(code) {
        for (let row of this.mods) {
            let currentRow = row.split(",");

            if (currentRow[0] == code) {
                for (let i = 1; i < currentRow.length; i++) {
                    currentRow[i] = Number(currentRow[i]);
                }
                return currentRow;

            }
            else {

            }

        }
    }

    buildPlayerStats(character) {
        let currentModifiers = this.findModifiers(character.classCode);

        this.adjustMaxHP(character, currentModifiers[1]);
        character.currentHP = character.maxHP;
        this.adjustAttackDamage(character, currentModifiers[2]);
        this.adjustDamageReduction(character, currentModifiers[3]);
        this.adjustMoveSpeed(character, currentModifiers[4]);
        this.adjustAttackCooldown(character, currentModifiers[5]);
        this.adjustAttackRange(character, currentModifiers[6]);
        this.adjustAttackArc(character, currentModifiers[7]);
        this.adjustCritChance(character, currentModifiers[8]);


    }

    adjustMoveSpeed(character, modifier) {
        character.moveSpeed *= modifier;
    }

    adjustAttackDamage(character, modifier) {
        character.attackDamage *= modifier;
    }

    adjustDamageReduction(character, modifier) {
        character.damageReduction *= modifier;
    }

    adjustCritChance(character, modifier) {
        character.critChance *= modifier;
    }

    adjustAttackCooldown(character, modifier) {
        character.attackCooldown *= modifier;
    }

    adjustMaxHP(character, modifier) {
        character.maxHP = round(character.maxHP *= modifier);
    }

     adjustAttackRange(character, modifier) {
        character.range *= modifier;
    }

     adjustAttackArc(character, modifier) {
        character.arc *= modifier;
    }

}
