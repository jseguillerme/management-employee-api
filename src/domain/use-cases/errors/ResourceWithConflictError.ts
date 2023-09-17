export class ResourceWithConflictError extends Error {
  constructor(resource: string) {
    super(`${resource} with conflict`)
  }
}
