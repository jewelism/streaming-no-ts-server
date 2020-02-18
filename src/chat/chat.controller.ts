import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) { }

  @Get()
  getChatRoomsAll() {
    return this.chatService.getChatRoomsAll();
  }

  @Get(':roomId')
  getChats(@Param('roomId') roomId) {
    return this.chatService.getChats(roomId);
  }

  @Post(':roomId')
  enterChatRoom(@Body('roomId') roomId) {
    return this.chatService.enterChatRoom(roomId);
  }
}
