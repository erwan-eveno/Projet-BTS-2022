import { HttpException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateMenuDto } from './dto/create-menu.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Menu, MenuDocument } from './schemas/menu.schema'
import { DishService } from '../dish/dish.service'

@Injectable()
export class MenusService {
	constructor(@InjectModel(Menu.name) private menuModel: Model<MenuDocument>, private dishService: DishService) {}

	async create(createMenuDto: CreateMenuDto): Promise<Menu> {
		for (let i: number = 0; i < createMenuDto.starter.length; i++) {
			if (!(await this.dishService.isDishExist(createMenuDto.starter[i])))
				throw new HttpException("Une des entrées n'existe pas.", 400)
		}
		for (let i: number = 0; i < createMenuDto.dish.length; i++) {
			if (!(await this.dishService.isDishExist(createMenuDto.dish[i])))
				throw new HttpException("Un des plats n'existe pas.", 400)
		}
		for (let i: number = 0; i < createMenuDto.dessert.length; i++) {
			if (!(await this.dishService.isDishExist(createMenuDto.dessert[i])))
				throw new HttpException("Un des desserts n'existe pas.", 400)
		}

		createMenuDto.title = createMenuDto.title.toLowerCase()

		const newMenu = new this.menuModel(createMenuDto)
		return newMenu.save()
	}

	async findAll(): Promise<Menu[]> {
		return this.menuModel.find()
	}

	async search(title: string): Promise<Menu> {
		const a = this.menuModel.findOne({ title: new RegExp(title) })
		if (!a) throw new NotFoundException()
		return a
	}

	async delete(id: string): Promise<Menu> {
		return this.menuModel.findByIdAndDelete({ _id: id })
	}
}
