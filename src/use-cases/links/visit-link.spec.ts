import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryLinksRepository } from '../../repositories/in-memory/in-memory-links-repository'
import { VisitLinkUseCase } from './visit-link'
import { LinkNotFoundError } from './errors/link-not-found'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'

describe('Visit Link Use Case', () => {
  let linkRepository: InMemoryLinksRepository
  let usersRepository: InMemoryUsersRepository
  let sut: VisitLinkUseCase

  beforeEach(() => {
    linkRepository = new InMemoryLinksRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new VisitLinkUseCase(linkRepository)
  })

  it('should be able to visit a link', async () => {
    const link = await linkRepository.create({
      code: 'code12',
      url: 'https://www.google.com',
      shortUrl: 'short-url',
    })

    const { link: linkVisited } = await sut.execute({
      code: link.code,
    })

    expect(linkVisited.shortUrl).toEqual('short-url')
    expect(linkVisited.url).toEqual('https://www.google.com')
    expect(linkVisited.visits).toEqual(1)
  })

  it('should not be able to access an unregistered link', async () => {
    expect(() =>
      sut.execute({
        code: 'unregistered',
      }),
    ).rejects.toBeInstanceOf(LinkNotFoundError)
  })

  it('should be able to count 10 visit', async () => {
    const { code } = await linkRepository.create({
      code: 'code12',
      url: 'https://www.google.com',
      shortUrl: 'short-url',
    })

    let amount = 0
    for (let i = 0; i < 10; i++) {
      const { link } = await sut.execute({ code })
      amount = link.visits
    }

    expect(amount).toEqual(10)
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
