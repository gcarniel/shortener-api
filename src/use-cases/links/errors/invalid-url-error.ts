export class InvalidUrlError extends Error {
  constructor(message = 'Invalid url') {
    super(message)
  }
}
