// src/exceptions/no-valid-monsters.exception.ts

import { HttpException, HttpStatus } from '@nestjs/common';

export class CharacterNotValidException extends HttpException {
  constructor(errors?: string[]) {
    super(
      'No valid character was generated. Try again' + errors,
      HttpStatus.BAD_REQUEST
    );
  }
}
