import { UserRepository } from '../repositories/user-repository'
import { UserEntity } from '../entities/user'
import { ResourceNotFoundError } from './errors/ResourceNotFoundError'

export interface ChangeRoleUserUseCaseRequest {
  userId: string
  userRole: UserEntity['role']
}

export class ChangeRoleUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    userId,
    userRole,
  }: ChangeRoleUserUseCaseRequest): Promise<void> {
    const userExists = await this.userRepository.findById(userId)

    if (!userExists) throw new ResourceNotFoundError('User')

    userExists.role = userRole

    await this.userRepository.save(userExists)
  }
}
