import { Global, Module } from '@nestjs/common'
import { DishController } from './dish.controller'
import { DishService } from './dish.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Dish, DishSchema } from './schemas/dish.schema'
import { Tags, TagsSchema } from './schemas/tags.schema'

@Global()
@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Dish.name, schema: DishSchema },
			{ name: Tags.name, schema: TagsSchema }
		])
	],
	exports: [DishService],
	controllers: [DishController],
	providers: [DishService]
})
export class DishModule {}
