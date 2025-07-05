import bot from './../../data/bot.ts'
import { msgup, cmdup, format } from './../../util/func.ts'
import user from './../../data/user.ts'
import { EmbedBuilder } from 'discord.js'

export default async function equip(message: any): Promise<void> {
    try {
        let b: any = await bot.findOne({ botId: '1389387486035443714' })
        if (message.content.startsWith(`${b.prefix}equip`)) {
            let u: any = await user.findOne({ userId: message.author.id })
            msgup()
            cmdup()

            const args = message.content.split(' ').filter(Boolean)
            const item = args[1]

            if (!item) {
                return message.reply('Please specify an item to equip.')
            }

            let aitem: string = ''
            switch (item.toLowerCase()) {
                case 'sfrod':
                    aitem = 'Starting Fishing Rod'
                    break;
                case 'bfrod':
                    aitem = 'Basic Fishing Rod'
                    break;``
                case 'sbfrod':
                    aitem = 'Slightly Better Fishing Rod'
                    break;
                case 'afrod':
                    aitem = 'Advanced Fishing Rod'
                    break;
                default:
                    message.reply('Invalid item specified')
            }

            if (!u.inventory.includes(aitem)) {
                return message.reply(`You do not have a ${aitem} to equip.`);
            }
            if (u.equipped === aitem) {
                return message.reply(`You already have the **${aitem}** equipped.`);
            }

            u.equipped = aitem
            await u.save()

            const equipped: any = new EmbedBuilder()
                .setDescription(`
## EQUIPPED
-# ${u.name}

You have equipped the **${aitem}**.
                `)
            message.reply({ embeds: [equipped] })
        }
    } catch (error) {
        throw new Error(`equip.ts > Error: ${error}`)
    }
}