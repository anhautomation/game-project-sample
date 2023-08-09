import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { RuleService } from 'src/rule/rule.service';
import 'moment-timezone';
import * as moment from 'moment';

@Injectable()
export class GameService {

    private timezone: string

    constructor(
        private readonly prisma: PrismaService,
        private readonly rule: RuleService,
        private readonly configService: ConfigService,
    ){
        this.timezone = this.configService.get<string>('timezone');
    }

    async onModuleInit() {
        await this._cleanData();
    }

    public async getPublishedHistories(page: number = 1): Promise<any>{
        let pageSize = 50;
        let skip = ((page - 1) * pageSize);
        let dataList = [];
        if(page <= 0){
            return dataList;
        }
        try{
            let [count, results] = await this.prisma.$transaction([
                this.prisma.powerballGameResult.count(),
                this.prisma.powerballGameResult.findMany({
                    where:{
                        AND:[
                            { IsPublished: true },
                            { IsDeleted: false }
                        ]
                    },
                    orderBy:[
                        { Date: 'desc' },
                        { Round: 'desc'}
                    ],
                    take: pageSize,
                    skip: skip,
                    select:{
                        Date: true,
                        Round: true,
                        GameId: true,
                        GameResult: true,
                        CreatedAtUnix: true,
                        UpdatedAtUnix: true
                    }
                })
            ]);

            for ( let result of results ){
                let data = {
                    date: result.Date,
                    round: result.Round,
                    card: result.GameResult,
                    timeCreated: moment.unix(result.CreatedAtUnix).tz(this.timezone).format('DD-MM-YYYY HH:mm:ss').toString()
                }
                dataList.push(data);
            }
            let totalPage = Math.ceil(count/pageSize);
            let res = {
                data: dataList,
                page: page,
                totalPages: totalPage,
            }
            return res;
        }catch(error){
            return dataList;
        }
    }

    public async getPublishedLatestBalls(): Promise<any>{
        let data = {};
        try{
            let result = await this.prisma.powerballGameResult.findFirst({
                where: {
                    IsPublished: true,
                    IsDeleted: false
                },
                orderBy: [
                    {
                        Date: 'desc',
                    },
                    {
                        Round: 'desc',
                    }
                ],
                select: {
                    Date: true,
                    Round: true,
                    GameId: true,
                    GameResult: true,
                    IsPublished: true,
                    CreatedAtUnix: true,
                    UpdatedAtUnix: true
                }
            });
            if (result == null){
                console.log(`>>>> No Previous Balls <<<<`);
                return data;
            }else{
                data = {
                        date: result.Date,
                        round: result.Round,
                        coins: result.GameResult,
                        timeCreated: moment.unix(result.CreatedAtUnix).tz(this.timezone).format('DD-MM-YYYY HH:mm:ss').toString()
                    }
            }
            console.log(`>>>> Load Previous Balls Successfully <<<<`);
            return data;
        }catch(error){
            console.log(`>>>> Load Latest Balls Error - ${error} <<<<`);
            return data;
        }
    }

    public async rollCage(): Promise<any>{
        let data = {};
        let { hashCode, saltCode, balls } = await this.rule.openBalls();
        let timeUnix = moment.tz(this.timezone).unix();
        let gameId = 'ab1e0b74-55d7-4e2a-833e-6725e88b4daa';
        let { date, round, nextRound } = await this._getCurrentRoundNumber();
        try{
            let ballsResult = JSON.stringify(balls);
            let result = await this.prisma.powerballGameResult.create({
                data: {
                    Round: nextRound,
                    Date: date,
                    GameId: gameId,
                    HashCode: hashCode,
                    SaltCode: saltCode,
                    GameResult: ballsResult,
                    CreatedAtUnix: timeUnix,
                    UpdatedAtUnix: timeUnix
                },
                select: {
                    Date: true,
                    Round: true,
                    GameId: true,
                    HashCode: true,
                    SaltCode: true,
                    IsPublished: true,
                    CreatedAtUnix: true,
                    UpdatedAtUnix: true
                }
            });
            data = {
                date: result.Date,
                round: result.Round,
                hash: result.HashCode,
                salt: result.SaltCode,
                timeCreated: moment.unix(result.CreatedAtUnix).tz(this.timezone).format('DD-MM-YYYY HH:mm:ss').toString()
            }
            console.log(`>>>> Roll Cage Successfully - Date ${date} - Round ${nextRound} <<<<`);
            return data;
        }catch(e){
            console.log(`>>>> Roll Cage Error  - ${e} <<<<`);
            return data;
        }
    }

    public async openBalls(): Promise<any>{
        let data = {};
        let { date, round, nextRound } = await this._getCurrentRoundNumber();
        try{
            let result = await this.prisma.powerballGameResult.update({
                where: {
                    RoundPerDay: {
                        Round: round == 0 ? nextRound : round,
                        Date: date
                    },
                },
                data: {
                    IsPublished: true
                },
                select:{
                    Date: true,
                    Round: true,
                    GameId: true,
                    GameResult: true,
                    CreatedAtUnix: true,
                    UpdatedAtUnix: true
                }
            });
            if(result == null){
                return data;
            }else{
                data = {
                    date: result.Date,
                    round: result.Round,
                    balls: result.GameResult,
                    timeCreated: moment.unix(result.CreatedAtUnix).tz(this.timezone).format('DD-MM-YYYY HH:mm:ss').toString(),
                    timeUpdated: moment.unix(result.UpdatedAtUnix).tz(this.timezone).format('DD-MM-YYYY').toString()
                }
                console.log(`>>>> Open Balls Successfully - Date ${result.Date} - Round ${result.Round} - New Balls ${result.GameResult} <<<<`);
                return data;
            }
        }catch(error){
            console.log(`>>>> Open Balls Error - ${error} <<<<`);
            return data;
        }
    }

    private async _getCurrentRoundNumber(): Promise<any>{
        let round: number = 0;
        let nextRound : number = (round + 1);
        let date = moment.tz(this.timezone).format('YYYYMMDD');
        let data = {
            date: date,
            round: round,
            nextRound: nextRound
        };
        try{
            let results = await this.prisma.powerballGameResult.findMany({
                where: {
                    AND:[
                        { Date: date },
                        { IsDeleted: false}
                    ]
                },
                orderBy:{
                    Round: 'desc'
                },
                take: 1,
                select:{
                    Round: true,
                    Date: true
                }
            });
            if(results.length <= 0) {
                throw new NotFoundException();
            }else{
                date = results[0].Date;
                round = results[0].Round;
                nextRound = (round + 1);
                data = {
                    date: date,
                    round: round,
                    nextRound: nextRound
                }
            }
            console.log(`>>>> Latest Round in Date - Date ${date} - Round ${round} - Next Round ${nextRound} <<<<`);
            return data;
        }catch(error){
            console.log(`>>>> Latest Round in Date - Date ${date} - Round ${round} - Next Round ${nextRound} <<<<`);
            return data;
        }
    }

    private async _cleanData(): Promise<void>{
        try{
            let result = await this.prisma.powerballGameResult.findMany({
                where:{
                    IsPublished: false
                },
                take:1
            })
            if(result.length >= 1){
                await this.prisma.powerballGameResult.updateMany({
                    where:{
                        IsPublished: false
                    },
                    data:{
                        IsPublished: true
                    }
                })
                console.log(`>>>> Clean Data successfully <<<<`);
            }else{
                console.log(`>>>> Logic Data is properly <<<<`);
            }
        }catch(error){
            console.log(`>>>> Clean Data failed - error ${error} <<<<`);
        }
    }

}
