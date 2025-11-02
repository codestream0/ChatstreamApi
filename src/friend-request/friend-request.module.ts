import { Module } from '@nestjs/common';
import { FriendRequestService } from './friend-request.service';
import { FriendRequestController } from './friend-request.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendRequest, FriendRequestSchema } from 'src/schemas/friend-request.schema';
import { User, UserSchema } from 'src/schemas/user.schema';


@Module({
  imports :[MongooseModule.forFeature([
   {name:FriendRequest.name,schema:FriendRequestSchema},
   {name:User.name,schema:UserSchema},
  ])],
  providers: [FriendRequestService],
  controllers: [FriendRequestController]
})
export class FriendRequestModule {}
