import { EmbedBuilder } from 'discord.js'
import bot from './../../data/bot.ts'
import user from './../../data/user.ts'
import { cmdup, msgup } from './../../util/func.ts'

export async function upgrades(message: any): Promise<void> {
	try {
		let b: any = await bot.findOne({ botId: '1389387486035443714' })
		if (message.content.startsWith(`${b.prefix}upgrades`)) {
			let u: any = await user.findOne({ userId: message.author.id })
			msgup()
			cmdup()

			const args = message.content.split('').filter(Boolean)
			const upgrade = args[1]
			switch (upgrade) {
				case 'fishing':
					if (u.cash >= 300) {
						u.cash -= 300
						u.upgrades.fishing += 1
						message.reply('Successful')
						break
					} else {
						message.reply('Failure')
						break
					}
				case 'cash':
					if (u.cash >= 350) {
						u.cash -= 350
						u.upgrades.cash += 1
						message.reply('Successful')
						break
					} else {
						message.reply('Failure')
						break
					}
				default:
					const upgrades = new EmbedBuilder()
        				.setDescription(`
## UPGRADES
-# ${u.name}

Fishing I - $300
Cash I - $350
                        `)
    				message.reply({ embeds: [upgrades] })
					break
			}
		}
	} catch (error) {
		throw new Error(`upgrades.ts > Error: ${error}`)
	}
}
