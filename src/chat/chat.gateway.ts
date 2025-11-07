import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  // Add this method
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }
 
  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @MessageBody() data: { room: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`Client ${client.id} joining room: ${data.room}`);
    await client.join(data.room);
    client.emit('joinedRoom', { room: data.room });
  }

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
