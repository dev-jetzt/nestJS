import { ExceptionFilter, ArgumentsHost, HttpException, Catch } from '@nestjs/common';
import {Response, Request} from 'express';

@Catch(HttpException)
export class MatchErrorFilter implements ExceptionFilter {

    catch(exception: HttpException, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const message = exception.message.message;

        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
                message,
                just4fun: 'Hey, this is just 4 fun!',
            });
    }

}