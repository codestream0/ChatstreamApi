import { Module } from '@nestjs/common';
import { chatGateWay } from './chat.gateway';
// import { ChatService } from './chat.service';

@Module({
  providers: [chatGateWay]
})
export class ChatModule {}
