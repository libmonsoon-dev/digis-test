import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from '../../../services/user.service';
import {
  CreateUserDto,
  GetUserDto,
  UpdateUserDto,
} from '../../../dto/user.dto';
import { ParseIntPipeFactory } from '../../../factory/parse-int-pipe-factory';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async get(
    @Param('id', ParseIntPipeFactory.get()) id: number,
  ): Promise<GetUserDto> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return GetUserDto.from(user);
  }

  @Post()
  async post(@Body() dto: CreateUserDto): Promise<GetUserDto> {
    const user = await this.userService.create(dto.toUser());
    return GetUserDto.from(user);
  }

  @Put('/:id')
  async put(
    @Param('id', ParseIntPipeFactory.get()) id: number,
    @Body() dto: UpdateUserDto,
  ): Promise<GetUserDto> {
    const user = await this.userService.update(id, dto.toUser());
    if (!user) {
      throw new NotFoundException();
    }
    return GetUserDto.from(user);
  }
}
