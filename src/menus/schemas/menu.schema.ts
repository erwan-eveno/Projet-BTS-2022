import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as Sch } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

export type MenuDocument = Menu & Document

@Schema({
	timestamps: true
})
export class Menu {
	@Prop({ isRequired: false, type: Sch.Types.ObjectId, auto: true })
	_id?: string

	@ApiProperty()
	@Prop()
	title: string

	@ApiProperty()
	@Prop()
	price: number

	@ApiProperty()
	@Prop()
	starter: string[]

	@ApiProperty()
	@Prop()
	dish: string[]

	@ApiProperty()
	@Prop()
	dessert: string[]

	@ApiProperty()
	@Prop()
	endDate: Date
}

export const MenuSchema = SchemaFactory.createForClass(Menu)
