export class LinkNotFoundError extends Error {
  constructor(message = 'Link not found') {
    super(message)
  }
}
