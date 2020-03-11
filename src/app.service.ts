import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  sayHelloToName(title: string, name: string): string {
    const renderedTitle = title || '';
    return `Hello ${renderedTitle} ${name}`;
  }

}
