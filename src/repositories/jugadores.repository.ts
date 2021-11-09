import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Jugadores, JugadoresRelations} from '../models';

export class JugadoresRepository extends DefaultCrudRepository<
  Jugadores,
  typeof Jugadores.prototype.id,
  JugadoresRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Jugadores, dataSource);
  }
}
