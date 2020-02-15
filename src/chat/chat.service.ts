import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  getChatsAll(): string {
    return 'Hello chat!!';
  }
  getChats(roomId: string): any {
    return `chat roomId ${roomId}`;
  }
  enterChatRoom(roomId: string) {
    return null;
  }
}
