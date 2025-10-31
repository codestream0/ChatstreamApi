import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsMongoId, IsNotEmpty, IsOptional } from "class-validator";


export class createFriendRequestDto {

    @IsOptional()
    @IsMongoId()
    @ApiProperty({example:"68ff4841b0cb1a861a5567f2", description:"receiverId"})
    receiverId: string;

    @IsOptional()
    @IsEmail()
    @ApiProperty({example:"johndoe@gmail.com", description:"receiver email"})
    receiverEmail:string
}
export class respondFriendRequestDto {


    @IsIn(['accepted', 'rejected'],{
        message:"status must be one of : accepted or rejected"
    })
    @IsNotEmpty()
    @ApiProperty({example:"accepted", description:"friend request status"})
    status: string;
}
export class getFriendRequestsDto {
    @IsNotEmpty()
    @IsMongoId()
    userId: string;
}

