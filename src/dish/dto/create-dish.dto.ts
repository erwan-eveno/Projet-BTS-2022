import { ApiProperty } from '@nestjs/swagger'

export class CreateDishDto {
	@ApiProperty()
	name: string

	@ApiProperty()
	price: number

	@ApiProperty()
	tags: string[]

	@ApiProperty()
	type: string[]
}
