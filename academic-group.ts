import type { Identifiable } from "./contracts";
import type { Student } from "./student";
import type { Teacher } from "./teacher";

export class AcademicGroup implements Identifiable {
  private readonly _students = new Map<string, Student>();

  constructor(
    public readonly id: string,
    public name: string,
    public curator?: Teacher
  ) {}

  addStudent(student: Student): void {
    if (this._students.has(student.id)) {
      throw new Error(`Студент ${student.fullName} вже є в групі ${this.name}`);
    }
    this._students.set(student.id, student);
  }

  removeStudent(studentId: string): boolean {
    return this._students.delete(studentId);
  }

  getStudents(): readonly Student[] {
    return Array.from(this._students.values());
  }

  getGroupAverageScore(): number {
    const students = this.getStudents();
    if (students.length === 0) return 0;
    const total = students.reduce((sum, s) => sum + s.calculateGPA(), 0);
    return Number((total / students.length).toFixed(2));
  }
}
