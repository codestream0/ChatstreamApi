import { Body,  Controller,  Delete,  Get,  Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { FriendRequestService } from './friend-request.service';
import { createFriendRequestDto, respondFriendRequestDto } from './dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('friends')
export class FriendRequestController {
    constructor(private readonly friendRequestService:FriendRequestService) {}

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
        return this.friendRequestService.getFriendRequests(req);
    }

    
    @Get('search')
    async searchFriends(@Query('query') query: string) {
        return this.friendRequestService.searchFriends(query);
    }

    @Get("getFriends")
    async getFriends(@Req() req){
        return this.friendRequestService.getFriends(req)
    }

}
