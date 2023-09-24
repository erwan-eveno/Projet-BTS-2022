import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Dish, DishDocument } from './schemas/dish.schema'
import { CreateDishDto } from './dto/create-dish.dto'
import { Tags, TagsDocument } from './schemas/tags.schema'
import { CreateTagDto } from './dto/create-tag.dto'

@Injectable()
export class DishService {
	constructor(
		@InjectModel(Dish.name) private dishModel: Model<DishDocument>,
		@InjectModel(Tags.name) private tagsModel: Model<TagsDocument>
	) {}

	async create(createDishDto: CreateDishDto): Promise<Dish> {
		if (!createDishDto.price || createDishDto.price <= 0)
			throw new BadRequestException('Il est nécessaire de définir un prix au plat.')
		if (!createDishDto.name) throw new BadRequestException('Il est nécessaire de définir un nom de plat.')
		createDishDto.tags.map(tag => {
			if (createDishDto.tags.filter(word => word == tag).length > 1)
				throw new BadRequestException("Il ne peut y avoir qu'une seule fois la même étiquiette par plat.")
		})
		if (!createDishDto.type || createDishDto.type.length == 0)
			throw new BadRequestException(
				'Il est nécessaire de cocher au moins un type de plat. (entrée, plat, dessert, boisson)'
			)

		createDishDto.tags.map(async x => {
			if (!(await this.checkExist(x))) {
				await this.createTag({ name: x })
			} else {
				await this.increaseTag(x)
			}
		})

		const dish: Partial<Dish> = {
			name: createDishDto.name.toLowerCase(),
			price: createDishDto.price,
			tags: createDishDto.tags,
			type: createDishDto.type
		}

		const newDish = new this.dishModel(dish)
		return newDish.save()
	}

	async findAll(): Promise<Dish[]> {
		return this.dishModel.find()
	}

	async findOne(id: string): Promise<Dish> {
		if (!id.match(/^[0-9a-fA-F]{24}$/)) throw new BadRequestException()
		return this.dishModel.findOne({ _id: id })
	}

	async search(key: string): Promise<Dish[]> {
		return this.dishModel.find({ name: new RegExp(key) })
	}

	async delete(id: string): Promise<Dish> {
		if (!(await this.dishModel.findOne({ _id: id }))) throw new NotFoundException()
		return this.dishModel.findByIdAndDelete({ _id: id })
	}

	async isDishExist(id: string): Promise<boolean> {
		if (!id.match(/^[0-9a-fA-F]{24}$/)) return false
		return !!(await this.dishModel.findOne({ _id: id }))
	}

	/* ### TAGS ### */
	async findAllTags(): Promise<Tags[]> {
		return this.tagsModel.find()
	}

	async findBest(): Promise<Tags[]> {
		return this.tagsModel.find().sort({ count: -1 })
	}

	async createTag(createTagDto: CreateTagDto): Promise<Tags> {
		if (!createTagDto.name || createTagDto.name.length == 0)
			throw new BadRequestException("Il est nécessaire de donner un nom à l'étiquette.")

		const tag = { name: createTagDto.name.toLowerCase(), count: 1 }
		const newTag = new this.tagsModel(tag)
		return newTag.save()
	}

	async increaseTag(tag: string): Promise<void> {
		await this.tagsModel.findOneAndUpdate({ name: tag }, { $inc: { count: 1 } })
		return
	}

	async searchTags(key: string): Promise<Tags[]> {
		return this.tagsModel.find({ name: new RegExp(key) })
	}

	async checkExist(tag: string): Promise<boolean> {
		return !!(await this.tagsModel.findOne({ name: tag }))
	}
}
