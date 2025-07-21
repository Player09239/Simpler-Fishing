
import { EmbedBuilder } from 'discord.js'
import bot from './../../data/bot.ts'
import user from './../../data/user.ts'
import { cmdup, msgup, format } from './../../util/func.ts'
import toRoman from './../../util/romannumeralconverter.ts'

function totalSpent(initialPrice: number, rate: number, times: number): number {
  const total = initialPrice * (Math.pow(rate, times) - 1) / (rate - 1);
  return parseFloat(total.toFixed(2))
}


export default async function upgrades(message: any): Promise<void> {
	try {
		let b: any = await bot.findOne({ botId: '1389387486035443714' })
		if (message.content.startsWith(`${b.prefix}upgrades`)) {
			let u: any = await user.findOne({ userId: message.author.id })
			msgup()
			cmdup()

			const args = message.content.split(' ').filter(Boolean)
			const what = args[1]
			const upgrade = args[2]
			const howmuch = args[3] ? parseInt(args[3]) : 1

			const successforfishing = new EmbedBuilder()
				.setDescription(`
## UPGRADED
-# ${u.name}

**Fishing** has been upgraded from **Fishing ${await toRoman(u.upgrades.fishing.lvl)}** to **Fishing ${await toRoman(u.upgrades.fishing.lvl + howmuch)}**
				`)

			const failureforfishing = new EmbedBuilder()
				.setDescription(`
## FAILURE
-# ${u.name}

Failure to upgrade **Fishing**, missing **$${await format(u.upgrades.fishing.cost - u.cash)}**
				`)

			const successforcash = new EmbedBuilder()
				.setDescription(`
## UPGRADED
-# ${u.name}

**Cash** has been upgraded from **Cash ${await toRoman(u.upgrades.cash.lvl)}** to **Cash ${await toRoman(u.upgrades.cash.lvl + howmuch)}**
				`)

			const failureforcash = new EmbedBuilder()
				.setDescription(`
## FAILURE
-# ${u.name}

Failure to upgrade **Cash**, missing **$${await format(u.upgrades.cash.cost - u.cash)}**
				`)
			
			switch (what) {
				case 'buy':
					switch (upgrade) {
						case 'fishing':
							if (u.cash >= totalSpent(u.upgrades.fishing.cost, 1.2, howmuch)) {
								u.cash -= totalSpent(u.upgrades.fishing.cost, 1.2, howmuch)
								u.upgrades.fishing.cost = Math.floor(u.upgrades.fishing.cost * Math.pow(1.2, howmuch))
								u.upgrades.fishing.lvl += howmuch
								await u.save()
								message.reply({ embeds: [successforfishing] })
								break
							} else {
								message.reply({ embeds: [failureforfishing] })
								break
							}
						case 'cash':
							if (u.cash >= totalSpent(u.upgrades.cash.cost, 1.2, howmuch)) {
								u.cash -= totalSpent(u.upgrades.cash.cost, 1.2, howmuch)
								u.upgrades.cash.cost = Math.floor(u.upgrades.cash.cost * Math.pow(1.2, howmuch))
								u.upgrades.cash.lvl += howmuch
								await u.save()
								message.reply({ embeds: [successforcash] })
								break
							} else {
								message.reply({ embeds: [failureforcash] })
								break
							}
					}
					break
				case 'view':
					switch (upgrade) {
						case 'fishing':
							const fishingarr: string[] = []
							const min = Math.floor(u.upgrades.fishing.lvl / 10) * 10
							const max = min + 10
							for (let i = min; i < max; i++) {
								if (u.upgrades.fishing.lvl === i) {
									fishingarr.push(`> **(${i}) Tier ${await toRoman(i)} - +${i - 1} fish(es) during fishing**`)
								} else {
									fishingarr.push(`> (${i}) Tier ${await toRoman(i)} - +${i - 1} fish(es) during fishing`)
								}
							}

							const upgrade = new EmbedBuilder()
								.setDescription(`
## UPGRADES
-# ${u.name}

Cash required for next upgrade:
**$${await format(u.upgrades.fishing.cost)}** or **$${u.upgrades.fishing.cost.toLocaleString('en-US')}**

***Fishing*** (T${u.upgrades.fishing.lvl})
${fishingarr.join('\n')}
								`)
							message.reply({ embeds: [upgrade] })
							break
						case 'cash':
							const casharr: string[] = []
							const min1 = Math.floor(u.upgrades.cash.lvl / 10) * 10
							const max1 = min1 + 10
							for (let i = min1; i < max1; i++) {
								if (u.upgrades.cash.lvl === i) {
									casharr.push(`> **(${i}) Tier ${await toRoman(i)} - +${(i * 5) - 5}% profit during selling**`)
								} else {
									casharr.push(`> (${i}) Tier ${await toRoman(i)} - +${(i * 5) - 5}% profit during selling`)
								}
							}

							const upgrade1 = new EmbedBuilder()
								.setDescription(`
## UPGRADES
-# ${u.name}

Cash required for next upgrade:
**$${await format(u.upgrades.cash.cost)}** or **$${u.upgrades.cash.cost.toLocaleString('en-US')}**

***Cash*** (T${u.upgrades.cash.lvl})
${casharr.join('\n')}
								`)
							message.reply({ embeds: [upgrade1] })
							break
					}
				default:
					const upgrades = new EmbedBuilder()
        				.setDescription(`
## UPGRADES
-# ${u.name}

Fishing ${await toRoman(u.upgrades.fishing.lvl)} - $${await format(u.upgrades.fishing.cost)}
Cash ${await toRoman(u.upgrades.cash.lvl)} - $${await format(u.upgrades.cash.cost)}
                        `)
    				message.reply({ embeds: [upgrades] })
					break
			}
		}
	} catch (error) {
		throw new Error(`upgrades.ts > Error: ${error}`)
	}
}
