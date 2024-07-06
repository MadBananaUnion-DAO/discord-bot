import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { DiscordService } from './discord.service';
import { CreateDiscordDto } from './dto/create-discord.dto';
import { UpdateDiscordDto } from './dto/update-discord.dto';

@Controller('discord')
export class DiscordController {
  constructor(private readonly discordService: DiscordService) {}

  @Post()
  create(@Body() createDiscordDto: CreateDiscordDto) {
    return this.discordService.create(createDiscordDto);
  }

  @Post('send-message')
  async sendMessage() {
    this.discordService.sendMessage('Pong!');
    return { status: 'Message sent' };
  }

  @Get()
  findAll() {
    return this.discordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.discordService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDiscordDto: UpdateDiscordDto,
  ) {
    return this.discordService.update(id, updateDiscordDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.discordService.remove(id);
  }
}
