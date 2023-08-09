import { Injectable, OnModuleInit } from '@nestjs/common';
import { GameService } from './game/game.service';
import { ConfigService } from '@nestjs/config';
import { TimerService } from './timer/timer.service';
import { SocketGateway } from './socket/socket.gateway';

@Injectable()
export class AppService implements OnModuleInit {
  private duration: number;
  private initialDelaySecondsToRollCage: number;
  private initialDelaySecondsToOpenBall: number;
  private isBallOpenCronInitialized: boolean = false;
  private isCageRollingCronInitialized: boolean = false;
  private isTimerCronInitialized: boolean = false;
  private isFirstCronDelay: boolean = false;

  constructor(
    private readonly gameService: GameService,
    private readonly configService: ConfigService,
    private readonly countdown: TimerService,
    private readonly socket: SocketGateway
    ) {
      this.duration = this.configService.get<number>('duration');
  }
  async onModuleInit() {
    let {countdown} = await this.countdown.getTime();
    this.initialDelaySecondsToRollCage = await this._calculateDelayTimeOfFirstCron(countdown, 6);
    this.initialDelaySecondsToOpenBall = await this._calculateDelayTimeOfFollowCrons(countdown, 1, this.isFirstCronDelay);;
    console.log(`>>>> Powerball Game Service Started - Time Left to Roll Cage ${this.initialDelaySecondsToRollCage} seconds - Server Time Left to Open Balls ${this.initialDelaySecondsToOpenBall} seconds <<<<`);

    await this._startCageRollingCron();
    await this._startBallOpeningCron();
    await this._startTimerCron();
  }

  public async getPublishedLatestBalls(){
    let data = await this.gameService.getPublishedLatestBalls();
    return JSON.stringify(data);
  }

  public async getPublishedHistories(page: number){
    let data = await this.gameService.getPublishedHistories(page);
    return JSON.stringify(data);
  }

  public async getTime(): Promise<any>{
    let data = await this.countdown.getTime();
    if(this.isFirstCronDelay){
      if(data.countdown < this.duration){
        data.countdown = data.countdown + parseInt(this.duration.toString());
      }else{
        this.isFirstCronDelay = false;
      }
    }
    data = JSON.stringify(data);
    return data;
  }

  private async _startBallOpeningCron() {
    if (this.isBallOpenCronInitialized) {
        return;
    }
    let initialDelayMilliseconds = this.initialDelaySecondsToOpenBall * 1000;
    setTimeout(() => {
        this._ballOpeningCron();
        setInterval(() => {
        this._ballOpeningCron();
        }, this.duration * 1000);
    }, initialDelayMilliseconds);
    this.isBallOpenCronInitialized = true;
  }

  private async _startCageRollingCron(){
      if (this.isCageRollingCronInitialized) {
          return;
      }
      let initialDelayMilliseconds = this.initialDelaySecondsToRollCage * 1000;
      setTimeout(() => {
          this._cageRollingCron();
          setInterval(() => {
          this._cageRollingCron();
          }, this.duration * 1000);
      }, initialDelayMilliseconds);
      this.isCageRollingCronInitialized = true;
  }

  private async _startTimerCron(){
    if(this.isTimerCronInitialized){
      return;
    }
    setTimeout(()=>{
        setInterval(()=>{
        this._timerCron();
      }, 1000)
    },1000)
    this.isTimerCronInitialized = true;
  }

  private async _calculateDelayTimeOfFirstCron(remainingTime: number, timeStart: number): Promise<number>{
    if(remainingTime < timeStart){
      let delayTime = remainingTime;
      delayTime = delayTime + (parseInt(this.duration.toString()) - timeStart);
      this.isFirstCronDelay = true;
      return delayTime;
    }else{
      let delayTime = remainingTime - timeStart;
      return delayTime;
    }
  }

  private async _calculateDelayTimeOfFollowCrons(remainingTime: number, timeStart: number, isFirstCronDelay: boolean){
    let delayTime = await this._calculateDelayTimeOfFirstCron(remainingTime, timeStart);
    if(isFirstCronDelay == true){
      delayTime = delayTime + parseInt(this.duration.toString());
    }
    return delayTime;
  }

  private async _timerCron(){
    let data = await this.getTime();
    await this.socket.sendTime(data);
  }

  private async _ballOpeningCron() {
      console.log('>>>> Cron Job Running - Open Balls <<<<');
      let data = await this.gameService.openBalls();
      await this.socket.sendLatestBalls(JSON.stringify(data));
  }

  private async _cageRollingCron(){
      console.log(`======================================================================================================================`);
      console.log('>>>> Cron Job Running - Roll Cage <<<<');
      await this.gameService.rollCage();
  }
}
