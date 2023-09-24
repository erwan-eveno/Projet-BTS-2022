import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as Sch } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

export type UserDocument = User & Document

@Schema()
export class User {
	@ApiProperty()
	@Prop({ isRequired: false, type: Sch.Types.ObjectId, auto: true })
	_id?: string

	@ApiProperty()
	@Prop()
	firstName: string

	@ApiProperty()
	@Prop()
	lastName: string

	@ApiProperty()
	@Prop()
	email: string

	@ApiProperty()
	@Prop()
	password: string

	@ApiProperty()
	@Prop()
	perms: string
}

export const UserSchema = SchemaFactory.createForClass(User)
