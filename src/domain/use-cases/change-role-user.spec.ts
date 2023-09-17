import { InMemoryUserRepository } from '@/test/in-memory/in-memory-user-repository'
import { makeUser } from '@/test/factories/make-user'
import { ChangeRoleUserUseCase } from './change-role-user'

let inMemoryUserRepository: InMemoryUserRepository
let sut: ChangeRoleUserUseCase

describe('Change Role User Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new ChangeRoleUserUseCase(inMemoryUserRepository)
  })

  it('should be able change a role an user', async () => {
    const user = await makeUser({
      role: 'member',
    })

    await inMemoryUserRepository.create(user)

    await sut.execute({
      userId: user.id,
      userRole: 'admin',
    })

    expect(inMemoryUserRepository.users[0]).toHaveProperty('role', 'admin')
  })
})
