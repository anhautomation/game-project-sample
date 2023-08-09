import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RuleModule } from 'src/rule/rule.module';
import { GameService } from './game.service';

@Module({
    imports:[
        PrismaModule,
        RuleModule,
    ],
    providers:[
        ConfigService,
        GameService
    ],
    exports:[
        GameService
    ]
})
export class GameModule {}
