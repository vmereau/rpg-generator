import {Monster} from "./monsters.service";

export function checkGeneratedMonster(monster: Monster): boolean {
  const errors: string[] = [];

  // Check name
  if (!monster.name) {
    errors.push("Monster name is missing or empty.");
  } else if (typeof monster.name !== 'string'){
    errors.push('Monster name is not a string');
  }

  // Check level
  if (typeof monster.level !== 'number') {
    errors.push("Monster level is missing or is not a number.");
  } else if (monster.level <= 0){
    errors.push("Monster level has to be positive");
  }

  // Check description
  if (!monster.description) {
    errors.push("Monster description is missing or empty.");
  } else if (typeof monster.description !== 'string'){
    errors.push("Monster description has to be a string");
  }

  // Check health
  if (typeof monster.health !== 'number') {
    errors.push("Monster health is missing or is not a number.");
  } else if (monster.health <= 0) {
    errors.push("Monster health has to be a positive number.");
  }

  // Check attack
  if (typeof monster.attack !== 'number') {
    errors.push("Monster attack is missing or is not a number.");
  } else if(monster.attack < 0) {
    errors.push("Monster attack has to be a positive number")
  }

  // Check mana
  if (typeof monster.mana !== 'number') {
    errors.push("Monster mana is missing or is not a number.");
  } else if(monster.mana < 0) {
    errors.push("Monster mana has to be a positive number")
  }

  if(errors.length > 0) console.log(errors);

  return errors.length === 0;
}
