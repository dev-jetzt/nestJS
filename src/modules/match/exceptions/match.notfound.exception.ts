import { NotFoundException } from '@nestjs/common';

export class MatchNotFoundException extends NotFoundException {
    constructor() {
        super('The match could not be found');
    }
}