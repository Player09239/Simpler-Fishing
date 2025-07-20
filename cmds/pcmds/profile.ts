import { EmbedBuilder } from 'discord.js'
import bot from './../../data/bot.ts'
import user from './../../data/user.ts'
import { msgup, cmdup, format } from './../../util/func.ts'

export default async function profile(message: any): Promise <void> {
    try {
        let b: any = await bot.findOne({ botId: '1389387486035443714' })
        if (message.content.startsWith(`${b.prefix}profile`) || message.content.startsWith(`${b.prefix}pf`)) {
            let u: any = await user.findOne({ userId: message.author.id })
            msgup()
            cmdup()

            let premium;
            if (u.isPremium) premium = '[Premium]'
            else premium = ''
            
            const pf = new EmbedBuilder()
                .setDescription(`
## PROFILE
-# ${u.name}

__**${premium} ${u.name}**__
**>** Equipped **${u.equipped}**
**>** Cash **$${await format(u.cash)}**
**>** Catched **${await format(u.catched)}** items

**Upgrades**
**>** Fishing Tier ${u.upgrades.fishing.lvl} 
**>** Cash Tier ${u.upgrades.cash.lvl}
                `)

            message.reply({ embeds: [pf] })
        }  
    } catch (error) {
        throw new Error(`profile.ts > Error: ${error}`)
    }
}