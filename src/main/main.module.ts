import { Module } from '@nestjs/common'
import { PresentationModule } from '../presentation/presentation.module'
import { InfraModule } from '../infra/infra.module'

@Module({
  imports: [PresentationModule, InfraModule],
  controllers: [],
  providers: [],
})
export class MainModule {}
