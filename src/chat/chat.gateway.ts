import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  OnGatewayConnection
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  wsServer: Server;
  clientId: string;

  handleConnection(socket) {
    console.log('handleConnection', socket.client.conn.id);
    this.clientId = socket.client.conn.id;
  }

  @SubscribeMessage('message')
  onReceiveMessage(@MessageBody() data: any): Observable<WsResponse<number>> {
    console.log('received data from', this.clientId, data);
    return data;
  }
}