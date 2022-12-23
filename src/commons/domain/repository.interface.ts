import { Entity } from '@commons/domain/entity';

import { Maybe } from '../logic';

interface IRepository<T extends Entity, Response> {
  delete(id: string): Promise<void>;

  create(data: T): Promise<void>;

  update(data: T): Promise<void>;

  list(): Promise<Array<Response>>;

  findById(id: string): Promise<Maybe<Entity>>;
}

export { IRepository };
