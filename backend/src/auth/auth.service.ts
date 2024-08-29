import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/user.schema';
import { Student } from '../schema/student.schema';
import { Teacher } from '../schema/teacher.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Student.name) private studentModel: Model<Student>,
    @InjectModel(Teacher.name) private teacherModel: Model<Teacher>,
    private jwtService: JwtService,
  ) {}

  async register(userData: any): Promise<User> {
    const { role, ...rest } = userData;
    const hashedPassword = await bcrypt.hash(rest.password, 10);

    let newUser;
    if (role === 'student') {
      newUser = new this.studentModel({ ...rest, role, password: hashedPassword });
    } else if (role === 'teacher') {
      newUser = new this.teacherModel({ ...rest, role, password: hashedPassword });
    } else {
      throw new Error('Invalid role');
    }

    return newUser.save();
  }

  async login(email: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user._id, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}