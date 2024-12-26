
import {Adventurer} from "../../adventurer/adventurer.class";
import {Character} from "./character.class";

export function validateCharacterProperties(character: Character | Adventurer): string[] {
  const errors: string[] = [];

  // Check name
  if (!character.name) {
    errors.push("Character name is missing or empty.");
  } else if (typeof character.name !== 'string'){
    errors.push('Character name is not a string');
  }

  // Check level
  if (typeof character.level !== 'number') {
    errors.push("Character level is missing or is not a number.");
  } else if (character.level <= 0){
    errors.push("Character level has to be positive");
  }

  // Check description
  if (!character.description) {
    errors.push("Character description is missing or empty.");
  } else if (typeof character.description !== 'string'){
    errors.push("Character description has to be a string");
  }

  // Check health
  if (typeof character.health !== 'number') {
    errors.push("Character health is missing or is not a number.");
  } else if (character.health <= 0) {
    errors.push("Character health has to be a positive number.");
  }

  // Check attack
  if (typeof character.attack !== 'number') {
    errors.push("Character attack is missing or is not a number.");
  } else if(character.attack < 0) {
    errors.push("Character attack has to be a positive number")
  }

  // Check mana
  if (typeof character.mana !== 'number') {
    errors.push("Character mana is missing or is not a number.");
  } else if(character.mana < 0) {
    errors.push("Character mana has to be a positive number")
  }

  // Check Defense
  if (typeof character.defense !== 'number') {
    errors.push("Character defense is missing or is not a number.");
  } else if(character.defense < 0) {
    errors.push("Character defense has to be a positive number")
  }

  if(character instanceof Adventurer){
    if (!character.archetype) {
      errors.push("Character description is missing or empty.");
    } else if (typeof character.archetype !== 'string'){
      errors.push("Character description has to be a string");
    }
  }

  return errors;
}
