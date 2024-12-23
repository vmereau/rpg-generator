import {Story} from "./story.service";

/**
 * Validates a Story object's properties.
 * @param {Story} story The Story object to validate.
 * @returns {string[]} An array of error messages. Returns empty array if valid.
 */
export function validateStoryProperties(story: Story): string[] {
  const errors: string[] = [];

  if (typeof story !== 'object' || story === null) {
    errors.push('Story must be an object.');
    return errors;
  }

  if (!story.name || typeof story.name !== 'string' || story.name.trim() === '') {
    errors.push("Invalid or missing 'name' property. Must be a non-empty string.");
  }

  if (!story.story_summary || typeof story.story_summary !== 'string' || story.story_summary.trim() === '') {
    errors.push("Invalid or missing 'story_summary' property. Must be a non-empty string.");
  }

  if (!story.biome || typeof story.biome !== 'string' || story.biome.trim() === '') {
    errors.push("Invalid or missing 'biome' property. Must be a non-empty string.");
  }

  if (!story.boss_name || typeof story.boss_name !== 'string' || story.boss_name.trim() === '') {
    errors.push("Invalid or missing 'boss_name' property. Must be a non-empty string.");
  }

  if (!Array.isArray(story.adventurers_names)) {
    errors.push("Invalid 'adventurers_names' property. Must be an array.");
  } else {
    if(story.adventurers_names.length === 0){
      errors.push("Invalid 'adventurers_names' property. Can not be empty.")
    } else {
      story.adventurers_names.forEach((name, index) => {
        if (typeof name !== 'string' || name.trim() === '') {
          errors.push(`Invalid adventurer_names item at index ${index}: Must be a non-empty string.`);
        }
      });
    }
  }

  return errors;
}
