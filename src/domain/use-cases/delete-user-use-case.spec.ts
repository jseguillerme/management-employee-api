import { InMemoryUserRepository } from '@/test/in-memory/in-memory-user-repository'
import { makeUser } from '@/test/factories/make-user'
import { DeleteUserUseCase } from './delete-user-use-case'
import { randomUUID } from 'crypto'
import { ResourceNotFoundError } from './errors/ResourceNotFoundError'

let inMemoryUserRepository: InMemoryUserRepository
let sut: DeleteUserUseCase

describe('Delete User Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new DeleteUserUseCase(inMemoryUserRepository)
  })

  it('should be register a new user', async () => {
    const user = await makeUser()

    await inMemoryUserRepository.create(user)

    await sut.execute({
      id: user.id,
    })

    expect(inMemoryUserRepository.users.length).toBe(0)
  })

  it('should not be able delete a user inexists', async () => {
    const user = await makeUser()

    await inMemoryUserRepository.create(user)

    await expect(() =>
      sut.execute({
        id: randomUUID(),
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
