import { EmbedBuilder } from 'discord.js'
import { msgup, cmdup, format } from './../../util/func.ts'
import fontConverter from './../../util/fontconverter.ts'
import bot from './../../data/bot.ts'
import user from './../../data/user.ts'

const levelcd = new Set()

export default async function level(message: any): Promise<void> {
    try {
        let b: any = await bot.findOne({ botId: '1389387486035443714' })
        if (message.content === `${b.prefix}level` || message.content === `${b.prefix}lvl`) {
            let u: any = await user.findOne({ userId: message.author.id })
            if (levelcd.has(message.author.id)) {
                return message.react('⏳')
            }
            msgup()
            cmdup()
            const lvl = new EmbedBuilder()  
                .setDescription(`
## LEVEL
-# ${u.name}

You are currently ${await fontConverter(`Level ${u.l.lv} (${u.l.xp} XP out of ${u.l.xpreq})`)}
                `)

            message.reply({ embeds: [lvl] })

            levelcd.add(message.author.id)
            setTimeout(() => {
                levelcd.delete(message.author.id)
            }, 15000)
        }
    } catch (error) {
        throw new Error(`\u001b[36m[src/cmds/pcmds/level.ts]\u001b[36m \u001b[31m[ERROR]\u001b[31m ${error}`)
    }
}