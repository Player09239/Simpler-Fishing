import bot from './../../data/bot.ts'
import { EmbedBuilder } from 'discord.js'
import { msgup, cmdup } from './../../util/func.ts'
import user from './../../data/user.ts'

function formatUptime(ms: number): string {
    const s = Math.floor(ms / 1000) % 60;
    const m = Math.floor(ms / (1000 * 60)) % 60;
    const h = Math.floor(ms / (1000 * 60 * 60)) % 24;
    const d = Math.floor(ms / (1000 * 60 * 60 * 24));
    return `${d}d ${h}h ${m}m ${s}s`;
}

export default async function about(message: any, client: any): Promise<void> {
    try {
        let b: any = await bot.findOne({ botId: '1389387486035443714' })
        if (message.content === `${b.prefix}about`) {
            let u: any = await user.findOne({ userId: message.author.id })
            msgup()
            cmdup()

            let color: string;
            if (client.ws.ping < 100) color = '🟢'
            else if (client.ws.ping < 200) color = '🟡'
            else color = '🔴'

            const about: EmbedBuilder = new EmbedBuilder()
                .setDescription(`
## ABOUT
-# Simpler Fishing

**>** __External Stats__
> Founder **chaos_09239**
> Ping **${color} ${client.ws.ping}ms**
> Total Users **${await user.countDocuments()}**
> Total Servers **${client.guilds.cache.size}**

**>** __Internal Stats__
> Uptime **${formatUptime(process.uptime() * 1000)}**
> Language **TypeScript**
> Total Commands Executed **${b.stats.cmds}**
> Total Messages Sent **${b.stats.msgs}**
                `)
                .setFooter({ text: `Made by Simpler Productions` })
            message.reply({ embeds: [about] })
        }
    } catch (error) {
        throw new Error(`about.ts > Error: ${error}`)
    }
}