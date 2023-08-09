import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class RuleService {

    public async openBalls() {
        let data = {
          hashCode: '',
          saltCode: '',
          balls: []
        };
        try{
            let balls = [];
            let saltCode = await this._newSaltCode('sha512', 32);
            let hashCode = await this._newHashCode('sha512', 64, saltCode);
            let combinedCode = hashCode + saltCode;
            let listOfCombinedCode = await this._listOfCharacters(combinedCode);
            while (listOfCombinedCode.length > 0){
                let hexNumber = listOfCombinedCode.shift();
                let decimalNumber = await this._convertToDecimal(hexNumber);
                if (await this._filterNumber(decimalNumber) === true){
                    if(balls.length < 5){
                        let ball = await this._calculateNormalBall(decimalNumber);
                        if(balls.indexOf(ball) <= -1){
                            balls.push(ball);
                        }
                    }else if(balls.length == 5){
                        let ball = await this._calculatePowerBall(decimalNumber);        
                        balls.push(ball);
                    }else{
                        break;
                    }
                }
            }
            data = {
              hashCode: hashCode,
              saltCode: saltCode, 
              balls: balls
            }; 
            return data; 
        }catch{
            return data;
        }
    }

    private async _newSaltCode(algorithm: string, size: number, saltCode: string = null){
        let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randomString = '';
        for (let i = 0; i < size; i++) {
            let randomIndex = Math.floor(Math.random() * charset.length);
            randomString += charset[randomIndex];
        }
        let rng = crypto.createHash(algorithm).update(randomString).digest('hex');
        rng = rng.slice(0,size);
        console.log(`>>>> New Code - Algorithm ${algorithm} - Size ${size} - RNG ${rng} <<<<`);
        return rng;
    }

    private async _newHashCode(algorithm: string, size: number, salt: string){
        let rng = crypto.createHash(algorithm).update(salt).digest('hex');
        rng = rng.slice(0,size);
        console.log(`>>>> New Code - Algorithm ${algorithm} - Size ${size} - RNG ${rng} <<<<`);
        return rng;
    }

    private async _listOfCharacters(code: string){
        let result = code.match(/.{1,2}/g);
        console.log(`>>>> Hexadecimal Characters List <<<<`);
        console.log(result)
        console.log(`=====================================`);
        return result;
    }

    private async _convertToDecimal(code: string) {
        let result = parseInt(code, 16);
        console.log(`>>>> Convert Hexadecimal Code ${code} to Decimal Code ${result} <<<<`);
        return result;
    }

    private async _filterNumber(rngNumber: number) {
        let isValid : boolean;
        if(rngNumber <= 55 && rngNumber >=1){
            isValid = false;
        }else if (rngNumber == 200){
            isValid = false;
        }else if (rngNumber > 255){
            isValid = false;
        }else{
            isValid = true;
        }
        console.log(`>>>> Validate RNG Number ${rngNumber} - ${isValid} <<<<`);
        return isValid
    }

    private async _removeHundred(rngNumber: number){
        if (rngNumber > 200) {
            rngNumber = rngNumber - 200;
            console.log(`>>>> Minus 200 = ${rngNumber} <<<<`);
        } else {
            if(rngNumber >= 100){
                rngNumber = rngNumber - 100;
                console.log(`>>>> Minus 100 = ${rngNumber} <<<<`);
            }
        }
        return rngNumber;
    }

    private async _calculatePowerBall(rngNumber: number){
        rngNumber = await this._removeHundred(rngNumber);
        let latestRNG = ((rngNumber / 100) * 10) + 1;
        console.log(`>>>> ((${rngNumber} / 100) * 10) + 1 = ${latestRNG} <<<<`);
        latestRNG = Math.floor(latestRNG);
        return latestRNG;
    }

    private async _calculateNormalBall(rngNumber: number) {
        rngNumber = await this._removeHundred(rngNumber);
        let latestRNG = ((rngNumber / 100) * 28) + 1;
        console.log(`>>>> ((${rngNumber} / 100) * 28) + 1 = ${latestRNG} <<<<`);
        latestRNG = Math.floor(latestRNG);
        return latestRNG;
    }

}

