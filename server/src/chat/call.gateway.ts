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
type JoinRoomDataTypes = {
  room: string;
  email: string;
};
type CallOfferData = {
  email: string;
  offer: unknown;
  room: string;
};
// socketMapping
const emailToSocketMap = new Map<string, string>();
const socketToEmailMap = new Map<string, string>();
// CallGateway handles
@WebSocketGateway({ cors: true })
export class CallGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('join-room')
  async handleJoinRoom(
    @MessageBody() data: JoinRoomDataTypes,
    @ConnectedSocket() client: Socket,
  ) {
    const { room, email } = data;
    emailToSocketMap.set(email, client.id);
    socketToEmailMap.set(client.id, email);
    await client.join(room);
    client.emit('joined-room', {
      message: `You (${email}) have joined the room: ${room}`,
    });
    client.broadcast.to(room).emit('user-joined', {
      email,
    });
    console.log(`User with email ${email} joined room: ${room}`, client.id);
  }

  @SubscribeMessage('call-user')
  handleCallOffer(
    @MessageBody() data: CallOfferData,
    @ConnectedSocket() client: Socket,
  ) {
    const { offer, email } = data;
    const fromEmail = socketToEmailMap.get(client.id);
    const socketId = emailToSocketMap.get(email);

    if (!socketId) {
      console.error(`No socket found for email: ${email}`);
      return;
    }
    console.log(
      `Emitting incoming call to ${email} with offer from ${fromEmail}`,
    );
    return this.server.to(socketId).emit('incoming-call', {
      offer,
      from: fromEmail,
    });
  }
  @SubscribeMessage('call-accepted')
  handleCallAccepted(
    @MessageBody() data: { email: string; answer: RTCSessionDescriptionInit },
    @ConnectedSocket() client: Socket,
  ) {

    const { email, answer } = data;
    console.log(email)
    const socketId = emailToSocketMap.get(email);
    if (!socketId) {
      console.error(`No socket found for email: ${email}`);
      return;
    }
    this.server.to(socketId).emit('call-accepted', {
      answer,
    });
  }
}
