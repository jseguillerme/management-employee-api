import { UserRepository } from '../repositories/user-repository'
import { UserEntity } from '../entities/user'
import { MissingParamsError } from './errors/MissingParamsError'
import { ResourceNotFoundError } from './errors/ResourceNotFoundError'
import { hash } from 'bcryptjs'

export interface ChangeRoleUserUseCaseRequest {
  user: Partial<UserEntity>
}

export class ChangeRoleUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ user }: ChangeRoleUserUseCaseRequest): Promise<void> {
    if (!user.id) throw new MissingParamsError('id')

    const userExists = await this.userRepository.findById(user.id)

    if (!userExists) throw new ResourceNotFoundError('User')

    await this.userRepository.save({
      ...user,
      password: user.password
        ? await hash(user.password, 8)
        : userExists.password,
    })
  }
}
