import { EmbedBuilder } from 'discord.js';
import bot from './../../data/bot.ts';
import { msgup, cmdup, format } from './../../util/func.ts';
import user from './../../data/user.ts';

export default async function balance(message: any): Promise<void> {
    try {
        let b: any = await bot.findOne({ botId: '1389387486035443714' })
        if (message.content === `${b.prefix}balance` || message.content === `${b.prefix}bal`) {
            let u: any = await user.findOne({ userId: message.author.id });
            msgup();
            cmdup();

            const formattedBalance = await format(u.cash);
            const balance: any = new EmbedBuilder()
                .setDescription(`
## BALANCE
-# ${u.name}

Your current balance is **$${formattedBalance}**.
                `)

            message.reply({ embeds: [balance] });
        }
    } catch (error) {
        throw new Error(`balance.ts > Error: ${error}`)
    }
}