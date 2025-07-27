import { EmbedBuilder } from 'discord.js'
import bot from './../../data/bot.ts'
import { msgup, cmdup, format, stackwithcost } from './../../util/func.ts'
import user from './../../data/user.ts'
import calculateCost from './../../util/costcalculator.ts'
import fontConverter from './../../util/fontconverter.ts'

const bagcd = new Set()

export default async function bag(message: any): Promise<void> {
    try {
        let b: any = await bot.findOne({ botId: '1389387486035443714' })
        if (message.content === `${b.prefix}bag`) {
            let u: any = await user.findOne({ userId: message.author.id })
            if (bagcd.has(message.author.id)) {
                return message.react('⏳')
            }
            msgup()
            cmdup()

            if (!u || !u.inventory || u.inventory.length === 0) {
                return message.reply('Your bag is empty.')
            }

            let stacked: string[] = await stackwithcost(u.inventory, u.settings.numprefix);

            let total = 0;
            const counts: Record<string, number> = {};
            for (const item of u.inventory) counts[item] = (counts[item] || 0) + 1;
            for (const [name, qty] of Object.entries(counts)) {
                total += calculateCost(name, qty);
            }
            const formattedTotal = await fontConverter(await format(total, 2, u.settings.numprefix))

            const bagEmbed: any = new EmbedBuilder()
                .setDescription(`
## BAG
-# ${u.name}

Equipped Rod..
${u.equipped ? `**>** ${u.equipped}` : '**>** None'}

You have..
${stacked.join('\n')}

-# **Total value: $${formattedTotal}**
                `)
                .setFooter({ text: `Bag Storage:  ${u.inventory.length.toLocaleString('en-US')} / ${u.upgrades.storage.max.toLocaleString('en-US')}` })
            message.reply({ embeds: [bagEmbed] })

            bagcd.add(message.author.id)
            setTimeout(() => {
                bagcd.delete(message.author.id)
            }, 15000)
        }
    } catch (error) {
        throw new Error(`\u001b[36m[src/cmds/pcmds/bag.ts]\u001b[36m \u001b[31m[ERROR]\u001b[31m ${error}`)
    }
}