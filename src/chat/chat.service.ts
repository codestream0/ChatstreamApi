import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from 'src/schemas/message.schema';
import {CreateMessageDto} from "./dto"

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Message.name) private messageModel: Model<Message>,
    ){}

    async saveMessage(dto:CreateMessageDto){
        const message =  new this.messageModel(dto)
        const saveTodb= await message.save()
        return saveTodb;
    }


    async getMessagesBetweenUsers(userA: string, userB: string) {
        return this.messageModel
            .find({
                $or: [
                { senderId: userA, receiverId: userB },
                { senderId: userB, receiverId: userA },
                ],
            })
            .sort({ createdAt: 1 }); 
  }

}
