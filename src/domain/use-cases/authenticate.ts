import { UserRepository } from '../repositories/user-repository'
import { compare } from 'bcryptjs'
import { ResourceNotFoundError } from './errors/ResourceNotFoundError'
import { ResourceWithConflictError } from './errors/ResourceWithConflictError'

export interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

export interface AuthenticateUseCaseResponse {
  accessToken: string
}

export class AuthenticateUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) throw new ResourceNotFoundError('User')

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) throw new ResourceWithConflictError('Password')

    return {
      accessToken: 'token',
    }
  }
}
