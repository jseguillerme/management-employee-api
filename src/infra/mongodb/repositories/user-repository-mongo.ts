import { UserEntity } from '@/src/domain/entities/user'
import { UserRepository } from '@/src/domain/repositories/user-repository'
import { Model, Types } from 'mongoose'
import { User } from '../schemas/user-schema-mongo'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { MongoUserMapper } from './mapper/mongo-user-mapper'

@Injectable()
export class UserRepositoryMongo implements UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.userModel.findById(new Types.ObjectId(id)).exec()

    if (!user) return null

    return MongoUserMapper.toDomain(user)
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userModel.findOne({ email }).exec()

    if (!user) return null

    return MongoUserMapper.toDomain(user)
  }

  async create(user: UserEntity): Promise<void> {
    await this.userModel.create({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    })
  }

  async save(user: Partial<UserEntity>): Promise<void> {
    await this.userModel.updateOne(
      { _id: new Types.ObjectId(user.id) },
      {
        $set: {
          ...user,
        },
      },
    )
  }

  async delete(id: string): Promise<void> {
    await this.userModel.deleteOne({ _id: new Types.ObjectId(id) })
  }
}
