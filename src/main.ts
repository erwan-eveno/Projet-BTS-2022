import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'

async function tailwindcss() {
	const app = await NestFactory.create(AppModule)

	app.enableCors({
		origin: true,
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		credentials: true
	})

	app.use(cookieParser())

	const config = new DocumentBuilder().setTitle("Documentation API 'Le cafe de Paris'").setVersion('1.0').build()

	const document = SwaggerModule.createDocument(app, config)

	SwaggerModule.setup('/swagger', app, document)

	await app.listen(4000)
}
tailwindcss()
