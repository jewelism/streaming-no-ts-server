import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ChatService {
  rooms: string[] = [];

  getChatRoomsAll(): string[] {
    return this.rooms;
  }
  createRoom(roomId: string) {
    if (!roomId) {
      throw new HttpException('BAD_REQUEST: roomId empty', HttpStatus.BAD_REQUEST);
    }
    if (this.rooms.includes(roomId)) {
      throw new HttpException('CONFLICT: roomId already exist', HttpStatus.CONFLICT);
    }
    this.rooms.push(roomId);
    return 'sucess';
  }
}
