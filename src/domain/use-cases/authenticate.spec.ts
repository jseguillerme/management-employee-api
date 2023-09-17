import { InMemoryUserRepository } from '@/test/in-memory/in-memory-user-repository'
import { makeUser } from '@/test/factories/make-user'
import { AuthenticateUseCase } from './authenticate'
import { ResourceWithConflictError } from './errors/ResourceWithConflictError'
import { ResourceNotFoundError } from './errors/ResourceNotFoundError'
import { hash } from 'bcryptjs'

let inMemoryUserRepository: InMemoryUserRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new AuthenticateUseCase(inMemoryUserRepository)
  })

  it('should be able to authenticate a user', async () => {
    const user = await makeUser({
      password: await hash('123456', 8),
    })

    await inMemoryUserRepository.create(user)

    const { accessToken } = await sut.execute({
      email: user.email,
      password: '123456',
    })

    expect(accessToken).toBeTruthy()
  })

  it('should not be able to authenticate with email inexists', async () => {
    const user = await makeUser({
      email: 'teste@teste.com',
    })

    await inMemoryUserRepository.create(user)

    await expect(() =>
      sut.execute({
        email: 'teste@teste.com.br',
        password: user.password,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to authenticate with password differents', async () => {
    const user = await makeUser({
      password: await hash('123456', 8),
    })

    await inMemoryUserRepository.create(user)

    await expect(() =>
      sut.execute({
        email: user.email,
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(ResourceWithConflictError)
  })
})
