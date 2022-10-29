import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/app/user/entities/user.entity';
import { UserService } from 'src/app/user/user.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { google, Auth } from 'googleapis';
import { MessagesUtils } from 'src/utils/messages.utils';

@Injectable()
export class AuthService {
  oauthClient: Auth.OAuth2Client;
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,  
  ) {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_SECRET;
    this.oauthClient = new google.auth.OAuth2(
      clientID,
      clientSecret
    );
  }

  async login(user) {
    const payload = { sub: user.id, email: user.email };

    return {
      token: this.jwtService.sign(payload),
    }
  }

  async validateUser(email: string, password: string) {
    let user: User;
    try {
      user = await this.userService.findOneOrFail({
        where: { email },
      });
    } catch (error) {
      console.log(error);
      return null;
    }

    if (user.isRegisteredWithGoogle) {
      throw new UnauthorizedException(MessagesUtils.USE_GOOGLE);
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }

  async loginWithGoogle(token: string) {
    const tokenInfo = await this.oauthClient.getTokenInfo(token);
 
    const email = tokenInfo.email;
 
    try {
      const user = await this.userService.findOneOrFail({
        where: { email }
      });
 
      return this.handleRegisteredUser(user);
    } catch (error) {
      if (error.status !== 404) {
        throw new error;
      }
 
      return this.registerUser(token, email);
    }
  }

  async registerUser(token: string, email: string) {
    const userData = await this.getUserData(token);
    const name = userData.name;
   
    const user = await this.userService.createWithGoogle({
      first_name: name,
      last_name: "",
      email: email,
    });
   
    return this.handleRegisteredUser(user);
  }

  async getUserData(token: string) {
    const userInfoClient = google.oauth2('v2').userinfo;
   
    this.oauthClient.setCredentials({
      access_token: token
    })
   
    const userInfoResponse = await userInfoClient.get({
      auth: this.oauthClient
    });
   
    return userInfoResponse.data;
  }

  async handleRegisteredUser(user: User) {
    if (!user.isRegisteredWithGoogle) {
      throw new UnauthorizedException(MessagesUtils.USE_EMAIL_AND_PASSWORD);
    }
  
    return this.login(user);
  }
}
