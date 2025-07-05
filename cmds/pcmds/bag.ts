import { EmbedBuilder } from 'discord.js'
import bot from './../../data/bot.ts'
import { msgup, cmdup, format, stackwithcost } from './../../util/func.ts'
import user from './../../data/user.ts'
import calculateCost from './../../util/costcalculator.ts'

export default async function bag(message: any): Promise<void> {
    try {
        let b: any = await bot.findOne({ botId: '1389387486035443714' })
        if (message.content === `${b.prefix}bag`) {
            let u: any = await user.findOne({ userId: message.author.id })
            msgup()
            cmdup()

            if (!u || !u.inventory || u.inventory.length === 0) {
                return message.reply('Your bag is empty.')
            }

            let stacked: string[] = await stackwithcost(u.inventory)

            let total = 0;
            const counts: Record<string, number> = {};
            for (const item of u.inventory) counts[item] = (counts[item] || 0) + 1;
            for (const [name, qty] of Object.entries(counts)) {
                total += calculateCost(name, qty);
            }
            const formattedTotal = await format(total);

            const bagEmbed: any = new EmbedBuilder()
                .setDescription(`
## BAG
-# ${u.name}

Equipped Rod..
${u.equipped ? `**>** ${u.equipped}` : '**>** None'}

You have..
${stacked.join('\n')}

**Total value: $${formattedTotal}**
                `)
            message.reply({ embeds: [bagEmbed] })
        }
    } catch (error) {
        throw new Error(`bag.ts > Error: ${error}`)
    }
}