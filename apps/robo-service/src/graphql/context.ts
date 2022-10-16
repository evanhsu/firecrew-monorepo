import { db } from '../database/db';
import { PersonService } from '../domain/person/personService';

export const context = {
  db,
  services: {
    personService: new PersonService(db),
  },
};

export type Context = typeof context;
