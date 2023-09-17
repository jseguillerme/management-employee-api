import { InMemoryUserRepository } from '@/test/in-memory/in-memory-user-repository'
import { makeUser } from '@/test/factories/make-user'
import { UpdateUserUseCase } from './update-user-use-case'

let inMemoryUserRepository: InMemoryUserRepository
let sut: UpdateUserUseCase

describe('Update User Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new UpdateUserUseCase(inMemoryUserRepository)
  })

  it('should be able update an user', async () => {
    const user = await makeUser({
      name: 'old name',
      email: 'old email',
    })

    await inMemoryUserRepository.create(user)

    await sut.execute({
      user: {
        id: user.id,
        name: 'new name',
        role: 'member',
        email: 'teste@email.com',
        password: '123456',
      },
    })

    expect(inMemoryUserRepository.users[0]).toHaveProperty('name', 'new name')
    expect(inMemoryUserRepository.users[0]).toHaveProperty('role', 'member')
  })
})
