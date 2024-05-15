import {IProjet} from "../projets/projet.model";
import {ITask} from "../tasks/task.model";

export interface IUser {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  Tasks?: ITask[] | null;

}

export class User implements IUser {
  constructor(public id?: number,
              public username?: string,
              public password?: string,

              public email?: string,
              public firstName?: string,
              public lastName?: string,
              public Tasks?: ITask[] | null,
  ) {
  }
}
