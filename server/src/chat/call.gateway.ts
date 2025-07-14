import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Roles('DOCTOR', 'PATIENT')
@WebSocketGateway({ cors: true })
export class CallGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('joinRoomCall')
  async handleJoinRoom(
    @MessageBody() data: { room: string; name?: string; role?: string },
    @ConnectedSocket() client: Socket,
  ) {
    await client.join(data.room);

    client.broadcast.to(data.room).emit('userJoined', {
      message: `${data.role}, name: ${data.name} has joined the call.`,
    });
  }

  @SubscribeMessage('call-offer')
  handleCallOffer(@MessageBody() data: { offer: unknown; room: string }) {
    const { offer, room } = data;

    return this.server.to(room).emit('incoming-call', {
      offer,
    });
  }
}
