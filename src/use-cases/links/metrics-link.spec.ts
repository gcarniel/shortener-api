import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryLinksRepository } from '../../repositories/in-memory/in-memory-links-repository'
import { LinkNotFoundError } from './errors/link-not-found-error'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { MetricsLinkUseCase } from './metrics-link'

describe('Metrics Link Use Case', () => {
  let linkRepository: InMemoryLinksRepository
  let usersRepository: InMemoryUsersRepository
  let sut: MetricsLinkUseCase

  beforeEach(() => {
    linkRepository = new InMemoryLinksRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new MetricsLinkUseCase(linkRepository, usersRepository)
  })

  it('should be able to get metrics of link', async () => {
    const link = await linkRepository.create({
      code: 'code12',
      url: 'https://www.google.com',
      shortUrl: 'short-url',
      visits: 1,
    })

    const { visits, createdAt, updatedAt } = await sut.execute({
      code: link.code,
    })

    expect(visits).toEqual(1)
    expect(createdAt).toEqual(link.createdAt)
    expect(updatedAt).toEqual(link.updatedAt)
  })

  it('should not be able to get metrics an unregistered link', async () => {
    expect(() =>
      sut.execute({
        code: 'unregistered',
      }),
    ).rejects.toBeInstanceOf(LinkNotFoundError)
  })

  it('should be possible to only visit links created by the user', async () => {
    const userOne = await usersRepository.create({
      name: 'User-1',
      email: 'user1@a.com',
      password: '123456',
    })

    const userTwo = await usersRepository.create({
      name: 'User-2',
      email: 'user2@a.com',
      password: '123456',
    })

    const linkOne = await linkRepository.create({
      code: 'code12',
      url: 'https://www.google.com',
      shortUrl: 'short-url',
      userId: userOne.id,
    })

    const linkTwo = await linkRepository.create({
      code: 'code34',
      url: 'https://www.google.com',
      shortUrl: 'short-url',
      userId: userTwo.id,
    })

    expect(
      async () =>
        await sut.execute({
          code: linkOne.code,
          userId: userTwo.id,
        }),
    ).rejects.toBeInstanceOf(LinkNotFoundError)

    expect(
      async () =>
        await sut.execute({
          code: linkTwo.code,
          userId: userOne.id,
        }),
    ).rejects.toBeInstanceOf(LinkNotFoundError)
  })
})
