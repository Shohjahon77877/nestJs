import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { writeFileSync, readFileSync } from 'fs';
import * as path from 'path';
import { IUser } from './entities/user.entity'

const filePath = path.join(process.cwd(), 'src', 'data/users.json');

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    const users: IUser[] = JSON.parse(readFileSync(filePath, 'utf-8'));
    const newUser = { id: (users.at(-1)?.id ?? 0) + 1, ...createUserDto }
    users.push(newUser);
    
    writeFileSync(filePath, JSON.stringify(users, null, 2));
    return newUser;
  }

  findAll() {
    const users: IUser[] = JSON.parse(readFileSync(filePath, 'utf-8'));
    return users;
  }

  findOne(id: number) {
    const users: IUser[] = JSON.parse(readFileSync(filePath, 'utf-8'));
    const user = users.find(user => user.id === +id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const users: IUser[] = JSON.parse(readFileSync(filePath, 'utf-8'));
    const user = users.find(user => user.id === +id);
    if (!user) {
      throw new NotFoundException();
    }

    user.username = updateUserDto.username;
    writeFileSync(filePath, JSON.stringify(users, null, 2));
    return user;
  }

  remove(id: number) {
    const users: IUser[] = JSON.parse(readFileSync(filePath, 'utf-8'));
    const userIndex: number = users.findIndex(user => user.id === +id);
    if (userIndex == -1) {
      throw new NotFoundException();
    }

    const deleltedUser = users.splice(userIndex, 1);
    writeFileSync(filePath, JSON.stringify(users, null, 2));
    return deleltedUser;
  }
}
