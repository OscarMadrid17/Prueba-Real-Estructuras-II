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
import {Encuentros} from '../models';
import {EncuentrosRepository} from '../repositories';

export class EncuentrosController {
  constructor(
    @repository(EncuentrosRepository)
    public encuentrosRepository : EncuentrosRepository,
  ) {}

  @post('/encuentros')
  @response(200, {
    description: 'Encuentros model instance',
    content: {'application/json': {schema: getModelSchemaRef(Encuentros)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Encuentros, {
            title: 'NewEncuentros',
            exclude: ['id'],
          }),
        },
      },
    })
    encuentros: Omit<Encuentros, 'id'>,
  ): Promise<Encuentros> {
    return this.encuentrosRepository.create(encuentros);
  }

  @get('/encuentros/count')
  @response(200, {
    description: 'Encuentros model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Encuentros) where?: Where<Encuentros>,
  ): Promise<Count> {
    return this.encuentrosRepository.count(where);
  }

  @get('/encuentros')
  @response(200, {
    description: 'Array of Encuentros model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Encuentros, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Encuentros) filter?: Filter<Encuentros>,
  ): Promise<Encuentros[]> {
    return this.encuentrosRepository.find(filter);
  }

  @patch('/encuentros')
  @response(200, {
    description: 'Encuentros PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Encuentros, {partial: true}),
        },
      },
    })
    encuentros: Encuentros,
    @param.where(Encuentros) where?: Where<Encuentros>,
  ): Promise<Count> {
    return this.encuentrosRepository.updateAll(encuentros, where);
  }

  @get('/encuentros/{id}')
  @response(200, {
    description: 'Encuentros model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Encuentros, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Encuentros, {exclude: 'where'}) filter?: FilterExcludingWhere<Encuentros>
  ): Promise<Encuentros> {
    return this.encuentrosRepository.findById(id, filter);
  }

  @patch('/encuentros/{id}')
  @response(204, {
    description: 'Encuentros PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Encuentros, {partial: true}),
        },
      },
    })
    encuentros: Encuentros,
  ): Promise<void> {
    await this.encuentrosRepository.updateById(id, encuentros);
  }

  @put('/encuentros/{id}')
  @response(204, {
    description: 'Encuentros PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() encuentros: Encuentros,
  ): Promise<void> {
    await this.encuentrosRepository.replaceById(id, encuentros);
  }

  @del('/encuentros/{id}')
  @response(204, {
    description: 'Encuentros DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.encuentrosRepository.deleteById(id);
  }
}
