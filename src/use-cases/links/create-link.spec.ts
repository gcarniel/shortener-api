import { beforeEach, describe, expect, it } from 'vitest'
import { CreateLinkUseCase } from './create-link'
import { InMemoryLinksRepository } from '../../repositories/in-memory/in-memory-links-repository'
import { InvalidUrlError } from './errors/invalid-url-error'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'

describe('Create Link Use Case', () => {
  let createLinkRepository: InMemoryLinksRepository
  let usersRepository: InMemoryUsersRepository
  let sut: CreateLinkUseCase

  beforeEach(() => {
    createLinkRepository = new InMemoryLinksRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateLinkUseCase(createLinkRepository)
  })

  it('should be able to create a link', async () => {
    const { link } = await sut.execute({
      url: 'https://www.google.com',
    })

    expect(link).toMatchObject({
      code: expect.any(String),
      url: 'https://www.google.com',
      shortUrl: expect.any(String),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      visits: 0,
    })
  })

  it('should not be able to create a link with invalid url', async () => {
    await expect(() =>
      sut.execute({
        url: 'invalid-url',
      }),
    ).rejects.toBeInstanceOf(InvalidUrlError)
  })

  it('should be able to create a link without user', async () => {
    const { link } = await sut.execute({
      url: 'https://www.google.com',
    })

    expect(link).toMatchObject({
      code: expect.any(String),
      url: 'https://www.google.com',
      shortUrl: expect.any(String),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      visits: 0,
    })

    expect(link.userId).toBeNull()
  })

  it('should be able to create a link with user', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'a@a.com',
      password: '123456',
    })

    const { link } = await sut.execute({
      url: 'https://www.google.com',
      userId: user.id,
    })

    expect(link).toMatchObject({
      code: expect.any(String),
      url: 'https://www.google.com',
      shortUrl: expect.any(String),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      userId: user.id,
      visits: 0,
    })
  })

  it('should be possible to see only the link created by the user', async () => {
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

    const { link: linkOne } = await sut.execute({
      url: 'https://www.google.com',
      userId: userOne.id,
    })

    const { link: linkTwo } = await sut.execute({
      url: 'https://www.google.com',
      userId: userTwo.id,
    })

    const { link: linkThree } = await sut.execute({
      url: 'https://www.google.com',
    })

    expect(linkOne.userId).toEqual(userOne.id)
    expect(linkTwo.userId).toEqual(userTwo.id)
    expect(linkThree.userId).toBeNull()
  })
})
