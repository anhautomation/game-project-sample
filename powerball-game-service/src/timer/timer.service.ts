import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as moment from 'moment';
import 'moment-timezone';

@Injectable()
export class TimerService {

    private timezone: string;
  
    constructor(
      private readonly configService: ConfigService,
      ) {
      this.timezone = this.configService.get<string>('timezone');
    }
  
    public async getTime(): Promise<any> {
      let data: any;
      try {
        let ianaTimezone = this.timezone;
        if (!ianaTimezone) {
          return null;
        }
        let duration = await this.configService.get<number>('duration');
        let countdown = await this._getCurrentRemainingTime(duration);
        let time = moment.tz(this.timezone).toString();;
        let timeUnix = moment.tz(this.timezone).unix();
        data = {
          time: time,
          timeUnix: timeUnix,
          countdown: countdown,
        }
      } catch (error) {
        console.log(error);
        data = {
          time: 'Error',
          timeUnix: -1,
          countdown: -1
        }
      }
      return data;
    }
  
    private async _getCurrentRemainingTime(duration: number): Promise<number> {
      let ianaTimezone = this.timezone;
  
      let currentTime = moment.tz(ianaTimezone).unix();
      let startTime = moment.tz(ianaTimezone).startOf('day').unix();
      let elapsedTime = currentTime - startTime;
      let remainingTime = duration - (elapsedTime % duration);
  
      return remainingTime;
    }

}
