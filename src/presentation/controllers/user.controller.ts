import { Controller, Get } from '@nestjs/common'

@Controller('users')
export class UserController {
  constructor() {}

  @Get()
  async getAll() {
    return 'Hello World'
  }
}
