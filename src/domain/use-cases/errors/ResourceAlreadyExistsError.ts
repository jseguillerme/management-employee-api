export class ResourceAlreadyExistsError extends Error {
  constructor(param: string) {
    super(`Resource already exists: ${param}`)
    this.name = 'ResourceAlreadyExistsError'
  }
}
