import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { DishService } from './dish.service'
import { CreateDishDto } from './dto/create-dish.dto'
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Dish } from './schemas/dish.schema'
import { Tags } from './schemas/tags.schema'
import { CreateTagDto } from './dto/create-tag.dto'
import { Perms } from '../guards/perms.guard'

@ApiTags('Plats (Dishes)')
@Controller('dish')
export class DishController {
	constructor(private readonly dishService: DishService) {}

	@ApiQuery({ description: 'Create a new dish.<br>Perm: dish.create' })
	@ApiResponse({ type: Dish })
	@Post()
	@Perms('dish.create')
	create(@Body() createDishDto: CreateDishDto): Promise<Dish> {
		return this.dishService.create(createDishDto)
	}

	@ApiQuery({ description: 'Find all dishes.<br>Perm: dish.see' })
	@ApiResponse({ type: Dish, isArray: true })
	@Get()
	@Perms('dish.see')
	findAll(): Promise<Dish[]> {
		return this.dishService.findAll()
	}

	@ApiQuery({ description: 'Find one dish by id.<br>Perm: dish.see' })
	@ApiResponse({ type: Dish, isArray: true })
	@Get(':id')
	findOne(@Param('id') id: string): Promise<Dish> {
		return this.dishService.findOne(id)
	}

	@ApiQuery({ description: 'Search a dish with name.<br>Perm: dish.see' })
	@ApiResponse({ type: Dish, isArray: true })
	@Get('search/:key')
	search(@Param('key') key: string): Promise<Dish[]> {
		return this.dishService.search(key)
	}

	@ApiQuery({ description: 'Delete a dish.<br>Perm: dish.delete' })
	@ApiResponse({ type: Dish })
	@Delete(':id')
	@Perms('dish.delete')
	delete(@Param('id') id: string): Promise<Dish> {
		return this.dishService.delete(id)
	}

	/* ### TAGS ### */
	@ApiQuery({ description: 'Find all tags.<br>Perm: dish.tags.see' })
	@ApiResponse({ type: Tags, isArray: true })
	@Get('tags')
	@Perms('dish.tags.see')
	findAllTags(): Promise<Tags[]> {
		return this.dishService.findAllTags()
	}

	@ApiQuery({ description: 'Create a new dish tag.<br>Perm: dish.tags.create' })
	@ApiResponse({ type: Tags })
	@Post('tags')
	@Perms('dish.tags.create')
	createTag(@Body() createTagDto: CreateTagDto): Promise<Tags> {
		return this.dishService.createTag(createTagDto)
	}

	@ApiQuery({ description: 'Search a specific tag.<br>Perm: dish.tags.see' })
	@ApiResponse({ type: Tags, isArray: true })
	@Get('tags/search/:key')
	@Perms('dish.tags.see')
	searchTag(@Param('key') key: string): Promise<Tags[]> {
		return this.dishService.searchTags(key)
	}

	@ApiQuery({ description: 'Find all dishes sort by count.<br>Perm: dish.tags.see' })
	@ApiResponse({ type: Tags, isArray: true })
	@Get('tags/best')
	@Perms('dish.tags.see')
	findBest(): Promise<Tags[]> {
		return this.dishService.findBest()
	}
}
