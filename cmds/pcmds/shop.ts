import bot from './../../data/bot.ts'
import { msgup, cmdup, format, stackwithcost } from '../../util/func.ts'
import user from './../../data/user.ts'
import calculateCost from './../../util/costcalculator.ts'
import { EmbedBuilder } from 'discord.js'
import fontConverter from './../../util/fontconverter.ts'

const shopcd = new Set()

export default async function shop(message: any): Promise<void> {
    try {
        let b: any = await bot.findOne({ botId: '1389387486035443714' })
        if (message.content === `${b.prefix}shop`) {
            let u: any = await user.findOne({ userId: message.author.id })
            if (shopcd.has(message.author.id)) {
                return message.react('⏳')
            }
            msgup()
            cmdup()

            let stacked: string[] = await stackwithcost(u.inventory, u.settings.numprefix);

            let total = 0;
            const counts: Record<string, number> = {};
            for (const item of u.inventory) counts[item] = (counts[item] || 0) + 1;
            for (const [name, qty] of Object.entries(counts)) {
                total += calculateCost(name, qty);
            }
            const formattedTotal = await format(total, 2, u.settings.numprefix);

            const buy: any = new EmbedBuilder()
                .setDescription(`
## SHOP
-# ${u.name}

Starting Fishing Rod
-# \`${b.prefix}buy sfrod\`
**>** FREE

Basic Fishing Rod
-# \`${b.prefix}buy bfrod\`
**>** $${await fontConverter(await format(1000, 2, u.settings.numprefix))}

Slightly Better Fishing Rod
-# \`${b.prefix}buy sbfrod\`
**>** $${await fontConverter(await format(7500, 2, u.settings.numprefix))}

Advanced Fishing Rod
-# \`${b.prefix}buy afrod\`
**>** $${await fontConverter(await format(15000, 2, u.settings.numprefix))}

Grand Fishing Rod
-# \`${b.prefix}buy gfrod\`
**>** $${await fontConverter(await format(30000, 2, u.settings.numprefix))}

Master Fishing Rod
-# \`${b.prefix}buy mfrod\`
**>** $${await fontConverter(await format(50000, 2, u.settings.numprefix))}

Grandmaster's Fishing Rod
-# \`${b.prefix}buy gmrod\`
**>** $${await fontConverter(await format(100000, 2, u.settings.numprefix))}

Inhumane Fishing Rod
-# \`${b.prefix}buy ihrod\`
**>** $${await fontConverter(await format(275000, 2, u.settings.numprefix))}

**Current Balance: $${await fontConverter(await format(u.cash, 2, u.settings.numprefix))}**
                `)

            message.reply({ embeds: [buy] })
            shopcd.add(message.author.id)
            setTimeout(() => {
                shopcd.delete(message.author.id)
            }, 15000)
        }
    } catch (error) {
        throw new Error(`\u001b[36m[src/cmds/pcmds/shop.ts]\u001b[36m \u001b[31m[ERROR]\u001b[31m ${error}`)
    }
}
