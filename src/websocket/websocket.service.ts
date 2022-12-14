import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(5050, { cors: true, namespace: 'room' })
export class WebsocketService implements OnGatewayConnection {
  @WebSocketServer()
  private server: Server;

  private users = {};

  handleConnection(client: Socket, ...args: any[]) {
    console.log(client.id);
  }

  @SubscribeMessage('join')
  joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { name: string; room_id: string },
  ) {
    const { name, room_id } = body;
    this.users[client.id] = {
      name,
      room_id,
    };
    client.join(room_id);
    console.log('join', client.id, room_id);
  }

  @SubscribeMessage('send-message')
  sendMessage(@ConnectedSocket() client: Socket, @MessageBody() body: any) {
    const { name, room_id } = this.users[client.id];
    client.broadcast.to(room_id).emit('receive-message', { ...body, name });
    console.log(body);
  }
}
