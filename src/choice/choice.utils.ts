import { Choice, ChoiceTypeEnum } from './choice.class';

export function validateChoicesProperties(choices: Choice[]): string[] {
  const errors: string[] = [];

  if (!Array.isArray(choices)) {
    errors.push("Invalid 'goods' property. Must be an array.");
  } else {
    choices.forEach((choice: Choice, index) => {
      const itemErrors = validateChoiceProperties(choice);
      if (itemErrors.length > 0) {
        errors.push(
          ...itemErrors.map(
            (error) => `Error in choice at index ${index}: ${error}`,
          ),
        );
      }
    });
  }

  return errors;
}

export function validateChoiceProperties(choice: Choice): string[] {
  const errors: string[] = [];

  if (
    !choice.title ||
    typeof choice.title !== 'string' ||
    choice.title.trim() === ''
  ) {
    errors.push("Invalid or missing 'title' property.");
  }

  if (
    !choice.description ||
    typeof choice.description !== 'string' ||
    choice.description.trim() === ''
  ) {
    errors.push("Invalid or missing 'description' property.");
  }

  if (
    !choice.type ||
    typeof choice.type !== 'string' ||
    !Object.values(ChoiceTypeEnum).includes(choice.type as ChoiceTypeEnum)
  ) {
    errors.push(`Invalid 'type' property. Must be a valid ChoiceTypeEnum.`);
  }

  return errors;
}
