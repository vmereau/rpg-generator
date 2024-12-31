import { Item } from '../items/item.class';

export class Shop {
  id: number;
  name: string;
  shopkeeper_description: string;
  goods: Item[];
}
