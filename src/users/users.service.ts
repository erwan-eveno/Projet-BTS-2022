import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from './schemas/user.schema'
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { genSalt, hash } from 'bcrypt'
import { PermsConfig } from '../utils/perms'

@Injectable()
export class UsersService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	fullUserWithPerms(x) {
		const { _id, firstName, lastName, email, perms } = x
		const permsArr = []
		let admin = false
		const permsBin: string[] = Number(perms).toString(2).split('').reverse()
		if (permsBin[0] == '1') admin = true

		for (let i: number = 0; i < PermsConfig.length; i++) {
			permsArr.push({
				name: PermsConfig[i].name,
				desc: PermsConfig[i].desc,
				isCheck: admin ? true : permsBin[i] === '1' || false,
				decValue: Math.pow(2, i),
				section: PermsConfig[i].section
			})
		}

		return { _id, firstName, lastName, email, perms: permsArr }
	}

	async findAll(): Promise<{ firstName: any; lastName: any; perms: any[]; _id: any; email: any }[]> {
		const usersDb = await this.userModel.find().exec()

		return usersDb.map(x => this.fullUserWithPerms(x))
	}

	async findById(id: string) {
		const user = await this.userModel.findOne({ _id: id })
		return this.fullUserWithPerms(user)
	}

	async findByIdPass(id: string) {
		return this.userModel.findOne({ _id: id })
	}

	async findByEmail(email: string): Promise<User> {
		return this.userModel.findOne({ email })
	}

	async create(createUserDto: CreateUserDto): Promise<User> {
		const hashSalt = await genSalt(Number(process.env.SALT))
		createUserDto.password = await hash(createUserDto.password, hashSalt)

		const createdUser = new this.userModel(createUserDto)
		return createdUser.save()
	}

	async deleteById(id: string) {
		return this.userModel.findByIdAndDelete({ _id: id })
	}

	async updateById(id: string, updateUserDto: UpdateUserDto) {
		return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true })
	}

	async checkPerm(id: string, perm: any): Promise<boolean> {
		const { perms } = await this.userModel.findOne({ _id: id })
		const permsBin = (Number(perms) >>> 0).toString(2)
		let permsBinFull = ''

		for (let i: number = 0; i < PermsConfig.length - permsBin.length; i++) {
			permsBinFull += '0'
		}

		permsBinFull += permsBin

		const arrPerms = permsBinFull.split('').reverse()

		const arr = []
		arrPerms.map((x, i) => {
			arr.push({
				name: PermsConfig[i].name,
				isCheck: x
			})
		})

		const admin = arr[0].isCheck === '1'

		const a = arr.filter(x => x.name === perm)[0].isCheck == 1

		return admin || a
	}
}
