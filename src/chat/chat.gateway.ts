import {WebSocketGateway,MessageBody,SubscribeMessage, WebSocketServer, OnGatewayDisconnect, OnGatewayConnection} from "@nestjs/websockets";
import {Socket,Server} from "socket.io"

@WebSocketGateway()
export class chatGateWay implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server:Server;

    handleConnection(client: Socket, ...args: any[]) {
       console.log("new user added", client.id) 

       client.broadcast.emit("user-joined",{
            message:`New user joined the chat:${client.id}`
       })

    }


    handleDisconnect(client: Socket) {
        console.log(" user disconneted", client.id)

        client.emit("user-left",{
            message:`user left the chat ${client.id}`
        })

        this.server.emit("user-left",{
            message:`user left the chat:${client}`
        })

    }
    
    @SubscribeMessage("newMessage")
    handleNewMessage(@MessageBody() message:string){
        console.log(message)

        // client.emit("reply", "this is a reply")
        //  this.server.emit("reply","replying")
    }

    


}