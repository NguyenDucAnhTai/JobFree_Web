import type { IStorageService } from '../types/storage.types';

/**
 * SOLID - Single Responsibility & Liskov Substitution Principle:
 * JsonLocalStorageService handles persisting and retrieving strongly typed JSON data
 * to/from browser localStorage safely.
 */
export class JsonLocalStorageService<T> implements IStorageService<T> {
  private readonly storageKey: string;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }

  public get(): T | null {
    if (typeof window === 'undefined' || !window.localStorage) {
      return null;
    }

    try {
      const raw = window.localStorage.getItem(this.storageKey);
      if (!raw) return null;
      return JSON.parse(raw) as T;
    } catch (error) {
      console.warn(`[JsonLocalStorageService] Failed to parse JSON from key "${this.storageKey}":`, error);
      return null;
    }
  }

  public save(data: T): void {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    try {
      const serialized = JSON.stringify(data, null, 2);
      window.localStorage.setItem(this.storageKey, serialized);
    } catch (error) {
      console.error(`[JsonLocalStorageService] Failed to save JSON to key "${this.storageKey}":`, error);
    }
  }

  public remove(): void {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    try {
      window.localStorage.removeItem(this.storageKey);
    } catch (error) {
      console.error(`[JsonLocalStorageService] Failed to remove key "${this.storageKey}":`, error);
    }
  }

  public exists(): boolean {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    return window.localStorage.getItem(this.storageKey) !== null;
  }
}

/**
 * SOLID - Liskov Substitution Principle:
 * InMemory alternative implementation used for testing or SSR environments.
 */
export class InMemoryJsonStorageService<T> implements IStorageService<T> {
  private memoryStore: Map<string, string> = new Map();
  private readonly storageKey: string;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }

  public get(): T | null {
    const raw = this.memoryStore.get(this.storageKey);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  public save(data: T): void {
    this.memoryStore.set(this.storageKey, JSON.stringify(data));
  }

  public remove(): void {
    this.memoryStore.delete(this.storageKey);
  }

  public exists(): boolean {
    return this.memoryStore.has(this.storageKey);
  }
}
