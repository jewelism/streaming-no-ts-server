import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  ConnectedSocket,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TRoomMap, IClient, IMessageBody } from './chat.type';
import { Post } from '@nestjs/common';

@WebSocketGateway(3002, { namespace: 'chat' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  wsServer: Server;
  roomMap: TRoomMap = new Map();

  handleConnection(socket) {
    console.log(socket.id, 'connected');
  }
  handleDisconnect(socket) {
    console.log(socket.id, 'disconnected');
  }

  @SubscribeMessage('room')
  onJoinRoom(@MessageBody() newClient: IClient, @ConnectedSocket() client: Socket): IClient[] {
    const { roomId, ...clientMeta } = newClient;
    const currentRoomMap = this.roomMap.get(roomId);
    if (currentRoomMap) {
      currentRoomMap.set(client.id, clientMeta);
    } else {
      const newMemberMap = new Map([[client.id, clientMeta]]);
      this.roomMap.set(roomId, newMemberMap);
    }
    console.log(this.roomMap);
    client.join(roomId);
    client.to(roomId).emit('newClient', newClient);
    // const roomData = client.adapter.rooms;
    // const userIdList = Object.keys(roomData[roomId]?.sockets);
    return Array.from(this.roomMap.get(roomId)).map(([socketId, { nickname }]) => ({ socketId, nickname, roomId }));
  }

  @SubscribeMessage('message')
  onReceiveMessage(@MessageBody() messageBody: IMessageBody, @ConnectedSocket() client: Socket): IMessageBody {
    const { roomId } = messageBody;
    client.to(roomId).emit('message', messageBody);
    return messageBody;
  }
}