import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { DishModule } from './dish/dish.module'
import { MenusModule } from './menus/menus.module'
import { AvisModule } from './avis/avis.module'

@Module({
	imports: [
		UsersModule,
		ConfigModule.forRoot({ isGlobal: true }),
		MongooseModule.forRoot(
			`mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PWD}@lecafedeparis.f4ouf.mongodb.net/lecafedeparis?retryWrites=true&w=majority`
		),
		AuthModule,
		DishModule,
		MenusModule,
		AvisModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
