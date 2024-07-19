import { promises as fs } from 'fs';
import * as path from 'path';

const filePath = path.join(__dirname, 'eligible-channels.json');

interface EligibleChannels {
  [key: string]: string;
}

async function readEligibleChannelsFile(): Promise<EligibleChannels> {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

export async function getEligibleChannelByName(name: string): Promise<string | undefined> {
  const channels = await readEligibleChannelsFile();
  return channels[name];
}

export async function getAllEligibleChannels(): Promise<EligibleChannels> {
  return await readEligibleChannelsFile();
}
