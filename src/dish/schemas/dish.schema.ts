import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as Sch } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

export type DishDocument = Dish & Document

@Schema({
	timestamps: true
})
export class Dish {
	@ApiProperty()
	@Prop({ isRequired: false, type: Sch.Types.ObjectId, auto: true })
	_id?: string

	@Prop({ isRequired: true })
	@ApiProperty({ required: true })
	name: string

	@Prop({ isRequired: true })
	@ApiProperty({ required: true })
	price: number

	@Prop()
	@ApiProperty()
	tags: string[]

	@Prop({ isRequired: true })
	@ApiProperty({ required: true })
	type: string[]
}

export const DishSchema = SchemaFactory.createForClass(Dish)
