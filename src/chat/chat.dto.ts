import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  @IsNotEmpty()
  @ApiProperty()
  roomId: string;
}