// src/exceptions/no-valid-monsters.exception.ts

import { HttpException, HttpStatus } from '@nestjs/common';

export class NoValidStoryException extends HttpException {
  constructor(errors?: string[]) {
    super('No valid story was created. Try again' + errors, HttpStatus.BAD_REQUEST);
  }
}
