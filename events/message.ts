import { GuildMemberFlagsBitField } from 'discord.js';
import bot from './../data/bot.ts'
import user from './../data/user.ts'
import checklvlup from './../util/checklvlup.ts'

export default async function msg(message: any): Promise<void> {
    let b: any = await bot.findOne({ botId: '1389387486035443714' });
    let u: any = await user.findOne({ userId: message.author.id });

    if (!b) {
        console.error('SYSTEM > Bot data not found in database.')
        b = new bot({
            botId: '1389387486035443714',
            prefix: 'f!',
            stats: {
                msgs: 0,
                cmds: 0
            }
        })
        await b.save();
    }

    if (!u) {
        console.log(`\u001b[36m[src/events/message.ts]\u001b[36m \u001b[34m[ALERT]\u001b[34m ${message.author.id} is not found in the database, adding now..`)
        u = new user({
            userId: message.author.id,
            name: message.author.username,
            cash: '0',
            inventory: ["Starting Fishing Rod"],
            equipped: 'Starting Fishing Rod',
            catched: 0,
            isPremium: false,
            upgrades: {
                fishing: {
                    cost: 300,
                    lvl: 1
                },
                cash: {
                    cost: 350,
                    lvl: 1
                },
                storage: {
                    cost: 425,
                    lvl: 1,
                    max: 175
                },
                xp: {
                    cost: 290,
                    lvl: 1
                }
            },
            settings: {
                numprefix: true
            },
            l: {
                lv: 1,
                xp: 0,
                xpreq: 300
            }
        })
        await u.save();
        console.log(`\u001b[36m[src/events/message.ts]\u001b[36m \u001b[34m[ALERT]\u001b[34m ${message.author.id} is added to the database.`)
    }

    await checklvlup(message.author.id)
}