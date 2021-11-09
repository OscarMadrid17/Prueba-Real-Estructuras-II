import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Equipos} from '../models';
import {EquiposRepository} from '../repositories';

export class EquiposController {
  constructor(
    @repository(EquiposRepository)
    public equiposRepository : EquiposRepository,
  ) {}

  @post('/equipos')
  @response(200, {
    description: 'Equipos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Equipos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Equipos, {
            title: 'NewEquipos',
            exclude: ['id'],
          }),
        },
      },
    })
    equipos: Omit<Equipos, 'id'>,
  ): Promise<Equipos> {
    return this.equiposRepository.create(equipos);
  }

  @get('/equipos/count')
  @response(200, {
    description: 'Equipos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Equipos) where?: Where<Equipos>,
  ): Promise<Count> {
    return this.equiposRepository.count(where);
  }

  @get('/equipos')
  @response(200, {
    description: 'Array of Equipos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Equipos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Equipos) filter?: Filter<Equipos>,
  ): Promise<Equipos[]> {
    return this.equiposRepository.find(filter);
  }

  @patch('/equipos')
  @response(200, {
    description: 'Equipos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Equipos, {partial: true}),
        },
      },
    })
    equipos: Equipos,
    @param.where(Equipos) where?: Where<Equipos>,
  ): Promise<Count> {
    return this.equiposRepository.updateAll(equipos, where);
  }

  @get('/equipos/{id}')
  @response(200, {
    description: 'Equipos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Equipos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Equipos, {exclude: 'where'}) filter?: FilterExcludingWhere<Equipos>
  ): Promise<Equipos> {
    return this.equiposRepository.findById(id, filter);
  }

  @patch('/equipos/{id}')
  @response(204, {
    description: 'Equipos PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Equipos, {partial: true}),
        },
      },
    })
    equipos: Equipos,
  ): Promise<void> {
    await this.equiposRepository.updateById(id, equipos);
  }

  @put('/equipos/{id}')
  @response(204, {
    description: 'Equipos PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() equipos: Equipos,
  ): Promise<void> {
    await this.equiposRepository.replaceById(id, equipos);
  }

  @del('/equipos/{id}')
  @response(204, {
    description: 'Equipos DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.equiposRepository.deleteById(id);
  }
}
