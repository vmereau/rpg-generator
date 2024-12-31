import { Armor, Item, Weapon } from './item.class';

type ItemType = Item | Weapon | Armor;

export function validateItemProperties(item: ItemType): string[] {
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

  if (item instanceof Weapon) {
    if (typeof item.damage !== 'number' || item.damage < 0) {
      errors.push("Invalid 'damage' property. Must be a non-negative number.");
    }
  }

  if (item instanceof Armor) {
    if (typeof item.defense !== 'number' || item.defense < 0) {
      errors.push("Invalid 'defense' property. Must be a non-negative number.");
    }
  }

  return errors;
}
