import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

export type TagsDocument = Tags & Document

@Schema({
	timestamps: true
})
export class Tags {
	@Prop({ isRequired: true })
	@ApiProperty()
	name: string

	@Prop()
	@ApiProperty()
	count: number
}

export const TagsSchema = SchemaFactory.createForClass(Tags)
