import { db, Db } from '../database/db';

export interface Context {
  db: Db;
}

export const context: Context = {
  db,
};
