import bot from './../../data/bot.ts'
import user from './../../data/user.ts'
import { EmbedBuilder } from 'discord.js'
import { msgup, cmdup, format, stackwithcost } from './../../util/func.ts'
import calculateCost from './../../util/costcalculator.ts'
import fontConverter from './../../util/fontconverter.ts'

const sellcd = new Set();

const rodNames: string[] = [
    'Starting Fishing Rod',
    'Basic Fishing Rod',
    'Slightly Better Fishing Rod',
    'Advanced Fishing Rod',
    'Grand Fishing Rod',
    'Master Fishing Rod',
    'Grandmaster\'s Fishing Rod',
    'Inhumane Fishing Rod'
]

export default async function sell(message: any): Promise<void> {
    try {
        let b: any = await bot.findOne({ botId: '1389387486035443714' })
        if (message.content === `${b.prefix}sell`) {
            let u: any = await user.findOne({ userId: message.author.id })
            if (sellcd.has(message.author.id)) {
                return message.react('⏳')
            }
            msgup()
            cmdup()

            if (!u || !u.inventory || u.inventory.length === 0) {
                return message.reply('Your bag is empty.')
            }

            const toSell = u.inventory.filter((item: string) => !rodNames.includes(item));

            if (toSell.length === 0) {
                return message.reply('You have nothing to sell except fishing rods!')
            }
            
            let amount = toSell.length

            let total = 0;
            const counts: Record<string, number> = {};
            for (const item of toSell) counts[item] = (counts[item] || 0) + 1;
            for (const [name, qty] of Object.entries(counts)) {
                total += calculateCost(name, qty);
            }
            let multi = 1
            multi += (u.upgrades.cash.lvl * 0.05) - 0.05
            multi += (u.l.lv * 0.07) - 0.07
            if (u.isPremium) multi += 0.2
            if (multi < 1) multi = 1
            total = Number((total * multi).toFixed(2))
            
            const formattedTotal = await format(total, 2, u.settings.numprefix);
            
            u.inventory = u.inventory.filter((item: string) => rodNames.includes(item))
            u.cash = Number(u.cash) + total
            await u.save();

            const sell: any = new EmbedBuilder()
                .setDescription(`
## SOLD
-# ${u.name}

You sold ${amount} item(s) for a total of **$${await fontConverter(formattedTotal)}**.
                `)

            if (u.isPremium) sell.setFooter({ text: 'Premium Bonus: 20%' })
            message.reply({ embeds: [sell] })
        
            sellcd.add(message.author.id)
            setTimeout(() => {
                sellcd.delete(message.author.id)
            }, 15000)
        }
    } catch (error) {
        throw new Error(`\u001b[36m[src/cmds/pcmds/sell.ts]\u001b[36m \u001b[31m[ERROR]\u001b[31m ${error}`)
    }
}