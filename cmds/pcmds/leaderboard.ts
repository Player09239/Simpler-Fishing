import bot from './../../data/bot.ts'
import user from './../../data/user.ts'
import { EmbedBuilder } from 'discord.js'
import { msgup, cmdup, format } from './../../util/func.ts'
import fontConverter from './../../util/fontconverter.ts';

const leaderboardcd = new Set();

function escapeMarkdown(text: string) {
    return text.replace(/([_*~`>])/g, '\\$1');
}

export default async function leaderboard(message: any): Promise<void> {
    try {
        let b: any = await bot.findOne({ botId: '1389387486035443714' })
        if (message.content === `${b.prefix}leaderboard`) {
            let u: any = await user.find().sort({ cash: -1 }).limit(10).exec()
            if (leaderboardcd.has(message.author.id)) {
                return message.react('⏳')
            }
            msgup()
            cmdup()

            u.sort((a: any, b: any) => b.cash - a.cash)

            const lines = await Promise.all(
                u.map(async (user: any, index: number) => {
                    const numprefix = user.settings?.numprefix ?? true; // default to true if missing
                    return `**|** **${index + 1}** **|** ${escapeMarkdown(user.name)} **|** $${await fontConverter(await format(user.cash, 2, numprefix))} **|**`
                })
            );

            const leaderboardEmbed = new EmbedBuilder()
                .setDescription(`
## LEADERBOARD
-# ${message.author.username}

**>** **Top 10 Users by Balance**
${lines.join('\n')}
                `)

            message.reply({ embeds: [leaderboardEmbed] });
            leaderboardcd.add(message.author.id)
            setTimeout(() => {
                leaderboardcd.delete(message.author.id)
            }, 15000)
        }
    } catch (error) {
        throw new Error(`\u001b[36m[src/cmds/pcmds/leaderboard.ts]\u001b[36m \u001b[31m[ERROR]\u001b[31m ${error}`)
    }
}