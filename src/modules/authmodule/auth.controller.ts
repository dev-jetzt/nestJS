import { Controller, Request as Req, Post, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('/auth')
export class AuthController {

    @Post('/login')
    @UseGuards(AuthGuard('local'))
    public async login(@Req() req: Request) {
        return (req as any).user;
    }
}