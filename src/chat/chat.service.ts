import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  getChatRoomsAll(): string[] {
    return ['room1', 'room2', 'room3'];
  }
  getChats(roomId: string): any {
    return `chat roomId ${roomId}`;
  }
  enterChatRoom(roomId: string) {
    return null;
  }
}
