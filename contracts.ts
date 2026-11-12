export interface Identifiable {
  readonly id: string;
}

export type AcademicTitle = "Assistant" | "AssociateProfessor" | "Professor";

export interface Grade {
  readonly courseId: string;
  readonly score: number;
  readonly date: Date;
}


export interface IRepository<T extends Identifiable, ID = string> {
  save(entity: T): Promise<void>;
  findById(id: ID): Promise<T | null>;
  findAll(): Promise<T[]>;
  delete(id: ID): Promise<boolean>;
}
