import { Item, ItemEffect, ItemTargetPropertyEnum } from './item.class';

export function validateItemProperties(item: Item): string[] {
  const errors: string[] = [];

  if (!item.name || typeof item.name !== 'string' || item.name.trim() === '') {
    errors.push("Invalid or missing 'name' property.");
  }

  if (typeof item.cost !== 'number' || item.cost < 0) {
    errors.push("Invalid 'cost' property. Must be a non-negative number.");
  }

  if (typeof item.level !== 'number' || item.level < 0) {
    errors.push("Invalid 'level' property. Must be a non-negative number.");
  }

  if (
    !item.description ||
    typeof item.description !== 'string' ||
    item.description.trim() === ''
  ) {
    errors.push("Invalid or missing 'description' property.");
  }

  if (!Array.isArray(item.effects)) {
    errors.push("Invalid or missing 'effect' property. Must be an array.");
  } else if (item.effects.length === 0) {
    errors.push("Invalid 'effect' property. Must have at least one effect");
  } else {
    item.effects.forEach((effect, index) => {
      const effectErrors = validateItemEffects(effect, index);
      errors.push(...effectErrors);
    });
  }

  return errors;
}

function validateItemEffects(effect: ItemEffect, index: number): string[] {
  const errors: string[] = [];

  if (typeof effect !== 'object' || effect === null) {
    errors.push(
      `Invalid 'effect' at index ${index}. Effect must be an object.`,
    );
    return errors;
  }

  if (
    !effect.targetProperty ||
    typeof effect.targetProperty !== 'string' ||
    !Object.values(ItemTargetPropertyEnum).includes(
      effect.targetProperty as ItemTargetPropertyEnum,
    )
  ) {
    errors.push(
      `Invalid 'targetProperty' property at index ${index}. Must be a valid SkillTargetPropertyEnum.`,
    );
  }

  if (typeof effect.value !== 'number') {
    errors.push(
      `Invalid 'value' property at index ${index}. Must be a number.`,
    );
  }

  return errors;
}
