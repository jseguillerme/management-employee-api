import { UserRepository } from '../repositories/user-repository'
import { UserEntity } from '../entities/user'
import { MissingParamsError } from './errors/MissingParamsError'
import { ResourceNotFoundError } from './errors/ResourceNotFoundError'
import { hash } from 'bcryptjs'

export interface UpdateUserUseCaseRequest {
  user: Partial<UserEntity>
}

export interface UpdateUserUseCaseResponse {
  userUpdated: Partial<UserEntity>
}

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    user,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    if (!user.id) {
      throw new MissingParamsError('id')
    }

    const userExists = await this.userRepository.findById(user.id)

    if (!userExists) throw new ResourceNotFoundError('User')

    if (user.password) {
      user.password = await hash(user.password, 8)
    }

    const userUpdated = Object.assign(userExists, user)

    await this.userRepository.save(userUpdated)

    return {
      userUpdated,
    }
  }
}
