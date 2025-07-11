import { EmbedBuilder } from 'discord.js'
import user from './../../../data/user.ts'
import bot from './../../../data/bot.ts'

export default async function dev_grant(message: any, client: any): Promise<void> {
    try {
        let b: any = await bot.findOne({ botId: '1389387486035443714' })
        if (message.content.startsWith(`${b.prefix}dev-grant`)) {
            if (message.author.id !== '1235411394019725322') return message.reply('You are not authorized to use this command')
            
            const args = message.content.split(' ').filter(Boolean)
            if (args.length !== 4) return message.channel.send(`Expected 3 arguments, got ${args.length - 1}`)

            const action = String(args[1])
            const item = String(args[2])
            const to = String(args[3])

            if (!['add', 'take'].includes(action)) return message.reply('u stoopid')
            if (!['premium'].includes(item)) return message.reply('u stoopid')

            try {
                const user: any = client.users.fetch(to)
            } catch (error) {
                message.reply('unknown user :>')
                throw new Error('dev-grant.ts > Unknown User')
            }

            let u: any = await user.findOne({ userId: to })
            if (action === 'add' && item === 'premium') {
                u.isPremium === true
                await u.save()

                const granted = new EmbedBuilder()
                    .setDescription(`
## GRANTED

Granted **PREMIUM** to <@${to}>
                    `)

                return message.reply({ embeds: [granted] })
            } else if (action === 'take' && item === 'premium') {
                u.isPremium = false
                await u.save()

                const revoked = new EmbedBuilder()
                    .setDescription(`
## REVOKED

Revoked **PREMIUM** from <@${to}>
                    `)

                return message.reply({ embeds: [revoked] })
            }
        }
    } catch (error) {
        throw new Error(`dev-grant.ts > Error: ${error}`)
    }
}