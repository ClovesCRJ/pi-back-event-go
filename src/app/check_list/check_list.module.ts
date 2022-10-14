import { Module } from '@nestjs/common';
import { CheckListService } from './check_list.service';
import { CheckListController } from './check_list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckList } from './entities/check_list.entity';
import { EventModule } from '../event/event.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CheckList]),
    EventModule,
  ],
  controllers: [CheckListController],
  providers: [CheckListService]
})
export class CheckListModule {}
