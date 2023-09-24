import { Body, Controller, Get, Post, Param, Delete, Patch } from '@nestjs/common'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'
import { User } from './schemas/user.schema'
import { UpdateUserDto } from './dto/update-user.dto'
import { Perms } from '../guards/perms.guard'

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@ApiCreatedResponse({ type: User })
	@Get('')
	@Perms('user.see')
	findAll() {
		return this.usersService.findAll()
	}

	@ApiCreatedResponse({ type: User })
	@Get('/safe/:id')
	@Perms('user.see.*')
	findByIdSafe(@Param('id') id: string): Promise<User> {
		return this.usersService.findByIdPass(id)
	}

	@ApiCreatedResponse({ type: User })
	@Get(':id')
	@Perms('user.see')
	findById(@Param('id') id: string) {
		return this.usersService.findById(id)
	}

	@ApiCreatedResponse({ type: CreateUserDto })
	@Post('')
	@Perms('user.manage')
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto)
	}

	@Delete(':id')
	@Perms('user.delete')
	deleteById(@Param('id') id: string) {
		return this.usersService.deleteById(id)
	}

	@ApiCreatedResponse({ type: UpdateUserDto })
	@Patch(':id')
	@Perms('user.manage')
	updateById(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.updateById(id, updateUserDto)
	}
}
