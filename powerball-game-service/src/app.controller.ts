import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Powerball Game APIs')
@Controller('/powerball-game')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/get-latest-balls')
  async getLatestCard(): Promise<any>{
    let response = await this.appService.getPublishedLatestBalls();
    return response;
  }

  @Get('/get-histories/:page')
  async getHistories(@Param('page') page: number): Promise<any>{
    let response = await this.appService.getPublishedHistories(page);
    return response;
  }

  @Get('/sync-time')
  async getTime(): Promise<any>{
    let response = await this.appService.getTime();
    return response;
  }
}
