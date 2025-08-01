import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import type { IUser } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('users')
  postUser(@Body() data: IUser): IUser {
    return this.appService.postUser(data);
  }
  
  @Get('users')
  getAllUsers() {
    return this.appService.getAllUser();
  }

  @Get('users/:id')
  getUserById(@Param('id') id: string) {
    return this.appService.getUserById(id);
  }

  @Patch('users/:id')
  updateUser(@Param('id') id: string, @Body() data: IUser): IUser {
    return this.appService.updateUser(id, data);
  }

  @Delete('users/:id')
  deleteUser(@Param('id') id: string) {
    return this.appService.deleteUser(id);
  }
}
