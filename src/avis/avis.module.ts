import { Module } from '@nestjs/common'
import { AvisService } from './avis.service'
import { AvisController } from './avis.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Avis, AvisSchema } from './schemas/avis.schema'

@Module({
	imports: [MongooseModule.forFeature([{ name: Avis.name, schema: AvisSchema }])],
	providers: [AvisService],
	controllers: [AvisController]
})
export class AvisModule {}
