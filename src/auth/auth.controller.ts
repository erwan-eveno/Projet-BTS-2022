import { Body, Controller, Post, Res, Req, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { SigninAuthDto } from './dto/signin-auth.dto'
import { AuthService } from './auth.service'
import { AuthGuard } from '@nestjs/passport'
import { GetUserIdDecorator } from '../utils'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('signin')
	async signin(@Body() signinAuthDto: SigninAuthDto, @Res() res) {
		const token = await this.authService.signin(signinAuthDto)
		res.cookie('Authorization', token).send('logged')
	}

	@UseGuards(AuthGuard('jwt'))
	@Post('checkToken')
	async checkToken(@GetUserIdDecorator() userId: number, @Req() req): Promise<string> {
		return 'logged'
	}

	@Post('logout')
	logout(@Req() req, @Res({ passthrough: true }) res) {
		if (req.cookies.Authorization) {
			res.clearCookie('Authorization')
			return 'logged out'
		} else {
			return 'already logged out'
		}
	}
}
