import { UserEntityProps } from '../entities/user'

export abstract class UserRepository {
  abstract findById(id: string): Promise<UserEntityProps | null>
  abstract findByEmail(email: string): Promise<UserEntityProps | null>
  abstract save(user: UserEntityProps): Promise<void>
  abstract delete(id: string): Promise<void>
}
