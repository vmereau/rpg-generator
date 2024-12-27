export enum ChoiceType {
  Fight= "Fight",
  Elite_fight = "Elite_fight",
  Treasure = "Treasure", // Strong item
  Power = "Power", // new skill
  Shop = "Shop",
  Other_choices = "Other_choices"
}

export class Choice  {
  title: string;
  description: string;
  type: ChoiceType;
}
