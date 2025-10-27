import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Otp extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  otp: string;

  @Prop({ required: true, default: Date.now, expires: 300 }) 
  createdAt: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
