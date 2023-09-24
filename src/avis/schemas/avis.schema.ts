import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { Document, Schema as Sch } from 'mongoose'

export type AvisDocument = Avis & Document

@Schema({
	timestamps: true
})
export class Avis {
	@ApiProperty()
	@Prop({ isRequired: false, type: Sch.Types.ObjectId, auto: true })
	_id?: string

	@Prop()
	@ApiProperty()
	firstName: string

	@Prop()
	@ApiProperty()
	lastName: string

	@Prop()
	@ApiProperty()
	desc: string

	@Prop()
	@ApiProperty()
	stars: number
}

export const AvisSchema = SchemaFactory.createForClass(Avis)
