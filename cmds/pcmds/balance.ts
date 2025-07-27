import { EmbedBuilder } from 'discord.js';
import bot from './../../data/bot.ts';
import { msgup, cmdup, format } from './../../util/func.ts';
import user from './../../data/user.ts';
import fontConverter from './../../util/fontconverter.ts';

const balancecd = new Set();

export default async function balance(message: any): Promise<void> {
    try {
        let b: any = await bot.findOne({ botId: '1389387486035443714' })
        if (message.content === `${b.prefix}balance` || message.content === `${b.prefix}bal`) {
            let u: any = await user.findOne({ userId: message.author.id });
            if (balancecd.has(message.author.id)) {
                return message.react('⏳')
            }
            msgup();
            cmdup();

            const formattedBalance = await fontConverter(await format(u.cash, 2, u.settings.numprefix))
            const balance: any = new EmbedBuilder()
                .setDescription(`
## BALANCE
-# ${u.name}

Your current balance is **$${formattedBalance}**.
                `)

            message.reply({ embeds: [balance] });
            balancecd.add(message.author.id);
            setTimeout(() => {
                balancecd.delete(message.author.id);
            }, 15000);
        }
    } catch (error) {
        throw new Error(`\u001b[36m[src/cmds/pcmds/balance.ts]\u001b[36m \u001b[31m[ERROR]\u001b[31m ${error}`)
    }
}