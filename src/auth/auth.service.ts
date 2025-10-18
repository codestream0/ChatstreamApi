import { Injectable } from "@nestjs/common"

@Injectable()
export class AuthService{
    signup(){
        return{msg:"signup successful"};
    }
    
    login(){
        return{msg:"login successful"};
    }
}