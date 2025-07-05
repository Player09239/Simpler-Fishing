import bot from './../../data/bot.ts'
import user from './../../data/user.ts'
import { EmbedBuilder } from 'discord.js'
import { msgup, cmdup, format } from './../../util/func.ts'

function escapeMarkdown(text: string) {
    return text.replace(/([_*~`>])/g, '\\$1');
}

export default async function leaderboard(message: any): Promise<void> {
    try {
        let b: any = await bot.findOne({ botId: '1389387486035443714' })
        if (message.content === `${b.prefix}leaderboard`) {
            let u: any = await user.find().sort({ cash: -1 }).limit(10).exec()
            msgup()
            cmdup()

            u.sort((a: any, b: any) => b.cash - a.cash)

            const lines = await Promise.all(
                u.map(async (user: any, index: number) =>
                    `**|** **${index + 1}** **|** ${escapeMarkdown(user.name)} **|** $${await format(user.cash)} **|**`
                )
            );

            const leaderboardEmbed = new EmbedBuilder()
                .setDescription(`
## LEADERBOARD
-# ${message.author.username}

**>** **Top 10 Users by Balance**
${lines.join('\n')}
                `)

            message.reply({ embeds: [leaderboardEmbed] });
        }
    } catch (error) {
        throw new Error(`leaderboard.ts > Error: ${error}`)
    }
}