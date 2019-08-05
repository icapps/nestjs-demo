import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
    public log(message: string) {
        console.log(message);
    }
}
