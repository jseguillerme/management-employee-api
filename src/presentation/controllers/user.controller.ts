import { User } from '@/src/infra/mongodb/schemas/user-schema-mongo'
import { Controller, Get } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Controller('users')
export class UserController {
  constructor(@InjectModel(User.name) private catModel: Model<User>) {}

  @Get()
  async getAll() {
    return await this.catModel.find().exec()
  }
}
