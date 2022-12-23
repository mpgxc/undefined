import { randomUUID } from 'node:crypto';

abstract class Entity<T = unknown> {
  protected readonly _id: string;
  protected readonly _props: T;

  protected constructor(props: T, id?: string) {
    this._props = props;
    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
  }
}

export { Entity };
