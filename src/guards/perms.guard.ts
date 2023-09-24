import { applyDecorators, CanActivate, ExecutionContext, Injectable, SetMetadata, UseGuards } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { UsersService } from '../users/users.service'
import { PermsConfig } from '../utils/perms'

@Injectable()
export class PermsGuard implements CanActivate {
	constructor(private reflector: Reflector, private usersService: UsersService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const id = context.switchToHttp().getRequest().user?.id
		const perm = PermsConfig.find(x => x.name == this.reflector.get<string>('perm', context.getHandler()))

		return await this.usersService.checkPerm(id, perm.name)
	}
}

export function Perms(perm: string) {
	return applyDecorators(UseGuards(AuthGuard('jwt')), SetMetadata('perm', perm), UseGuards(PermsGuard))
}
