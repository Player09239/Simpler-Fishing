import bot from './../../data/bot.ts'
import {  EmbedBuilder } from 'discord.js'
import { msgup, cmdup } from './../../util/func.ts'
import user from './../../data/user.ts'

const helpcd = new Set();

export default async function help(message: any): Promise<void> {
    try {
        let b: any = await bot.findOne({ botId: '1389387486035443714' })
        if (message.content === `${b.prefix}help`) {
            let u: any = await user.findOne({ userId: message.author.id })
            if (helpcd.has(message.author.id)) {
                return message.react('⏳')
            }
            msgup()
            cmdup()

            const help: EmbedBuilder = new EmbedBuilder()
                .setDescription(`
## HELP
-# ${u.name}
-# Prefix \`${b.prefix}\`

**Commands:**
**>** \`${b.prefix}balance\` - Check your balance.
**>** \`${b.prefix}bag\` - View your bag.
**>** \`${b.prefix}fish\` - Go fishing.
**>** \`${b.prefix}equip <item>\` - Equip a fishing rod.
**>** \`${b.prefix}buy <item>\` - Buy an item.
**>** \`${b.prefix}sell\` - Sell your fishing rods.
**>** \`${b.prefix}help\` - Show this help message.
**>** \`${b.prefix}leaderboard\` - View the leaderboard.
**>** \`${b.prefix}shop\` - View the shop.
**>** \`${b.prefix}about\` - About the bot.
**>** \`${b.prefix}profile\` - View your profile.
**>** \`${b.prefix}upgrades ?[<buy | view> <upgrade> ?<times>]\` - Buy/View your upgrades.
**>** \`${b.prefix}level - View your level.
                `)
            message.reply({ embeds: [help] })
            helpcd.add(message.author.id)
            setTimeout(() => {
                helpcd.delete(message.author.id)
            }, 15000)
        }
    } catch (error) {
        throw new Error(`\u001b[36m[src/cmds/pcmds/help.ts]\u001b[36m \u001b[31m[ERROR]\u001b[31m ${error}`)
    }
}