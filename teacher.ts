import type { AcademicTitle } from "./contracts";
import { Person } from "./person";

export abstract class Teacher extends Person {
  constructor(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    public readonly academicTitle: AcademicTitle,
    protected readonly baseSalary: number
  ) {
    super(id, firstName, lastName, email);
    if (baseSalary < 0) {
      throw new Error("Базова ставка не може бути від'ємною");
    }
  }

  abstract getWorkloadCoefficient(): number;

  calculateSalary(): number {
    return this.baseSalary * this.getWorkloadCoefficient();
  }
}


export class Professor extends Teacher {
  constructor(id: string, firstName: string, lastName: string, email: string, baseSalary: number) {
    super(id, firstName, lastName, email, "Professor", baseSalary);
  }

  override getWorkloadCoefficient(): number {
    return 1.5;
  }

  override getRoleDescription(): string {
    return `Професор кафедри (${this.fullName})`;
  }
}


export class AssociateProfessor extends Teacher {
  constructor(id: string, firstName: string, lastName: string, email: string, baseSalary: number) {
    super(id, firstName, lastName, email, "AssociateProfessor", baseSalary);
  }

  override getWorkloadCoefficient(): number {
    return 1.25;
  }

  override getRoleDescription(): string {
    return `Доцент кафедри (${this.fullName})`;
  }
}
