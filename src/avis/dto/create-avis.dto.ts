import { ApiProperty } from '@nestjs/swagger'

export class CreateAvisDto {
	@ApiProperty()
	firstName: string
	@ApiProperty()
	lastName: string
	@ApiProperty()
	desc?: string
	@ApiProperty()
	stars: number
}
