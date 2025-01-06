export enum ChoiceTypeEnum {
  Fight = 'Fight',
  Elite_fight = 'Elite_fight',
  Treasure = 'Treasure', // Strong item
  Power = 'Power', // new skill
  Shop = 'Shop',
  Choices = 'Choices',
}

export class Choice {
  title: string;
  description: string;
  type: ChoiceTypeEnum;
}
