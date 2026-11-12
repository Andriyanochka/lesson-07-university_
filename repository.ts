import type { Identifiable, IRepository } from "./contracts";

export class InMemoryRepository<T extends Identifiable> implements IRepository<T, string> {
  private readonly _items = new Map<string, T>();

  async save(entity: T): Promise<void> {
    this._items.set(entity.id, entity);
  }

  async findById(id: string): Promise<T | null> {
    return this._items.get(id) ?? null;
  }

  async findAll(): Promise<T[]> {
    return Array.from(this._items.values());
  }

  async delete(id: string): Promise<boolean> {
    return this._items.delete(id);
  }
}
