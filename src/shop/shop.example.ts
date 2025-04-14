import { Shop } from './shop.class';
import { ItemTypeEnum } from '../items/item.class';
import { CharacterUpdatableNumberProperties } from '../core/character/character.class';

export const ShopExamples: Shop[] = [
  {
    name: "Warrior's goods",
    shopkeeper_description: 'Old man selling tools and weapons for any warrior',
    goods: [
      {
        name: 'Bastard sword',
        type: ItemTypeEnum.equipment,
        description: 'Short sword able to cut through any foe',
        cost: 10,
        level: 1,
        effects: [
          {
            value: 5,
            targetProperty: CharacterUpdatableNumberProperties.attack,
          },
        ],
      },
    ],
  },
];
