import bot from '../../data/bot.ts'
import { msgup, cmdup, format, stackwithcost } from '../../util/func.ts'
import user from '../../data/user.ts'
import calculateCost from '../../util/costcalculator.ts'
import { EmbedBuilder } from 'discord.js'

export default async function shop(message: any): Promise<void> {
    try {
        let b: any = await bot.findOne({ botId: '1389387486035443714' })
        if (message.content === `${b.prefix}shop`) {
            let u: any = await user.findOne({ userId: message.author.id })
            msgup()
            cmdup()

            let stacked: string[] = await stackwithcost(u.inventory)

            let total = 0;
            const counts: Record<string, number> = {};
            for (const item of u.inventory) counts[item] = (counts[item] || 0) + 1;
            for (const [name, qty] of Object.entries(counts)) {
                total += calculateCost(name, qty);
            }
            const formattedTotal = await format(total);

            const buy: any = new EmbedBuilder()
                .setDescription(`
## SHOP
-# ${u.name}

Starting Fishing Rod
-# \`${b.prefix}buy sfrod\`
**>** FREE

Basic Fishing Rod
-# \`${b.prefix}buy bfrod\`
**>** $1.00k (thousands)

Slightly Better Fishing Rod
-# \`${b.prefix}buy sbfrod\`
**>** $7.50k (thousands)

Advanced Fishing Rod
-# \`${b.prefix}buy afrod\`
**>** $15.00k (thousands)

**Current Balance: $${await format(u.cash)}**
                `)

            message.reply({ embeds: [buy] })
        }
    } catch (error) {
        throw new Error(`shop.ts > Error: ${error}`)
    }
}
