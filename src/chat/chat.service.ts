import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from 'src/schemas/message.schema';
import {CreateMessageDto} from "./dto"

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Message.name) private readonly messageModel: Model<Message>,
    ){}

    async saveMessage(dto:CreateMessageDto){
        const message =  new this.messageModel(dto)
        const saveTodb= await message.save()
        return saveTodb;
    }


    async getMessagesBetweenUsers(userA: string, userB: string) {
        const message = await this.messageModel
            .find({
                $or: [
                { senderId: userA, receiverId: userB },
                { senderId: userB, receiverId: userA },
                ],
            })
            .sort({ createdAt: 1 });
         return message    
  }

  async getUnreadMessage(userId:string){
    const unReadMessage = await this.messageModel.find({receiverId:userId,read:false}).sort({createdAt:1})
    return unReadMessage;
  }


  async markAsRead(messageIds:string[]){
    const markAsRead = await this.messageModel.updateMany(
        {_id:{$in:messageIds}},
        { $set: {read:true}}
    )

    return markAsRead;
  }

}
