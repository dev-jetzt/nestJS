import { Injectable } from '@nestjs/common';
import { Person } from 'dto/person.dto';

@Injectable()
export class AppService {

  private iAmADatabaseNow: Person[] = [];

  public getPeople(): Person[] {
    return this.iAmADatabaseNow;
  }

  public postPerson(person: Person): string {
    this.iAmADatabaseNow.push(person);
    const {firstName, lastName, age} = person;
    return `I got the person ${firstName} ${lastName} which is ${age} years old.`;
  }

}
