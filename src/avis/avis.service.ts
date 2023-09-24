import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateAvisDto } from './dto/create-avis.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Avis, AvisDocument } from './schemas/avis.schema'
import { Model } from 'mongoose'

@Injectable()
export class AvisService {
	constructor(@InjectModel(Avis.name) private avisModel: Model<AvisDocument>) {}

	async create(createAvisDto: CreateAvisDto): Promise<Avis> {
		if (!createAvisDto.stars || createAvisDto.stars < 0) throw new BadRequestException()
		if (!createAvisDto.lastName) throw new BadRequestException()
		if (!createAvisDto.firstName) throw new BadRequestException()

		const avis = new this.avisModel(createAvisDto)
		return avis.save()
	}

	async findAll(): Promise<Avis[]> {
		return this.avisModel.find()
	}
}
