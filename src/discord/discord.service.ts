import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { CreateDiscordDto } from './dto/create-discord.dto';
import { UpdateDiscordDto } from './dto/update-discord.dto';
import { Client, GatewayIntentBits } from 'discord.js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DiscordService implements OnModuleInit, OnModuleDestroy {
  private readonly client: Client;
  private readonly token: string;
  private readonly channelId: string; // Replace with your Discord application client ID
  private readonly guildId: string; // Optional: if your commands are specific to a guild

  constructor(private readonly configService: ConfigService) {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });
    this.token = this.configService.getOrThrow<string>('MY_TEST_BOT_TOKEN');
    this.channelId =
      this.configService.getOrThrow<string>('MY_TEST_CHANNEL_ID');
  }

  async onModuleInit() {
    this.client.once('ready', async () => {
      console.log(`Logged in as ${this.client.user.tag}!`);

      // Register slash commands on bot startup
      // await this.registerSlashCommands();
    });

    this.client.on('interactionCreate', async (interaction) => {
      if (!interaction.isCommand()) return;

      // const command = interaction.commandName;
      // await this.handleSlashCommand(command, interaction);
    });

    await this.client.login(this.token);
  }

  async onModuleDestroy() {
    try {
      await this.client.destroy();
      console.log('Discord bot logged out gracefully.');
    } catch (error) {
      console.error('Error occurred while logging out Discord bot:', error);
    }
  }

  // async registerSlashCommands() {
  //   const rest = new REST({ version: '9' }).setToken(this.token);

  //   try {
  //     console.log('Started refreshing application (/) commands.');

  //     // Replace with your Discord application client ID and guild ID (if applicable)
  //     const clientId = this.client.user.id;

  //     const commands = [
  //       {
  //         name: 'ping',
  //         description: 'Replies with Pong!',
  //       },
  //       // Add more commands as needed
  //     ];

  //     if (this.guildId) {
  //       await rest.put(
  //         Routes.applicationGuildCommands(clientId, this.guildId),
  //         { body: commands },
  //       );
  //     } else {
  //       await rest.put(Routes.applicationCommands(clientId), {
  //         body: commands,
  //       });
  //     }

  //     console.log('Successfully registered application (/) commands.');
  //   } catch (error) {
  //     console.error('Error refreshing application (/) commands:', error);
  //   }
  // }

  // async handleSlashCommand(command: string, interaction: any) {
  //   switch (command) {
  //     case 'ping':
  //       await interaction.reply('Pong!');
  //       break;
  //     // Handle other commands similarly
  //     default:
  //       await interaction.reply('Command not recognized.');
  //       break;
  //   }
  // }

  create(createDiscordDto: CreateDiscordDto) {
    return `This action adds a new discord : ${createDiscordDto}`;
  }

  findAll() {
    return `This action returns all discord`;
  }

  findOne(id: number) {
    return `This action returns a #${id} discord`;
  }

  update(id: number, updateDiscordDto: UpdateDiscordDto) {
    return `This action updates a #${id} discord ${updateDiscordDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} discord`;
  }

  sendMessage(content: string) {
    const channel = this.client.channels.cache.get(this.channelId);
    if (channel && channel.isTextBased()) {
      channel.send(content);
    } else {
      console.error('Channel not found or is not text-based.');
    }
  }
}
