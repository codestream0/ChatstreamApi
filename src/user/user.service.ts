import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto, } from './dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel:Model<UserDocument> ) {}

  
  async create(data: CreateUserDto): Promise<User> {
    const user = new this.userModel(data);
    return user.save();
  }



  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-password'); 
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).select('-password');
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateProfile(id: string, updateData: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async deleteUser(id: string): Promise<{ deleted: boolean }> {
    const result = await this.userModel.findByIdAndDelete(id);
    return { deleted: !!result };
  }
}
