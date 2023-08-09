import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimerModule } from './timer/timer.module';
import { RuleModule } from './rule/rule.module';
import { GameModule } from './game/game.module';
import { SocketGateway } from './socket/socket.gateway';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/configuration'

@Module({
  imports: [
    TimerModule, 
    RuleModule, 
    GameModule, 
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    SocketGateway
  ],
})
export class AppModule {}
