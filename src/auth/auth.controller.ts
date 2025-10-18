import { Body, Controller,Post } from "@nestjs/common"
import { AuthService } from "./auth.service";
import { LoginDto, SignupDto } from "./dto";


@Controller('auth')
export class AuthController{
    constructor(private authservice:AuthService){}

    @Post('signup')
    //dto: data transfer object
    signup(@Body() dto:SignupDto){
        // console.log({
        //     dto
        // });
        
       return this.authservice.signup(dto);
    }


    @Post('login')
    login(@Body() dot:LoginDto){
        console.log({
            ...dot
        });
        
       return this.authservice.login(dot);
    }
}