import user from './../../data/user.ts'
import bot from './../../data/bot.ts'
import { EmbedBuilder } from 'discord.js'
import { msgup, cmdup, format } from './../../util/func.ts'
import fontConverter from './../../util/fontconverter.ts'
import { nextrank, rankreq } from './../../util/ranks.ts'

const rankcd = new Set()
export default async function rank(message: any): Promise<void> {
    try {
        let b: any = await bot.findOne({ botId: '1389387486035443714' })
        if (message.content === `${b.prefix}rank`) {
            let u: any = await user.findOne({ userId: message.author.id })
            if (rankcd.has(message.author.id)) {
                return message.react('⏳')
            }
            msgup()
            cmdup()

            const rank = new EmbedBuilder() 
                .setDescription(`
## RANK
-# ${u.name}

                `)
                .addFields(
                    { name: 'Current Rank', value: `${await fontConverter(u.rank)}` },
                    { name: 'Next Rank', value: `${await fontConverter(await nextrank(u.rank))}` },
                    { name: 'Level needed for next rank', value: `${await rankreq(u.rank)}` }
                )

            message.reply({ embeds: [rank] })

            rankcd.add(message.author.id)
            setTimeout(() => {
                rankcd.delete(message.author.id)
            }, 15000)
        }
    } catch (error) {
        throw new Error(`\u001b[36m[src/cmds/pcmds/rank.ts]\u001b[36m \u001b[31m[ERROR]\u001b[31m ${error}`)
    }
}