import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateMessageDto } from './dto';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  private onlineUsers = new Map<string, string>();

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    for (const [userId, socketId] of this.onlineUsers.entries()) {
      if (socketId === client.id) {
        this.onlineUsers.delete(userId);
        break;
      }
    }
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('register')
  handleRegister(
    @MessageBody() userId: string,
    @ConnectedSocket() client: Socket,
  ) {
    this.onlineUsers.set(userId, client.id);
    console.log(`User ${userId} registered with socket ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async newMessage(@MessageBody() dto: CreateMessageDto) {
    const message = await this.chatService.saveMessage(dto);
    console.log(message);

    const receiverSocketId = this.onlineUsers.get(dto.receiverId);
    if (receiverSocketId) {
      // Emit to receiver
      this.server.to(receiverSocketId).emit('receiveMessage', message);
    }

    const senderSocketId = this.onlineUsers.get(dto.senderId);
    if (senderSocketId) {
      this.server.to(senderSocketId).emit('messageSent', message);
    }
  }

  @SubscribeMessage('getMessages')
  async handleGetMessages(
    @MessageBody() data: { userA: string; userB: string },
  ) {
    const messages = await this.chatService.getMessagesBetweenUsers(
      data.userA,
      data.userB,
    );
    return messages;
  }
}
