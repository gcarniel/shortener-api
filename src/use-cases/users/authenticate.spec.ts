import { beforeEach, describe, expect, it } from 'vitest'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { AuthenticateUserUseCase } from './authenticate-use-case'

let userRepository: InMemoryUsersRepository
let sut: AuthenticateUserUseCase

describe('Authenticate User Use Case', async () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUserUseCase(userRepository)
  })

  it('should be able to authenticate', async () => {
    await userRepository.create({
      email: 'johndoe@gmail.com',
      name: 'John Doe',
      password: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('John Doe')
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await userRepository.create({
      email: 'johndoe@gmail.com',
      name: 'John Doe',
      password: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@gmail.com',
        password: '111333',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
