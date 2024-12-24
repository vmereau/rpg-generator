// src/exceptions/no-valid-monsters.exception.ts

import { HttpException, HttpStatus } from '@nestjs/common';

export class NoValidSkillException extends HttpException {
  constructor(errors?: string[]) {
    super('No valid skill was created. Try again' + errors, HttpStatus.BAD_REQUEST);
  }
}
