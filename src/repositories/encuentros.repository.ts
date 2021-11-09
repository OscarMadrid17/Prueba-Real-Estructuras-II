import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Encuentros, EncuentrosRelations} from '../models';

export class EncuentrosRepository extends DefaultCrudRepository<
  Encuentros,
  typeof Encuentros.prototype.id,
  EncuentrosRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Encuentros, dataSource);
  }
}
