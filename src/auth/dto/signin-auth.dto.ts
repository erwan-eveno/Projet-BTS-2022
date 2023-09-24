import { ApiProperty } from '@nestjs/swagger'

export class SigninAuthDto {
	@ApiProperty()
	email: string

	@ApiProperty()
	password: string
}
