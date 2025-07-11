import * as dotenv from 'dotenv'
dotenv.config()
import { Client, Message, GatewayIntentBits } from 'discord.js';
import mongoose from 'mongoose'
import msg from './events/message.ts'

import dev_grant from './cmds/pcmds/devpcmds/dev-grant.ts'

import fish from './cmds/pcmds/fish.ts'
import bag from './cmds/pcmds/bag.ts'
import sell from './cmds/pcmds/sell.ts'
import shop from './cmds/pcmds/shop.ts'
import balance from './cmds/pcmds/balance.ts'
import buy from './cmds/pcmds/buy.ts'
import equip from './cmds/pcmds/equip.ts'
import help from './cmds/pcmds/help.ts'
import leaderboard from './cmds/pcmds/leaderboard.ts'
import about from './cmds/pcmds/about.ts'
import profile from './cmds/pcmds/profile.ts'

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
    ]
});

client.once('ready', (client) => {
    console.log(`> Logged in as ${client.user?.tag}!`);
})

client.on('messageCreate', async (message) => {
    await msg(message)

    await dev_grant(message, client)

    await fish(message)
    await bag(message)
    await sell(message)
    await shop(message)
    await balance(message)
    await buy(message)
    await equip(message)
    await help(message)
    await leaderboard(message)
    await about(message, client)
    await profile(message)
})

mongoose.connect(process.env.MONGO_URI as string).then(() => {
    console.log('> Connected to MongoDB');
}).catch((err) => {
    console.error('> Failed to connect to MongoDB:', err);
})

client.login(process.env.TOKEN)
