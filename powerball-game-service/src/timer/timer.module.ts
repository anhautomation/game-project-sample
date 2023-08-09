import { Module } from '@nestjs/common';
import { TimerService } from './timer.service';
import { ConfigService } from '@nestjs/config';

@Module({
    providers:[
        TimerService,
        ConfigService
    ],
    exports:[
        TimerService
    ]
})
export class TimerModule {}
