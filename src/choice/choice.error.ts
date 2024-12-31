// src/exceptions/no-valid-monsters.exception.ts

import { HttpException, HttpStatus } from '@nestjs/common';

export class NoValidChoice extends HttpException {
  constructor(errors?: string[]) {
    super(
      'No valid choice was created. Try again' + errors,
      HttpStatus.BAD_REQUEST,
    );
  }
}