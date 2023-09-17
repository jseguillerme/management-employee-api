import { UserRepository } from '../repositories/user-repository'
import { ResourceNotFoundError } from './errors/ResourceNotFoundError'

export interface DeleteUserUseCaseRequest {
  id: string
}

export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id }: DeleteUserUseCaseRequest): Promise<void> {
    const user = await this.userRepository.findById(id)

    if (!user) throw new ResourceNotFoundError('User')

    await this.userRepository.delete(id)
  }
}
