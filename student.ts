import type { Grade } from "./contracts";
import { Person } from "./person";

export class Student extends Person {
  private readonly _grades: Grade[] = [];

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    public readonly studentCardNumber: string
  ) {
    super(id, firstName, lastName, email);
  }

  addGrade(grade: Grade): void {
    if (grade.score < 0 || grade.score > 100) {
      throw new Error("Оцінка повинна бути в діапазоні від 0 до 100");
    }
    this._grades.push(grade);
  }

  getGrades(): readonly Grade[] {
    return [...this._grades];
  }

  calculateGPA(): number {
    if (this._grades.length === 0) return 0;
    const total = this._grades.reduce((sum, g) => sum + g.score, 0);
    return Number((total / this._grades.length).toFixed(2));
  }

  override getRoleDescription(): string {
    return `Студент (квиток: ${this.studentCardNumber}), середній бал: ${this.calculateGPA()}`;
  }
}
