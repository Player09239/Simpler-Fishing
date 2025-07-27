import * as dotenv from 'dotenv'
dotenv.config()
import { Client, Message, GatewayIntentBits, MessageFlagsBitField } from 'discord.js';
import mongoose from 'mongoose'
import msg from './events/message.ts'

import dev_grant from './cmds/pcmds/devpcmds/dev-grant.ts'
import dev_reset from './cmds/pcmds/devpcmds/dev-reset.ts'

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
import upgrades from './cmds/pcmds/upgrades.ts'
import settings from './cmds/pcmds/settings.ts'
import level from './cmds/pcmds/level.ts'
import rank from './cmds/pcmds/rank.ts'
import rankup from './cmds/pcmds/rankup.ts'

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
    console.log(`\u001b[36m[src/index.ts]\u001b[36m \u001b[32m[SUCCESS]\u001b[32m ${client.user?.tag} is now online!`)
})

client.on('messageCreate', async (message) => {
    await msg(message)

    await dev_grant(message, client)
    await dev_reset(message, client)

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
    await upgrades(message)
    await settings(message)
    await level(message)
    await rank(message)
    await rankup(message)
})

mongoose.connect(process.env.MONGO_URI as string).then(() => {
    console.log(`\u001b[36m[src/index.ts]\u001b[36m \u001b[32m[SUCCESS]\u001b[32m Successfully connected with database`)
}).catch((err) => {
    throw new Error(`\u001b[36m[src/index.ts]\u001b[36m \u001b[31m[ERROR]\u001b[31m Failure to connect with database, ${err}`)
})

client.login(process.env.TOKEN)
