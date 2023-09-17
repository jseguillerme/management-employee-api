import { InMemoryUserRepository } from '@/test/in-memory/in-memory-user-repository'
import { RegisterUserUseCase } from './register-user-use-case'
import { makeUser } from '@/test/factories/make-user'
import { ResourceAlreadyExistsError } from './errors/ResourceAlreadyExistsError'

let inMemoryUserRepository: InMemoryUserRepository
let sut: RegisterUserUseCase

describe('Register User Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new RegisterUserUseCase(inMemoryUserRepository)
  })

  it('should be register a new user', async () => {
    const user = await makeUser()

    await sut.execute({
      email: user.email,
      name: user.name,
      password: '123456',
      role: user.role,
    })

    expect(inMemoryUserRepository.users.length).toBe(1)
  })

  it('should not be register a new user with same email', async () => {
    const user = await makeUser({
      email: 'teste@teste.com',
    })

    await inMemoryUserRepository.create(user)

    await expect(() =>
      sut.execute({
        email: user.email,
        name: 'john doe',
        password: '123456',
        role: 'admin',
      }),
    ).rejects.toBeInstanceOf(ResourceAlreadyExistsError)
  })
})
