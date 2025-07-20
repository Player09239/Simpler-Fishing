import { EmbedBuilder } from 'discord.js'
import bot from './../../data/bot.ts'
import { msgup, cmdup, format, stack } from './../../util/func.ts'
import getReward from './../../util/loottable.ts'
import user from './../../data/user.ts'

export default async function fish(message: any): Promise<void> {
    try {
        let b: any = await bot.findOne({ botId: '1389387486035443714' })
        if (message.content === `${b.prefix}fish`) {
            let u: any = await user.findOne({ userId: message.author.id })
            msgup()
            cmdup()
            
            let reward: string[] = []
            let catching = 5 + (u.upgrades.fishing.lvl - 1)
			let i = 0
            while (i < catching) {
                reward.push(getReward(u.equipped))
                u.catched++
				i++
            }
            await u.save()

            u.inventory.push(...reward)
            await u.save()

            let stacked: string[] = await stack(reward)

            const fished: any = new EmbedBuilder()
                .setDescription(`
## FISHING
-# ${u.name}

You caught..
${stacked.join('\n')}
                `)
            message.reply({ embeds: [fished] })
        }
    } catch (error) {
        throw new Error(`fish.ts > Error: ${error}`)
    }
}