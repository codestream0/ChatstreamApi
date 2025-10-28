import { Body,  Controller,  Delete,  Get,  Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { FriendRequestService } from './friend-request.service';
import { createFriendRequestDto, respondFriendRequestDto } from './dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
// import { use } from 'passport';

UseGuards(JwtAuthGuard)
@Controller('friends')
export class FriendRequestController {
    constructor(private readonly friendRequestService:FriendRequestService) {}


    
    @Post('request')
    async sendFriendRequest(@Req() req, @Body() dto:createFriendRequestDto){
        return this.friendRequestService.sendFriendRequest(req.user.id,dto);
    }

    @Patch('respond/:id')
    async respondFriendRequest(id:string, @Param('id') @Body() dto:respondFriendRequestDto){
        return this.friendRequestService.respondFriendRequest(id,dto);
    }

    @Get('pending')
    async getFriendRequests(@Req() req){
        return this.friendRequestService.getFriendRequests({userId: req.user.id});
    }

    @Delete(':id')
    async deleteFriendRequest(@Req() req, @Param('id') requestId:string){
        return this.friendRequestService.deleteFriendRequest(req.user.id, requestId);
    }

}
