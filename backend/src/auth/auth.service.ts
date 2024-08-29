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
    const hashedPassword = await bcrypt.hash('your-secret-key', 10);
    console.log(hashedPassword);

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
  async login(email: string, password: string): Promise<{ accessToken: string; user: User; role: string }> {
    console.log('Login attempt:', email);
    console.log(email?email:'none')
    let user: UserDocument | null = null;
    let role: string = '';
  
    // Check in Student collection
    const teachers = await this.teacherModel.find({}, 'email').exec();
    console.log( teachers.map(teacher => teacher.email));
    user = await this.studentModel.findOne({ email }).exec();
    if (user) {
      role = 'student';
    } else {
      // Check in Teacher collection if not found in Student
      user = await this.teacherModel.findOne({ email }).exec();
      if (user) {
        role = 'teacher';
      }
    }
  
    if (!user) {
      console.error('User not found:', email);
      throw new UnauthorizedException('Invalid email');
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.error('Invalid password for user:', email);
      throw new UnauthorizedException('Invalid password');
    }
  
    const payload = { email: user.email, sub: user._id.toString(), role };
    const accessToken = this.jwtService.sign(payload);
  
    return {
      accessToken,
      user,
      role,
    };
  }
  
}