import user from './../../../data/user.ts'
import bot from './../../../data/bot.ts'
import { EmbedBuilder } from 'discord.js'

export default async function dev_reset(message: any, client: any): Promise<void> {
    try {
        let b: any = await bot.findOne({ botId: '1389387486035443714' })
        if (message.content.startsWith(`${b.prefix}dev-reset`)) {
            if (message.author.id !== '1235411394019725322') return message.reply('You are not authorized to use this command')
            
            const args = message.content.split(' ').filter(Boolean)
            const target = String(args[1])

            try {
                const user: any = await client.users.fetch(target)
            } catch (error) {
                message.reply('unknown user :>')
                throw new Error(`dev-reset.ts > Error: ${error}`)
            }

            user.deleteOne({ userId: target }).then(() => {
                const reset = new EmbedBuilder()    
                    .setDescription(`
## RESET
Successfully reset <@${target}>'s data.
                    `)
                message.reply({ embeds: [reset] })
            })
            
        }
    } catch (error) {
        throw new Error(`dev-reset.ts > Error: ${error}`)
    }
}
