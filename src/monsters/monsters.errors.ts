// src/exceptions/no-valid-monsters.exception.ts

import { HttpException, HttpStatus } from '@nestjs/common';

export class NoValidMonstersException extends HttpException {
  constructor() {
    super('No valid monsters were generated. Try again', HttpStatus.BAD_REQUEST);
  }
}
