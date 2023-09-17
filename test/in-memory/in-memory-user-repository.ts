import { UserEntity } from '@/src/domain/entities/user'
import { UserRepository } from '@/src/domain/repositories/user-repository'

export class InMemoryUserRepository implements UserRepository {
  users: UserEntity[] = []

  async findById(id: string): Promise<UserEntity | null> {
    const user = this.users.find((user) => user.id === id)

    if (!user) return null

    return user
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = this.users.find((user) => user.email === email)

    if (!user) return null

    return user
  }

  async create(user: UserEntity): Promise<void> {
    this.users.push(user)
  }

  async save(user: Partial<UserEntity>): Promise<void> {
    const userIndex = this.users.findIndex((item) => item.id === user.id)

    this.users[userIndex] = user as UserEntity
  }

  async delete(id: string): Promise<void> {
    const userIndex = this.users.findIndex((item) => item.id === id)

    this.users.splice(userIndex, 1)
  }
}
