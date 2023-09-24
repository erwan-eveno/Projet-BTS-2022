import { ApiProperty } from '@nestjs/swagger'

export class CreateMenuDto {
	@ApiProperty()
	title: string

	@ApiProperty()
	price: number

	@ApiProperty()
	starter: string[]

	@ApiProperty()
	dish: string[]

	@ApiProperty()
	dessert: string[]

	@ApiProperty()
	endDate: Date
}
