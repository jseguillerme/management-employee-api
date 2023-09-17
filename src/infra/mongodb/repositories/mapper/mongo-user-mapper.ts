import { UserEntity } from '@/src/domain/entities/user'
import { UserDocument } from '../../schemas/user-schema-mongo'

export class MongoUserMapper {
  static toDomain(raw: UserDocument): UserEntity {
    return UserEntity.create({
      email: raw.email,
      name: raw.name,
      password: raw.password,
      role: raw.role,
      _id: raw._id.toString(),
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
    })
  }
}
