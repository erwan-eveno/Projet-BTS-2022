import { Injectable, UnauthorizedException } from '@nestjs/common'
import { SigninAuthDto } from './dto/signin-auth.dto'
import { User } from '../users/schemas/user.schema'
import { UsersService } from '../users/users.service'
import { compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
	constructor(private userSerivce: UsersService, private jwtService: JwtService) {}

	async signin(signinAuthDto: SigninAuthDto): Promise<string> {
		const user = await this.userSerivce.findByEmail(signinAuthDto.email)

		if (!user) throw new UnauthorizedException()

		if (!(await compare(signinAuthDto.password, user.password))) throw new UnauthorizedException()

		return this.signUser(user)
	}

	signUser(user: User): string {
		return this.jwtService.sign({ id: user._id, email: user.email })
	}
}
