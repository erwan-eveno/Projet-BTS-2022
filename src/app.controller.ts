import { Controller, Get, Post, Req } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello()
	}

	@Post('test')
	testFn(@Req() req): string {
		console.log(req)
		return 'a'
	}
}
