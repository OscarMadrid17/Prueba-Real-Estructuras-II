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
import {Estadio} from '../models';
import {EstadioRepository} from '../repositories';

export class EstadioController {
  constructor(
    @repository(EstadioRepository)
    public estadioRepository : EstadioRepository,
  ) {}

  @post('/estadios')
  @response(200, {
    description: 'Estadio model instance',
    content: {'application/json': {schema: getModelSchemaRef(Estadio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estadio, {
            title: 'NewEstadio',
            exclude: ['id'],
          }),
        },
      },
    })
    estadio: Omit<Estadio, 'id'>,
  ): Promise<Estadio> {
    return this.estadioRepository.create(estadio);
  }

  @get('/estadios/count')
  @response(200, {
    description: 'Estadio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Estadio) where?: Where<Estadio>,
  ): Promise<Count> {
    return this.estadioRepository.count(where);
  }

  @get('/estadios')
  @response(200, {
    description: 'Array of Estadio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Estadio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Estadio) filter?: Filter<Estadio>,
  ): Promise<Estadio[]> {
    return this.estadioRepository.find(filter);
  }

  @patch('/estadios')
  @response(200, {
    description: 'Estadio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estadio, {partial: true}),
        },
      },
    })
    estadio: Estadio,
    @param.where(Estadio) where?: Where<Estadio>,
  ): Promise<Count> {
    return this.estadioRepository.updateAll(estadio, where);
  }

  @get('/estadios/{id}')
  @response(200, {
    description: 'Estadio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Estadio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Estadio, {exclude: 'where'}) filter?: FilterExcludingWhere<Estadio>
  ): Promise<Estadio> {
    return this.estadioRepository.findById(id, filter);
  }

  @patch('/estadios/{id}')
  @response(204, {
    description: 'Estadio PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estadio, {partial: true}),
        },
      },
    })
    estadio: Estadio,
  ): Promise<void> {
    await this.estadioRepository.updateById(id, estadio);
  }

  @put('/estadios/{id}')
  @response(204, {
    description: 'Estadio PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() estadio: Estadio,
  ): Promise<void> {
    await this.estadioRepository.replaceById(id, estadio);
  }

  @del('/estadios/{id}')
  @response(204, {
    description: 'Estadio DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.estadioRepository.deleteById(id);
  }
}
