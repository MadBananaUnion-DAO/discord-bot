import { Controller, Get, Post, Body, Param } from '@nestjs/common';
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

  @Post('send')
  sendMessage() {
    this.discordService.sendMessage('Pong!');
  }

  @Get()
  findAll() {
    return this.discordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.discordService.findOne(id);
  }

  @Post(':id')
  update(@Param('id') id: number, @Body() updateDiscordDto: UpdateDiscordDto) {
    return this.discordService.update(id, updateDiscordDto);
  }

  @Post('remove/:id')
  remove(@Param('id') id: number) {
    return this.discordService.remove(id);
  }
}
