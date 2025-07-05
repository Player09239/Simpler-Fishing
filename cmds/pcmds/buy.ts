import bot from './../../data/bot.ts'
import { msgup, cmdup, format } from './../../util/func.ts'
import user from './../../data/user.ts'
import { EmbedBuilder } from 'discord.js'

export default async function buy(message: any): Promise<void> { 
    try {
        let b: any = await bot.findOne({ botId: '1389387486035443714' })
        if (message.content.startsWith(`${b.prefix}buy`)) {
            let u: any = await user.findOne({ userId: message.author.id })
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
                default:
                    return message.reply('Invalid item specified.');
            }

            if (u.cash < cost) {
                return message.reply(`You do not have enough cash to buy a ${aitem}.`);
            }

            u.cash -= cost;
            u.inventory.push(aitem);
            await u.save();

            const formattedCost = await format(cost);
            const buyEmbed = new EmbedBuilder()
                .setDescription(`
## PURCHASED
-# ${u.name}

You purchased a **${aitem}** for **$${formattedCost}**.
                `);

            message.reply({ embeds: [buyEmbed] });
        }
    } catch (error) {
        throw new Error(`buy.ts > Error: ${error}`)
    }
}