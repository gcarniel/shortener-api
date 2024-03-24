import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { UserProfileUseCase } from './user-profile'
import { UserNotFoundError } from './errors/user-not-found-error'

let userRepository: InMemoryUsersRepository
let sut: UserProfileUseCase

describe('Get user profile use case ', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new UserProfileUseCase(userRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await userRepository.create({
      email: 'johndoe@gmail.com',
      name: 'John Doe',
      password: await hash('1234567', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.name).toEqual('John Doe')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() => {
      return sut.execute({
        userId: 'non-existing-id',
      })
    }).rejects.toBeInstanceOf(UserNotFoundError)
  })
})
