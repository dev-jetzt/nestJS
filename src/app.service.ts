import { Injectable } from '@nestjs/common';
import { Person } from 'dto/person.dto';

@Injectable()
export class AppService {

  sayHelloToName(title: string, name: string): string {
    const renderedTitle = title || '';
    return `Hello ${renderedTitle} ${name}`;
  }

  public postPerson(person: Person): string {
    const {firstName, lastName, age} = person;
    return `I got the person ${firstName} ${lastName} which is ${age} years old.`;
  }

}
