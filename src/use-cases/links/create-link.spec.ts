import { beforeEach, describe, expect, it } from 'vitest'
import { CreateLinkUseCase } from './create-link'
import { InMemoryLinksRepository } from '../../repositories/in-memory/in-memory-links-repository'
import { InvalidUrlError } from './errors/invalid-url-error'

describe('Create Link Use Case', () => {
  let createLinkRepository: InMemoryLinksRepository
  let sut: CreateLinkUseCase

  beforeEach(() => {
    createLinkRepository = new InMemoryLinksRepository()
    sut = new CreateLinkUseCase(createLinkRepository)
  })

  it('should be able to create a link', async () => {
    const { link } = await sut.execute({
      url: 'https://www.google.com',
    })

    console.log(link)

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

  it.skip('should be able to create a link with user', async () => {
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

    expect(link.userId).not.toBeNull()
  })
})
