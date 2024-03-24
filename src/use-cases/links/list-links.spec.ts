import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryLinksRepository } from '../../repositories/in-memory/in-memory-links-repository'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { ListLinksUseCase } from './list-links'
import { UserNotFoundError } from '../users/errors/user-not-found-error'

describe('List Links Use Case', () => {
  let linkRepository: InMemoryLinksRepository
  let usersRepository: InMemoryUsersRepository
  let sut: ListLinksUseCase

  beforeEach(() => {
    linkRepository = new InMemoryLinksRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new ListLinksUseCase(linkRepository, usersRepository)
  })

  it('should be able to list the links on page 1 with 10 links', async () => {
    const user = await usersRepository.create({
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    })

    for (let i = 1; i <= 12; i++) {
      await linkRepository.create({
        code: `code${i}`,
        userId: user.id,
        url: `https://www.google.com/${i}`,
      })
    }

    const result = await sut.execute({
      userId: 'user-1',
      params: {
        page: 1,
        pageSize: 10,
      },
    })

    expect(result.data).toHaveLength(10)
    expect(result.count).toEqual(12)
    expect(result.pages).toEqual(2)
  })

  it('should be able to list the links on page 2', async () => {
    const user = await usersRepository.create({
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    })

    for (let i = 1; i <= 12; i++) {
      await linkRepository.create({
        code: `code${i}`,
        userId: user.id,
        url: `https://www.google.com/${i}`,
      })
    }

    const result = await sut.execute({
      userId: 'user-1',
      params: {
        page: 2,
        pageSize: 10,
      },
    })

    expect(result.data).toHaveLength(2)
    expect(result.count).toEqual(12)
    expect(result.pages).toEqual(2)
  })

  it('should not be able to list links that does not belong to the user', async () => {
    expect(
      async () =>
        await sut.execute({
          userId: 'user-2',
          params: {
            page: 1,
            pageSize: 10,
          },
        }),
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })
})
