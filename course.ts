import type { Identifiable } from "./contracts";
import type { Teacher } from "./teacher";


export class Course implements Identifiable {
  constructor(
    public readonly id: string,
    public title: string,
    public credits: number,
    private _instructor: Teacher
  ) {}

  get instructor(): Teacher {
    return this._instructor;
  }

  reassignInstructor(newInstructor: Teacher): void {
    this._instructor = newInstructor;
  }
}
