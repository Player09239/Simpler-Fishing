import user from './../../data/user.ts'
import bot from './../../data/bot.ts'
import { EmbedBuilder } from 'discord.js'
import { msgup, cmdup, format } from './../../util/func.ts'
import fontConverter from './../../util/fontconverter.ts'
import { nextrank, rankreq } from './../../util/ranks.ts'

const rankupcd = new Set()

export default async function rankup(message: any): Promise<void> {
    try {
        let b: any = await bot.findOne({ botId: '1389387486035443714' })
        if (message.content.startsWith(`${b.prefix}rankup`)) {
            let u: any = await user.findOne({ userId: message.author.id })
            if (rankupcd.has(message.author.id)) {
                return message.react('⏳')
            }
            msgup()
            cmdup()

            const args = message.content.split(' ').filter(Boolean)
            const isForce = args[1]

            if (!isForce) {
                const rankup = new EmbedBuilder()
                    .setDescription(`
## RANK UP
-# ${u.name}

Are you sure that you want to rank up?
(${await fontConverter(u.rank)} => ${await fontConverter(await nextrank(u.rank))})

Type \`${b.prefix} -y\` to confirm
                    `)

                return message.reply({ embeds: [rankup] })
            } else if (isForce === `-y`) {
                const req = await rankreq(u.rank)
                if (req > u.l.lv) {
                    const fail = new EmbedBuilder()
                        .setDescription(`
## FAILURE
-# ${u.name}

Failure to rank up to ${await fontConverter(await nextrank(u.rank))}, you need ${await fontConverter(String(req - u.l.lv))} more level(s)
                        `)

                    return message.reply({ embeds: [fail] })
                } else {
                    u.rank = await nextrank(u.rank)
                    u.l.lv = 1
                    u.l.xp = 0
                    u.l.xpreq = 300

                    const success = new EmbedBuilder()
                        .setDescription(`
## SUCCESS
-# ${u.name}

You have ranked up to ${await fontConverter(u.rank)}
                        `)

                    message.reply({ embeds: [success] })
                }
            }
            rankupcd.add(message.author.id)
            setTimeout(() => {
                rankupcd.delete(message.author.id)
            }, 15000)
        }
    } catch (error) {
        throw new Error(`\u001b[36m[src/cmds/pcmds/rankup.ts]\u001b[36m \u001b[31m[ERROR]\u001b[31m ${error}`)
    }
}