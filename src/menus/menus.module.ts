import { Module } from '@nestjs/common'
import { MenusController } from './menus.controller'
import { MenusService } from './menus.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Menu, MenuSchema } from './schemas/menu.schema'
import { DishService } from '../dish/dish.service'
import { Dish, DishSchema } from '../dish/schemas/dish.schema'
import { Tags, TagsSchema } from '../dish/schemas/tags.schema'

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Menu.name, schema: MenuSchema },
			{ name: Dish.name, schema: DishSchema },
			{ name: Tags.name, schema: TagsSchema }
		])
	],
	controllers: [MenusController],
	providers: [MenusService, DishService]
})
export class MenusModule {}
