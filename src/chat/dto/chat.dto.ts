import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsMongoId()
  senderId: string;

  @IsMongoId()
  receiverId: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
