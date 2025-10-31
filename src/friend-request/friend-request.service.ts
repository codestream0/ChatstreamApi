import { BadRequestException, Injectable, NotFoundException, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as nodemailer from "nodemailer";
import { FriendRequest } from 'src/schemas/friend-request.schema';
import { createFriendRequestDto, getFriendRequestsDto, respondFriendRequestDto } from './dto';
import { User } from 'src/schemas/user.schema';


@Injectable()
export class FriendRequestService {
    constructor(
        @InjectModel(FriendRequest.name) private readonly friendRequestModel:Model<FriendRequest>,
        @InjectModel(User.name) private readonly userModel:Model<User>
    ){}


    async sendInviteEmail(senderEmail: string, receiverEmail: string) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
        },
    });

    const link = `https://chatstream.com/signup?invite=${encodeURIComponent(receiverEmail)}`;

    const info = await transporter.sendMail({
        from: `"Chatstream" <${process.env.MAIL_USER}>`,
        to: receiverEmail,
        subject: "You're invited to Chatstream!",
        html: `
        <p>${senderEmail} wants to connect with you on Chatstream.</p>
        <p>Click below to join and start chatting:</p>
        <a href="${link}">Join Chatstream</a>
        `,
    });

    return {
      message: "Email sent successfully",
      receiverEmail,
      senderEmail,
      messageId: info.messageId,
    };
    }


    async sendFriendRequest(senderId:string,dto:createFriendRequestDto){
        const {receiverId,receiverEmail} = dto 
        if(receiverId){
            if(senderId === receiverId){
                throw new BadRequestException("You cannot send a friend request to yourself");
            }
            const existingUser = await this.friendRequestModel.findOne({
                senderId,
                receiverId,
                status: 'pending'
            });
            if(existingUser){
                throw new BadRequestException("Friend request already sent");
            }

            const friendRequest = new this.friendRequestModel({
                senderId,
                receiverId
            });
            await friendRequest.save();
            return {message:"friend request sent successfully to existing user"}
        }
        if(receiverEmail){
          const sender = await this.userModel.findById(senderId)  
          const receiver = await this.userModel.findOne({email:receiverEmail})
          if(receiver){
            const existingUser = await this.friendRequestModel.findOne({
                senderId,
                receiverId:receiver._id,
                status:"pending"
            })
            if(existingUser){ throw new BadRequestException("friend request already exists")}
            
             const friendRequest= new this.friendRequestModel({
                senderId,
                receiverId:receiver._id,
             })

             await friendRequest.save()
             return{message:"friend request sent successfully using email"}        
          }
          const inviteInfo= await this.sendInviteEmail(sender?.email ?? "", receiverEmail)
          return inviteInfo
        }

    }

    async respondFriendRequest(requestId:string,dto:respondFriendRequestDto){
        const { status} = dto;
        const request = await this.friendRequestModel.findById(requestId);
        const sender = await this.userModel.findById(request?.senderId)
        if(!request){
            throw new BadRequestException("Friend request not found");
        }
        if(request.status !== "pending"){
            throw new BadRequestException(`Friend request already responded to ${sender?.fullName}`);
        }
        request.status = status;
        await request.save();
        if (dto.status === "accepted") {
            await this.userModel.findByIdAndUpdate(request.senderId, {
            $addToSet: { friends: request.receiverId },
            });
            await this.userModel.findByIdAndUpdate(request.receiverId, {
            $addToSet: { friends: request.senderId },
            });
        }

      return { message: `Friend request ${status} successfully` };

    }

    async searchFriends(query: string) {
        const existingUsers= this.userModel.find({
          $or: [
            { fullName: { $regex: query, $options: 'i' } },
            { email: { $regex: query, $options: 'i' } },
          ],
        }).select('fullName email _id');
        return existingUsers;
    }

    async getFriendRequests(@Req() req){
        const userId =req.user.id
        const pendingUsers=await this.friendRequestModel.find({
            receiverId: userId,
            status: "pending"
        }).populate('senderId', 'fullName email');
       console.log({
          userId,
          pendingCount: pendingUsers.length,
          pendingUsers,

        })
       return pendingUsers;
    }

    async getSentRequests(@Req() req){
        const userId = req.user.id
        const pendingUsers= await this.friendRequestModel.find({
            senderId:userId,
            status:"pending"
        }).populate("receiverId", "fullName email")
        console.log({
            userId,
            pendingCount: pendingUsers.length,
            pendingUsers
        });
        return pendingUsers;
    }

}
