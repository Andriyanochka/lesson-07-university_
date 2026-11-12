import type { Identifiable } from "./contracts";
import { AcademicGroup } from "./academic-group";
import type { Teacher } from "./teacher";

/**
 * КОМПОЗИЦІЯ: факультет сам створює групи (new AcademicGroup лише тут)
 * і не віддає зовні можливість додати "чужу" групу.
 * Видалили факультет - зникли й його групи.
 */
export class Faculty implements Identifiable {
  private readonly _groups = new Map<string, AcademicGroup>();

  constructor(
    public readonly id: string,
    public name: string
  ) {}

  createGroup(id: string, name: string, curator?: Teacher): AcademicGroup {
    if (this._groups.has(id)) {
      throw new Error(`Група ${id} вже існує на факультеті ${this.name}`);
    }
    const group = new AcademicGroup(id, name, curator);
    this._groups.set(id, group);
    return group;
  }

  removeGroup(groupId: string): boolean {
    return this._groups.delete(groupId);
  }

  findGroupById(groupId: string): AcademicGroup | undefined {
    return this._groups.get(groupId);
  }

  getAllGroups(): readonly AcademicGroup[] {
    return Array.from(this._groups.values());
  }
}
