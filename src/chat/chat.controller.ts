import { Controller, Get, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateRoomDto } from './chat.dto';
import { ApiBody, ApiTags, ApiConflictResponse, ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) { }

  @Get('rooms')
  @ApiOkResponse({description: '룸 아이디 string array'})
  getChatRoomsAll() {
    return this.chatService.getChatRoomsAll();
  }

  @Post('room')
  @ApiCreatedResponse({description: '생성됨'})
  @ApiBadRequestResponse({description: '룸 아이디 파싱불가 || 비어있음'})
  @ApiConflictResponse({description: '룸 아이디가 중복'})
  @ApiBody({ type: CreateRoomDto })
  createRoom(@Body() createRoomDto: CreateRoomDto) {
    return this.chatService.createRoom(createRoomDto.roomId);
  }
}
