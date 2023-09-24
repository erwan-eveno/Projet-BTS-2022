import { Body, Controller, Get, Post } from '@nestjs/common'
import { AvisService } from './avis.service'
import { CreateAvisDto } from './dto/create-avis.dto'
import { Avis } from './schemas/avis.schema'
import { Perms } from '../guards/perms.guard'
import {ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger'

@ApiTags('Avis')
@Controller('avis')
export class AvisController {
	constructor(private readonly avisService: AvisService) {}

	@ApiQuery({ description: 'Create a new review.<br>Perm: No perm' })
	@ApiResponse({ type: Avis })
	@Post()
	create(@Body() createAvisDto: CreateAvisDto): Promise<Avis> {
		return this.avisService.create(createAvisDto)
	}

	@ApiQuery({ description: 'Find all reviews.<br>Perm: avis.see' })
	@ApiResponse({ type: Avis, isArray: true })
	@Perms('avis.see')
	@Get()
	findAll(): Promise<Avis[]> {
		return this.avisService.findAll()
	}
}
