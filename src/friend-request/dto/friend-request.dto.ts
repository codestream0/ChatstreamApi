import { IsIn, IsMongoId, IsNotEmpty } from "class-validator";


export class createFriendRequestDto {

    @IsNotEmpty()
    @IsMongoId()
    receiverId: string;
}
export class respondFriendRequestDto {


    @IsNotEmpty()
    @IsIn(['accepted', 'rejected'])
    status: string;
}
export class getFriendRequestsDto {
    @IsNotEmpty()
    @IsMongoId()
    userId: string;
}

