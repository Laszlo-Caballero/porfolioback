import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { compare, hash } from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(user: RegisterDto) {
    const { username, password, role } = user;

    const findUserName = await this.userModel
      .findOne()
      .where('username')
      .equals(username);
    if (findUserName)
      throw new HttpException(
        'Username already exists',
        HttpStatus.BAD_REQUEST,
      );

    const passwordHash = await hash(password, 10);

    const newUser = await this.userModel.create({
      username,
      password: passwordHash,
      role,
    });

    const savedUser = await newUser.save();

    return {
      message: 'User registered successfully',
      body: savedUser,
      status: HttpStatus.CREATED,
    };
  }

  async login(user: LoginDto) {
    const { password, username } = user;
    const findUser = await this.userModel
      .findOne()
      .where('username')
      .equals(username);
    if (!findUser) throw new HttpException('Error', HttpStatus.BAD_REQUEST);

    const isPasswordMatch = await compare(password, findUser.password);

    if (!isPasswordMatch)
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);

    const payload = {
      username: findUser.username,
      role: findUser.role,
    };

    const parseUser = findUser.toObject();

    const token = await this.jwtService.sign(payload);

    return {
      message: 'User logged in successfully',
      body: {
        token,
        ...parseUser,
      },
      status: HttpStatus.OK,
    };
  }
}
