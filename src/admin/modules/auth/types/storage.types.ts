/**
 * Interface Segregation & Dependency Inversion Principle (SOLID):
 * Storage interface contract decoupled from specific storage implementations.
 */
export interface IStorageService<T> {
  /**
   * Retrieves data from the storage provider, parsed from JSON.
   */
  get(): T | null;

  /**
   * Serializes data to JSON and persists it.
   */
  save(data: T): void;

  /**
   * Removes persisted JSON data.
   */
  remove(): void;

  /**
   * Checks whether persisted data exists.
   */
  exists(): boolean;
}
