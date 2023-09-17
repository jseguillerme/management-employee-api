import { UserEntity, UserEntityProps } from '@/src/domain/entities/user'
import { hash } from 'bcryptjs'

export async function makeUser(override: Partial<UserEntityProps> = {}) {
  const user = UserEntity.create({
    name: 'john doe',
    email: 'johndoe@example.com',
    role: 'admin',
    password: await hash('123456', 8),
    ...override,
  })

  return user
}
