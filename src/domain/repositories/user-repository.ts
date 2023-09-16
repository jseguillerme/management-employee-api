import { UserEntity } from '../entities/user'

export abstract class UserRepository {
  abstract findById(id: string): Promise<UserEntity | null>
  abstract findByEmail(email: string): Promise<UserEntity | null>
  abstract save(user: Partial<UserEntity>): Promise<void>
  abstract delete(id: string): Promise<void>
}
