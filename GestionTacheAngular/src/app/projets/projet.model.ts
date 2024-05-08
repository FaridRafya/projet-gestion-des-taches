import {ITask} from "../tasks/task.model";

export interface IProjet  {
  id?: number;
  name?: string;
  description?: string;
 tasks?:ITask[] | null;

}

export class Projet  implements IProjet {
  constructor(public id?: number,
              public name?: string,
              public description?: string,
              public tasks?:ITask[] | null

  ) {}
}
