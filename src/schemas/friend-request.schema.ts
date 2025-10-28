import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class FriendRequest extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    senderId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    receiverId: Types.ObjectId;

    @Prop({ type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' })
    status: string;
}

export const FriendRequestSchema = SchemaFactory.createForClass(FriendRequest);
