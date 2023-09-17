import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import 'dotenv/config'

@Module({
  imports: [MongooseModule.forRoot(process.env.DATABASE_URL as string)],
})
export class InfraModule {}
