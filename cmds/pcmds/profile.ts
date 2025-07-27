import { EmbedBuilder } from 'discord.js'
import bot from './../../data/bot.ts'
import user from './../../data/user.ts'
import { msgup, cmdup, format } from './../../util/func.ts'
import fontConverter from './../../util/fontconverter.ts'

const profilecd = new Set();

export default async function profile(message: any): Promise <void> {
    try {
        let b: any = await bot.findOne({ botId: '1389387486035443714' })
        if (message.content.startsWith(`${b.prefix}profile`) || message.content.startsWith(`${b.prefix}pf`)) {
            let u: any = await user.findOne({ userId: message.author.id })
            if (profilecd.has(message.author.id)) {
                return message.react('⏳')
            }
            msgup()
            cmdup()

            let premium;
            if (u.isPremium) premium = '[Premium]'
            else premium = ''
            
            const pf = new EmbedBuilder()
                .setDescription(`
## PROFILE
-# ${u.name}

__**${premium} [${u.rank}] ${await fontConverter(`${u.l.lv}`)} ${u.name}**__
**>** Equipped **${u.equipped}**
**>** Cash **$${await fontConverter(await format(u.cash, 2, u.settings.numprefix))}**
**>** Catched **${await fontConverter(await format(u.catched, 2, u.settings.numprefix))}** items

**Upgrades**
**>** Fishing Tier ${u.upgrades.fishing.lvl} 
**>** Cash Tier ${u.upgrades.cash.lvl}
**>** Storage Tier ${u.upgrades.storage.lvl}
**>** XP Tier ${u.upgrades.xp.lvl}
                `)

            message.reply({ embeds: [pf] })
            profilecd.add(message.author.id)
            setTimeout(() => {
                profilecd.delete(message.author.id)
            }, 15000)
        }  
    } catch (error) {
        throw new Error(`\u001b[36m[src/cmds/pcmds/profile.ts]\u001b[36m \u001b[31m[ERROR]\u001b[31m ${error}`)
    }
}