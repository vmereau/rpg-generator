// src/exceptions/no-valid-monsters.exception.ts

import { HttpException, HttpStatus } from '@nestjs/common';

export class NoValidShopException extends HttpException {
  constructor(errors?: string[]) {
    super(
      'No valid shop was created. Try again' + errors,
      HttpStatus.BAD_REQUEST,
    );
  }
}
