import bot from './../../data/bot.ts'
import user from './../../data/user.ts'
import { EmbedBuilder } from 'discord.js'
import { msgup, cmdup, format, stackwithcost } from './../../util/func.ts'
import calculateCost from './../../util/costcalculator.ts'

const rodNames: string[] = [
    'Starting Fishing Rod',
    'Basic Fishing Rod',
    'Slightly Better Fishing Rod',
    'Advanced Fishing Rod'
]

export default async function sell(message: any): Promise<void> {
    try {
        let b: any = await bot.findOne({ botId: '1389387486035443714' })
        if (message.content === `${b.prefix}sell`) {
            let u: any = await user.findOne({ userId: message.author.id })
            msgup()
            cmdup()

            if (!u || !u.inventory || u.inventory.length === 0) {
                return message.reply('Your bag is empty.')
            }

            const toSell = u.inventory.filter((item: string) => !rodNames.includes(item));

            if (toSell.length === 0) {
                return message.reply('You have nothing to sell except fishing rods!')
            }

            let stacked: string[] = await stackwithcost(toSell)
            let amount = toSell.length

            let total = 0;
            const counts: Record<string, number> = {};
            for (const item of toSell) counts[item] = (counts[item] || 0) + 1;
            for (const [name, qty] of Object.entries(counts)) {
                total += calculateCost(name, qty);
            }
            if (u.isPremium) total = total * 1.2
            const formattedTotal = await format(total);
            
            u.inventory = u.inventory.filter((item: string) => rodNames.includes(item))
            u.cash = Number(u.cash) + total
            await u.save();

            const sell: any = new EmbedBuilder()
                .setDescription(`
## SOLD
-# ${u.name}

You sold ${amount} item(s) for a total of **$${formattedTotal}**.
                `)

            if (u.isPremium) sell.setFooter({ text: 'Premium Bonus: 20%' })
            message.reply({ embeds: [sell] })
        }
    } catch (error) {
        throw new Error(`sell.ts > Error: ${error}`)
    }
}