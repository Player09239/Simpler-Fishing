import { EmbedBuilder } from 'discord.js'
import user from './../../../data/user.ts'
import bot from './../../../data/bot.ts'

export default async function dev_grant(message: any, client: any): Promise<void> {
    try {
        let b: any = await bot.findOne({ botId: '1389387486035443714' })
        if (message.content.startsWith(`${b.prefix}dev-grant`)) {
            if (message.author.id !== '1235411394019725322') return message.reply('You are not authorized to use this command')
            
            const args = message.content.split(' ').filter(Boolean)

            const action = String(args[1])
            const item = String(args[2])
            const to = String(args[3])

            if (!['add', 'take'].includes(action)) return message.reply('u stoopid')
            if (!['premium', 'cash'].includes(item)) return message.reply('u stoopid')

            try {
                const user: any = client.users.fetch(to)
            } catch (error) {
                message.reply('unknown user :>')
                throw new Error('dev-grant.ts > Unknown User')
            }

            let u: any = await user.findOne({ userId: to })
            const obj = await client.users.fetch(to)
            if (!u) {
                console.error('SYSTEM > User data not found in database.')
                u = new user({
                    userId: to,
                    name: obj.username,
                    cash: '0',
                    inventory: ["Starting Fishing Rod"],
                    equipped: 'Starting Fishing Rod',
                    catched: 0,
                    isPremium: false,
                    upgrades: {
                        fishing: {
                            cost: 300,
                            lvl: 1
                        },
                        cash: {
                            cost: 350,
                            lvl: 1
                        }
                    }
                })
                await u.save()
            }
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
            } else if (action === 'add' && item === 'cash') {
                const amount = parseInt(args[4])
                if (isNaN(amount) || amount <= 0) return message.reply('Invalid amount specified')

                u.cash += amount
                await u.save()

                const added = new EmbedBuilder()
                    .setDescription(`## ADDED
Added **$${amount.toLocaleString('en-US')}** to <@${to}>'s cash balance.
                    `)

                return message.reply({ embeds: [added] })
            } else if (action === 'take' && item === 'cash') {
                const amount = parseInt(args[4])
                if (isNaN(amount) || amount <= 0) return message.reply('Invalid amount specified')

                if (u.cash < amount) return message.reply('Insufficient cash balance to take that amount')

                u.cash -= amount
                await u.save()

                const taken = new EmbedBuilder()
                    .setDescription(`## TAKEN
Taken **$${amount.toLocaleString('en-US')}** from <@${to}>'s cash balance.
                    `)
                return message.reply({ embeds: [taken] })
            }
        }
    } catch (error) {
        throw new Error(`dev-grant.ts > Error: ${error}`)
    }
}