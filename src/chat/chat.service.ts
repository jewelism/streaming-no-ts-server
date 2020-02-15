import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  getChatHello(): string {
    return 'Hello chat!!';
  }
}
