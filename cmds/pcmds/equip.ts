import bot from './../../data/bot.ts'
import { msgup, cmdup, format } from './../../util/func.ts'
import user from './../../data/user.ts'
import { EmbedBuilder } from 'discord.js'

const equipcd = new Set();

export default async function equip(message: any): Promise<void> {
    try {
        let b: any = await bot.findOne({ botId: '1389387486035443714' })
        if (message.content.startsWith(`${b.prefix}equip`)) {
            let u: any = await user.findOne({ userId: message.author.id })
            if (equipcd.has(message.author.id)) {
                return message.react('⏳')
            }
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
                    break;
                case 'sbfrod':
                    aitem = 'Slightly Better Fishing Rod'
                    break;
                case 'afrod':
                    aitem = 'Advanced Fishing Rod'
                    break;
                case 'gfrod':
                    aitem = 'Grand Fishing Rod'
                    break;
                case 'mfrod':
                    aitem = 'Master Fishing Rod'
                    break;
                case 'gmrod':
                    aitem = 'Grandmaster\'s Fishing Rod'
                    break;
                case 'ihrod':
                    aitem = 'Inhumane Fishing Rod'
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
            equipcd.add(message.author.id)
            setTimeout(() => {
                equipcd.delete(message.author.id)
            }, 15000)
        }
    } catch (error) {
        throw new Error(`\u001b[36m[src/cmds/pcmds/equip.ts]\u001b[36m \u001b[31m[ERROR]\u001b[31m ${error}`)
    }
}