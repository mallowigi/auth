import { uniqueId } from 'lodash';

export class User {
  id: number;
  private username: string;
  private password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
    this.id = Number(uniqueId());
  }

}