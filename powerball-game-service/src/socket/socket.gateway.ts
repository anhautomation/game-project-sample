import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors:{
    origin:'*'
  }
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  async sendLatestBalls(payload: any): Promise<void> {
    this.server.emit('powerball-game-latest-balls', payload);
    console.log(`>>>> Socket to Client - Latest Balls ${payload} <<<<`);
  }

  async sendTime(payload: any): Promise<void>{
    this.server.emit('powerball-game-timer', payload);
    console.log(`>>>> Socket to Client - Time Left to Open Balls ${payload} <<<<`);
  }
}