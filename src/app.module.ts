import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [  
     ConfigModule.forRoot({ isGlobal: true }),
     MongooseModule.forRoot(process.env.MONGO_URI as string),
     AuthModule,
     UserModule, 
     ChatModule
    ],
})
export class AppModule {}
