import { EmbedBuilder } from 'discord.js'
import bot from './../../data/bot.ts'
import { msgup, cmdup, format, stack } from './../../util/func.ts'
import getReward from './../../util/loottable.ts'
import user from './../../data/user.ts'
import xpcalc from './../../util/xpgained.ts'
import checklvlup from './../../util/checklvlup.ts'

const fishcd = new Set();

export default async function fish(message: any): Promise<void> {
    try {
        let b: any = await bot.findOne({ botId: '1389387486035443714' })
        if (message.content === `${b.prefix}fish`) {
            let u: any = await user.findOne({ userId: message.author.id })
            if (fishcd.has(message.author.id)) {
                return message.react('⏳')
            }
            msgup()
            cmdup()
            
            let reward: string[] = []
            let catching = 5 + (u.upgrades.fishing.lvl - 1)
			let i = 0

            let gained = await xpcalc(1 + (u.upgrades.xp.lvl * 0.07) - 0.07)

            while (i < catching) {
                reward.push(getReward(u.equipped))
                u.catched++
				i++
            }
            await u.save()
            if (u.inventory.length >= u.upgrades.storage.max) {
                return message.reply('Your bag is full! Please sell all fishes before fishing again.')
            }

            u.inventory.push(...reward)
            u.l.xp += gained
            await checklvlup(message.author.id)
            await u.save()

            let stacked: string[] = await stack(reward)

            const fished: any = new EmbedBuilder()
                .setDescription(`
## FISHING
-# ${u.name}

You caught..
${stacked.join('\n')}

-# **+${gained} XP**
                `)
            message.reply({ embeds: [fished] })
            fishcd.add(message.author.id)
            setTimeout(() => {
                fishcd.delete(message.author.id)
            }, 20000)
        }
    } catch (error) {
        throw new Error(`\u001b[36m[src/cmds/pcmds/fish.ts]\u001b[36m \u001b[31m[ERROR]\u001b[31m ${error}`)
    }
}