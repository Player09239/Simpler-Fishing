import bot from './../../data/bot.ts'
import { EmbedBuilder } from 'discord.js'
import { msgup, cmdup } from './../../util/func.ts'
import user from './../../data/user.ts'

const aboutcd = new Set()

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
            if (aboutcd.has(message.author.id)) {
                return message.react('⏳') 
            }
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

-# [**Github**](<https://github.com/Player09239/Simpler-Fishing>)
-# [**Support Server**](<https://discord.gg/HdqT2kbmFC>)

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

            aboutcd.add(message.author.id)
            setTimeout(() => {
                aboutcd.delete(message.author.id)
            }, 15000)
        }
    } catch (error) {
        throw new Error(`\u001b[36m[src/cmds/pcmds/about.ts]\u001b[36m \u001b[31m[ERROR]\u001b[31m ${error}`)
    }
}