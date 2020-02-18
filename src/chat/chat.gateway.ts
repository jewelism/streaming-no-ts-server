import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  ConnectedSocket
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface IMessageBody {
  roomId: string;
  message: string;
}

@WebSocketGateway(3002, { namespace: 'chat' })
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  wsServer: Server;

  handleConnection(socket) {
    console.log(socket.id, 'connected');
  }

  @SubscribeMessage('room')
  onJoinRoom(@MessageBody() roomId: any, @ConnectedSocket() client: Socket): any {
    client.join(roomId);
    client.to(roomId).emit('message', `${client.id} joined in ${roomId}`);
    return roomId;
  }

  @SubscribeMessage('message')
  onReceiveMessage(@MessageBody() messageBody: IMessageBody, @ConnectedSocket() client: Socket): IMessageBody {
    const {roomId, message} = messageBody;
    client.to(roomId).emit('message', `${client.id} => ${message}`);
    return messageBody;
  }
}