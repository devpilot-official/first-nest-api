import { Controller, Post, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authCredentialDto);
    }

    @Post('/signin')
    sighIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentialDto);
    }

}
