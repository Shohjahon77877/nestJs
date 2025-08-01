import { Injectable } from '@nestjs/common';
import { writeFileSync, readFileSync } from 'fs';
import * as path from 'path';

const filePath = path.join(__dirname, '..', 'src/users.json');

export interface IUser {
  id: number;
  username: string;
}

@Injectable()
export class AppService {
  postUser(data: IUser): IUser {
    const users: IUser[] = JSON.parse(readFileSync(filePath, 'utf-8'));

    const { id, ...rest } = data;
    const newUser = { id: (users.at(-1)?.id ?? 0) + 1, ...rest}
    users.push(newUser);

    writeFileSync(filePath, JSON.stringify(users, null, 2));
    return data;
  }

  getAllUser(): object {
    const users: IUser[] = JSON.parse(readFileSync(filePath, 'utf-8'));
    return users;
  }

  getUserById(id: string): IUser | undefined {
    const users: IUser[] = JSON.parse(readFileSync(filePath, 'utf-8'));
    const user = users.find(user => user.id === +id);
    return user;
  }

  updateUser(id: string, data: IUser): IUser {
    const users: IUser[] = JSON.parse(readFileSync(filePath, 'utf-8'));

    users.find(user => {
      if (user.id === +id) {
        user.username = data.username
      }
    });

    writeFileSync(filePath, JSON.stringify(users, null, 2));
    return data;
  }

  deleteUser(id: string): object {
    const users: IUser[] = JSON.parse(readFileSync(filePath, 'utf-8'));
    const userIndex = users.findIndex(user => user.id === +id);
    const deletedUser = users.splice(userIndex, 1);
    
    writeFileSync(filePath, JSON.stringify(users, null, 2))
    return deletedUser;
  }
}


