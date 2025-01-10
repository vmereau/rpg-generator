import { validateItemProperties } from '../items/item.utils';
import { Shop } from './shop.class';
import { Item } from '../items/item.class';

export function validateShopProperties(shop: Shop): string[] {
  const errors: string[] = [];

  if (!shop.name || typeof shop.name !== 'string' || shop.name.trim() === '') {
    errors.push("Invalid or missing 'name' property.");
  }

  if (
    !shop.shopkeeper_description ||
    typeof shop.shopkeeper_description !== 'string' ||
    shop.shopkeeper_description.trim() === ''
  ) {
    errors.push("Invalid or missing 'shopkeeper_description' property.");
  }

  if (!Array.isArray(shop.goods)) {
    errors.push("Invalid 'goods' property. Must be an array.");
  } else {
    shop.goods.forEach((item: Item, index) => {
      const itemErrors = validateItemProperties(item);
      if (itemErrors.length > 0) {
        errors.push(
          ...itemErrors.map(
            error => `Error in goods at index ${index}: ${error}`
          )
        );
      }
    });
  }

  return errors;
}
