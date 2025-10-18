import { BadRequestException, Injectable } from "@nestjs/common"
import { SignupDto,LoginDto } from "./dto";
import * as bcrypt from 'bcrypt';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Auth } from "./schemas/auth.schema";

@Injectable()
export class AuthService{
  constructor(@InjectModel(Auth.name) private authModel: Model<Auth>) {}

    async signup(dto:SignupDto){

        const existingUser = await this.authModel.findOne({email:dto.email})
        if (existingUser)  throw new BadRequestException("email already")

        const hashPassword= await bcrypt.hash(dto.password,10);
        const newUser=new this.authModel({
            email:dto.email,
            password:hashPassword,
            fullName:dto.fullName,
            phoneNumber:dto.phoneNumber
        });
        console.log(newUser);
        
        const saveTodb = await newUser.save();
        return saveTodb;
        // return{msg:"signup successful"};
    }
    
    login(dto:LoginDto){
        return{msg:"login successful"};
    }
}