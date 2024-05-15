import {IProjet} from "../projets/projet.model";
import {IUser} from "../users/user.model";

export interface ITask  {
  id?: number;
  name?: string;
  description?: string;
  dateCreated?: Date;
  dateFin?: Date;
  etatTask?:string;
  projet?: IProjet;
  user?:IUser | null;
  username?: string ;


}

export class Task  implements ITask {
  constructor(public id?: number,
              public name?: string,
              public description?: string,
              public dateCreated?: Date,
              public dateFin?: Date,
              public etatTask ?: string,
              public projet ?: IProjet,
              public user ?:IUser | null,
              public username?: string,

  ) {}
}
