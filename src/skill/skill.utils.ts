import { Skill, SkillEffect, SkillTargetCharacterEnum } from './skill.class';
import { CharacterUpdatableNumberProperties } from '../core/character/character.class';

/**
 * Validates a Skill object's properties.
 * @param {Skill} skill The Skill object to validate.
 * @returns {string[]} An array of error messages. Returns empty array if valid.
 */
export function validateSkillProperties(skill: Skill): string[] {
  const errors: string[] = [];

  if (typeof skill !== 'object' || skill === null) {
    errors.push('Skill must be an object.');
    return errors;
  }

  if (
    !skill.name ||
    typeof skill.name !== 'string' ||
    skill.name.trim() === ''
  ) {
    errors.push(
      "Invalid or missing 'name' property. Must be a non-empty string."
    );
  }

  if (
    !skill.description ||
    typeof skill.description !== 'string' ||
    skill.description.trim() === ''
  ) {
    errors.push(
      "Invalid or missing 'description' property. Must be a non-empty string."
    );
  }

  if (typeof skill.cost !== 'number' || skill.cost < 0) {
    errors.push(
      "Invalid or missing 'cost' property. Must be a non-negative number."
    );
  }

  if (!Array.isArray(skill.effects)) {
    errors.push("Invalid or missing 'effect' property. Must be an array.");
  } else if (skill.effects.length === 0) {
    errors.push("Invalid 'effect' property. Must have at least one effect");
  } else {
    skill.effects.forEach((effect, index) => {
      const effectErrors = validateSkillEffect(effect, index);
      errors.push(...effectErrors);
    });
  }

  return errors;
}

function validateSkillEffect(effect: SkillEffect, index: number): string[] {
  const errors: string[] = [];

  if (typeof effect !== 'object' || effect === null) {
    errors.push(
      `Invalid 'effect' at index ${index}. Effect must be an object.`
    );
    return errors;
  }

  if (
    !effect.targetProperty ||
    typeof effect.targetProperty !== 'string' ||
    !Object.values(CharacterUpdatableNumberProperties).includes(
      effect.targetProperty as CharacterUpdatableNumberProperties
    )
  ) {
    errors.push(
      `Invalid 'targetProperty' property at index ${index}. Must be a valid SkillTargetPropertyEnum.`
    );
  }

  if (typeof effect.value !== 'number') {
    errors.push(
      `Invalid 'value' property at index ${index}. Must be a number.`
    );
  }

  if (
    !effect.targetCharacter ||
    typeof effect.targetCharacter !== 'string' ||
    !Object.values(SkillTargetCharacterEnum).includes(
      effect.targetCharacter as SkillTargetCharacterEnum
    )
  ) {
    errors.push(
      `Invalid 'targetCharacter' property at index ${index}. Must be a valid SkillTargetCharacterEnum.`
    );
  }

  return errors;
}
