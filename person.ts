import type { Identifiable } from "./contracts";

export abstract class Person implements Identifiable {
  private _email: string;

  constructor(
    public readonly id: string,
    public firstName: string,
    public lastName: string,
    email: string
  ) {
    this._email = Person.validateEmail(email);
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = Person.validateEmail(value);
  }

  abstract getRoleDescription(): string;

  private static validateEmail(value: string): string {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      throw new Error(`Невалідний email: ${value}`);
    }
    return value;
  }
}
