import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('sendMessage')
  handleMessage(
    @MessageBody() data: { to: string; message: string },
    @ConnectedSocket() client: Socket,
  ) {
    
    this.server.to(data.to).emit('receiveMessage', {
      from: client.id,
      message: data.message,
    });
  }
}
