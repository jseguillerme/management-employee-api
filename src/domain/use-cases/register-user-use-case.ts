import { UserRepository } from '../repositories/user-repository'
import { UserEntity } from '../entities/user'
import { hash } from 'bcryptjs'
import { ResourceAlreadyExistsError } from './errors/ResourceAlreadyExistsError'

export interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
  role: 'admin' | 'member'
}

export interface RegisterUserUseCaseResponse {
  id: string
  message: string
}

export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    email,
    name,
    password,
    role,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const passwordHash = await hash(password, 8)

    const userAlreadyExists = await this.userRepository.findByEmail(email)

    if (userAlreadyExists) throw new ResourceAlreadyExistsError('email')

    const user = UserEntity.create({
      name,
      email,
      password: passwordHash,
      role,
    })

    await this.userRepository.create(user)

    return {
      id: user.id,
      message: 'User created successfully',
    }
  }
}
