import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import 'dotenv/config'
import { UserRepositoryMongo } from './mongodb/repositories/user-repository-mongo'

@Module({
  imports: [MongooseModule.forRoot(process.env.DATABASE_URL as string)],
  providers: [UserRepositoryMongo],
  exports: [UserRepositoryMongo],
})
export class InfraModule {}
