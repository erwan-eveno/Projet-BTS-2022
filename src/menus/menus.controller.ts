import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common'
import { MenusService } from './menus.service'
import { CreateMenuDto } from './dto/create-menu.dto'
import { Menu } from './schemas/menu.schema'
import { Perms } from '../guards/perms.guard'
import {ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger'

@ApiTags('Menus')
@Controller('menus')
export class MenusController {
	constructor(private readonly menusService: MenusService) {}

	@ApiQuery({ description: 'Create a new menu.<br>Perm: menu.create' })
	@ApiResponse({ type: Menu })
	@Perms('menus.create')
	@Post()
	create(@Body() createMenuDto: CreateMenuDto): Promise<Menu> {
		return this.menusService.create(createMenuDto)
	}

	@ApiQuery({ description: 'Find all menus.<br>Perm: menu.see' })
	@ApiResponse({ type: Menu, isArray: true })
	@Get()
	findAll(): Promise<Menu[]> {
		return this.menusService.findAll()
	}

	@ApiQuery({ description: 'Search a menu by title.<br>Perm: menu.see' })
	@ApiResponse({ type: Menu })
	@Get('search')
	search(@Query('title') title: string): Promise<Menu> {
		return this.menusService.search(title)
	}

	@ApiQuery({ description: 'Delete a menu by id.<br>Perm: menu.delete' })
	@ApiResponse({ type: Menu })
	@Perms('menus.delete')
	@Delete(':id')
	delete(@Param('id') id: string): Promise<Menu> {
		return this.menusService.delete(id)
	}
}
