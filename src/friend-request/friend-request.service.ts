import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as nodemailer from "nodemailer";
import { FriendRequest } from 'src/schemas/friend-request.schema';
import { createFriendRequestDto, getFriendRequestsDto, respondFriendRequestDto } from './dto';

@Injectable()
export class FriendRequestService {
    constructor(
        @InjectModel(FriendRequest.name) private friendRequestModel:Model<FriendRequest> 
    ){}


    async sendInviteEmail(senderEmail: string, receiverEmail: string) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        },
    });

    const link = `https://chatstream.com/signup?invite=${encodeURIComponent(receiverEmail)}`;

    await transporter.sendMail({
        from: `"Chatstream" <${process.env.EMAIL_USER}>`,
        to: receiverEmail,
        subject: "You're invited to Chatstream!",
        html: `
        <p>${senderEmail} wants to connect with you on Chatstream.</p>
        <p>Click below to join and start chatting:</p>
        <a href="${link}">Join Chatstream</a>
        `,
    });

    return { message: "Invitation email sent successfully" };
    }


    async sendFriendRequest(senderId:string,dto:createFriendRequestDto){
        const sender = await this.friendRequestModel.findById(senderId);
        const receiver = await this.friendRequestModel.findById(dto.receiverId);
        if(!receiver){
            // throw new BadRequestException("Receiver not found");
            // return this.sendInviteEmail(sender.email, dto.receiverId);
        }

        if(senderId === dto.receiverId){
            throw new BadRequestException("You cannot send a friend request to yourself");
        }
        const existingRequest = await this.friendRequestModel.findOne({
            senderId,
            receiverId: dto.receiverId,
            status: 'pending'
        });
        if(existingRequest){
            throw new BadRequestException("Friend request already sent");
        }
        const friendRequest = new this.friendRequestModel({
            senderId,
            receiverId: dto.receiverId
        });
        return await friendRequest.save();

    }

    async respondFriendRequest(requestId:string,dto:respondFriendRequestDto){
        const { status} = dto;
        // return this.friendRequestModel.findByIdAndUpdate(requestId, {status}, {new:true});
        const request = await this.friendRequestModel.findById(requestId);
        if(!request){
            throw new BadRequestException("Friend request not found");
        }
        if(request.status !== 'pending'){
            throw new BadRequestException(`Friend request already responded to ${request.senderId}`);
        }
        request.status = status;
        return request.save();
    }

    async getFriendRequests(dto:getFriendRequestsDto){
        const {userId} = dto;
        return this.friendRequestModel.find({
            receiverId: userId,
            status: 'pending'
        }).populate('senderId', 'username email');

    }

    async deleteFriendRequest(userId: string, requestId: string){
        const request = await this.friendRequestModel.findById(requestId);
        if(!request){
            throw new BadRequestException("Friend request not found");
        }
        if(request.receiverId.toString() !== userId && request.senderId.toString() !== userId){
            throw new BadRequestException("You are not authorized to delete this friend request");
        }
        await request.deleteOne();
        return {message: "Friend request deleted successfully"};
    }
}
