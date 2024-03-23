export class LinkNotAllowedError extends Error {
  constructor(message = 'Link not allowed') {
    super(message)
  }
}
