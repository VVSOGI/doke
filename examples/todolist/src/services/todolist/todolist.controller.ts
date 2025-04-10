import { Controller, Get, Patch, Post, Query } from '@nestjs/common'
import { TodolistService } from './todolist.service'
import {
  CreateTodolistDto,
  TodolistResponseType,
  GetTodolistsByDatesResponseType,
  GetTodolistsResponseType,
  UpdateTodolistDto,
  UpdateTodolistOrderDto,
  UpdateTodolistsOrderResponseType,
  GetTodolistDto,
  GetTodolistDatesDto
} from './types'
import {
  ValidateCreateTodolistDTO,
  ValidateGetTodolistCheckedDTO,
  ValidateUpdateTodolistDto,
  ValidateUpdateTodolistOrderDTO
} from './decorator'
import {
  DocsCreateTodolist,
  DocsGetTodolist,
  DocsGetTodolistByDate,
  DocsGetTodolistById,
  DocsUpdateTodolist,
  DocsUpdateTodolistOrder
} from './decorator/custom-docs'
import { CategoryIdParamsDto, ValidateIdParamDTO } from '../common'
import { ApiDocsController } from 'doke-nest'

@ApiDocsController({
  description: 'Todolist management API endpoints',
  tags: ['Todolist']
})
@Controller('todolist')
export class TodolistController {
  constructor(private todolistService: TodolistService) {}

  @Post()
  @DocsCreateTodolist()
  async createTodolist(@ValidateCreateTodolistDTO() createTodolistDto: CreateTodolistDto): Promise<TodolistResponseType> {
    return this.todolistService.createTodolist(createTodolistDto)
  }

  @Get()
  @DocsGetTodolist()
  async getTodolists(): Promise<GetTodolistsResponseType> {
    return this.todolistService.getTodolists()
  }

  @Get(':categoryId')
  @DocsGetTodolistById()
  async getTodolistsByCategoryId(
    @ValidateIdParamDTO() getCategoryDto: CategoryIdParamsDto,
    @ValidateGetTodolistCheckedDTO() checked?: GetTodolistDto
  ): Promise<GetTodolistsResponseType> {
    const { categoryId } = getCategoryDto
    let isChecked: boolean
    if (checked === 'true') {
      isChecked = true
    } else {
      isChecked = false
    }
    return this.todolistService.getTodolistsByCategoryId({ categoryId, checked: isChecked })
  }

  @Get('/dates/:categoryId')
  @DocsGetTodolistByDate()
  async getTodolistsByDate(
    @ValidateIdParamDTO() getCategoryDto: CategoryIdParamsDto,
    @Query('checked') checked: GetTodolistDatesDto = 'true'
  ): Promise<GetTodolistsByDatesResponseType> {
    return this.todolistService.getTodolistsByDate(getCategoryDto.categoryId, checked)
  }

  @Patch()
  @DocsUpdateTodolist()
  async updateTodo(@ValidateUpdateTodolistDto() updateTodolistDto: UpdateTodolistDto): Promise<TodolistResponseType> {
    return this.todolistService.updateTodolist(updateTodolistDto)
  }

  @Patch('/order')
  @DocsUpdateTodolistOrder()
  async updateTodoOrder(
    @ValidateUpdateTodolistOrderDTO() updateTodolistOrderDto: UpdateTodolistOrderDto[]
  ): Promise<UpdateTodolistsOrderResponseType> {
    return this.todolistService.updateTodolistOrder(updateTodolistOrderDto)
  }
}
