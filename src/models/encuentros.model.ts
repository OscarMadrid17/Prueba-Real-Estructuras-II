import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Encuentros extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  resultado: string;

  @property({
    type: 'string',
    required: true,
  })
  tiempo: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Encuentros>) {
    super(data);
  }
}

export interface EncuentrosRelations {
  // describe navigational properties here
}

export type EncuentrosWithRelations = Encuentros & EncuentrosRelations;
