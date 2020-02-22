import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';

@Controller('chat')
export class ChatController extends ChatGateway {
  constructor(private readonly chatService: ChatService) { 
    super();
  }

  @Get('rooms')
  getChatRoomsAll() {
    return this.chatService.getChatRoomsAll();
  }

  // @Get(':roomId')
  // getChats(@Param('roomId') roomId) {
  //   return this.chatService.getChats(roomId);
  // }

  // @Post(':roomId')
  // enterChatRoom(@Body('roomId') roomId) {
  //   return this.chatService.enterChatRoom(roomId);
  // }
}
