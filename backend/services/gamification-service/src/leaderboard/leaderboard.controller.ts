import { Controller, Get, Sse } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { map, Observable } from 'rxjs';

@Controller('leaderboard')
export class LeaderboardController {
    constructor(private readonly leaderboardService: LeaderboardService) {}
    @Get()
    async getLeaderboard(){
        return this.leaderboardService.getLeaderboard()
    }
    @Sse('stream')
    streamLeaderboard(): Observable<MessageEvent> {
      return this.leaderboardService.getLeaderboardUpdates().pipe(
        map((top5) => new MessageEvent('leaderboardUpdate', { data: top5 }))
      );
    }
}
//frontend will fetch get initally then subscribe to sse