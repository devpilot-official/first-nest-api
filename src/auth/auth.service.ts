import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repo';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signUp(authCredentialDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.signUp(authCredentialDto);
    }

    async signIn(authCredentialDto: AuthCredentialsDto): Promise<{username: string, accessToken: string}> {
        const username = await this.userRepository.signIn(authCredentialDto);

        if (!username) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: JwtPayload = { username };
        const accessToken = this.jwtService.sign(payload);

        return { username, accessToken };
    }
}
