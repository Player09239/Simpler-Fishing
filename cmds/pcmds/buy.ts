import bot from './../../data/bot.ts'
import { msgup, cmdup, format } from './../../util/func.ts'
import user from './../../data/user.ts'
import { EmbedBuilder } from 'discord.js'
import fontConverter from './../../util/fontconverter.ts'

const buycd = new Set();

export default async function buy(message: any): Promise<void> { 
    try {
        let b: any = await bot.findOne({ botId: '1389387486035443714' })
        if (message.content.startsWith(`${b.prefix}buy`)) {
            let u: any = await user.findOne({ userId: message.author.id })
            if (buycd.has(message.author.id)) {
                return message.react('⏳')
            }
            msgup()
            cmdup()

            const item = message.content.split(' ')[1]
            if (!item) {
                return message.reply('Please specify an item to buy.')
            }

            let cost: number = 0;
            let aitem: string = ''
            switch (item.toLowerCase()) {
                case 'sfrod':
                    cost = 0
                    aitem = 'Starting Fishing Rod'
                    if (u.inventory.includes('Starting Fishing Rod')) {
                        return message.reply('You already have a Starting Fishing Rod.');
                    }
                    break;
                case 'bfrod':
                    cost = 1000
                    aitem = 'Basic Fishing Rod'
                    if (u.inventory.includes('Basic Fishing Rod')) {
                        return message.reply('You already have a Basic Fishing Rod.');
                    }
                    break;
                case 'sbfrod':
                    cost = 7500
                    aitem = 'Slightly Better Fishing Rod'
                    if (u.inventory.includes('Slightly Better Fishing Rod')) {
                        return message.reply('You already have a Slightly Better Fishing Rod.');
                    }
                    break;
                case 'afrod':
                    aitem = 'Advanced Fishing Rod'
                    cost = 15000
                    if (u.inventory.includes('Advanced Fishing Rod')) {
                        return message.reply('You already have an Advanced Fishing Rod.');
                    }
                    break;
                case 'gfrod':
                    aitem = 'Grand Fishing Rod'
                    cost = 30000
                    if (u.inventory.includes('Grand Fishing Rod')) {
                        return message.reply('You already have a Grand Fishing Rod.');
                    }
                    break;
                case 'mfrod':
                    aitem = 'Master Fishing Rod'
                    cost = 50000
                    if (u.inventory.includes('Master Fishing Rod')) {
                        return message.reply('You already have a Master Fishing Rod.');
                    }
                    break;
                case 'gmrod':
                    aitem = 'Grandmaster\'s Fishing Rod'
                    cost = 100000
                    if (u.inventory.includes('Grandmaster\'s Fishing Rod')) {
                        return message.reply('You already have a Grandmaster\'s Fishing Rod.');
                    }
                    break;
                case 'ihrod':
                    aitem = 'Inhumane Fishing Rod'
                    cost = 275000
                    if (u.inventory.includes('Inhumane Fishing Rod')) {
                        return message.reply('You already have an Inhumane Fishing Rod.');
                    }
                    break;
                default:
                    return message.reply('Invalid item specified.');
            }

            if (u.cash < cost) {
                return message.reply(`You do not have enough cash to buy a ${aitem}.`);
            }

            u.cash -= cost;
            u.inventory.push(aitem);
            await u.save();

            const formattedCost = await fontConverter(await format(cost, 2, u.settings.numprefix))
            const buyEmbed = new EmbedBuilder()
                .setDescription(`
## PURCHASED
-# ${u.name}

You purchased a **${aitem}** for **$${formattedCost}**.
                `);

            message.reply({ embeds: [buyEmbed] });
            buycd.add(message.author.id);
            setTimeout(() => {
                buycd.delete(message.author.id);
            }, 15000);
        }
    } catch (error) {
        throw new Error(`\u001b[36m[src/cmds/pcmds/buy.ts]\u001b[36m \u001b[31m[ERROR]\u001b[31m ${error}`)
    }
}