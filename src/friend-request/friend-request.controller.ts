import { Body,  Controller,  Delete,  Get,  Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { FriendRequestService } from './friend-request.service';
import { createFriendRequestDto, respondFriendRequestDto } from './dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
// import { use } from 'passport';

@UseGuards(JwtAuthGuard)
@Controller('friends')
export class FriendRequestController {
    constructor(private readonly friendRequestService:FriendRequestService) {}


    // UseGuards(JwtAuthGuard)
    @Post("request")
    async sendFriendRequest(@Req() req, @Body() dto:createFriendRequestDto){
        console.log("authenticate user:",req.user)
        return this.friendRequestService.sendFriendRequest(req.user.id,dto);
    }

    @Patch("respond/:id")
    async respondFriendRequest( @Param('id') id:string, @Body() dto:respondFriendRequestDto){
        return this.friendRequestService.respondFriendRequest(id,dto);
    }

    @Get("pending")
    async getFriendRequests(@Req() req){
  
        return this.friendRequestService.getFriendRequests( req);
    }

    @Get("sent")
    async getSentRequests(@Req() req){
        return this.friendRequestService.getSentRequests(req)
    }

    // @Delete(':id')
    // async deleteFriendRequest(@Req() req, @Param('id') requestId:string){
    //     return this.friendRequestService.deleteFriendRequest(req.user.id, requestId);
    // }

}
