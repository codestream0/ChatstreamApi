import { IsEmail, IsIn, IsMongoId, IsNotEmpty, IsOptional } from "class-validator";


export class createFriendRequestDto {

    @IsOptional()
    @IsMongoId()
    receiverId: string;

    @IsOptional()
    @IsEmail()
    receiverEmail:string
}
export class respondFriendRequestDto {


    @IsIn(['accepted', 'rejected'],{
        message:"status must be one of : accepted or rejected"
    })
    @IsNotEmpty()
    status: string;
}
export class getFriendRequestsDto {
    @IsNotEmpty()
    @IsMongoId()
    userId: string;
}

