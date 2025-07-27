import { EmbedBuilder } from 'discord.js'
import bot from './../../data/bot.ts'
import user from './../../data/user.ts'
import { cmdup, msgup, format } from './../../util/func.ts'
import toRoman from './../../util/romannumeralconverter.ts'

const upgradescd = new Set();

function totalSpent(initialPrice: number, rate: number, times: number): number {
  const total = initialPrice * (Math.pow(rate, times) - 1) / (rate - 1);
  return parseFloat(total.toFixed(2))
}

const baseStorageCost = 425
const baseCashCost = 350
const baseFishingCost = 300
const baseXPCost = 290


export default async function upgrades(message: any): Promise<void> {
	try {
		let b: any = await bot.findOne({ botId: '1389387486035443714' })
		if (message.content.startsWith(`${b.prefix}upgrades`)) {
			let u: any = await user.findOne({ userId: message.author.id })
			if (upgradescd.has(message.author.id)) {
				return message.react('⏳')
			}
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

Failure to upgrade **Fishing**, missing **$${await format(totalSpent(u.upgrades.fishing.cost, 1.02, howmuch) - u.cash, 2, u.settings.numprefix)}**
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

Failure to upgrade **Cash**, missing **$${await format(totalSpent(u.upgrades.cash.cost, 1.02, howmuch) - u.cash, 2, u.settings.numprefix)}**
				`)

			const successforstorage = new EmbedBuilder()
				.setDescription(`
## UPGRADED
-# ${u.name}

**Storage** has been upgraded from **Storage ${await toRoman(u.upgrades.storage.lvl)}** to **Storage ${await toRoman(u.upgrades.storage.lvl + howmuch)}**
				`)

			const failureforstorage = new EmbedBuilder()
				.setDescription(`
## FAILURE
-# ${u.name}

Failure to upgrade **Storage**, missing **$${await format(totalSpent(u.upgrades.storage.cost, 1.02, howmuch) - u.cash, 2, u.settings.numprefix)}**
				`)

			const successforxp = new EmbedBuilder()
				.setDescription(`
## UPGRADED
-# ${u.name}

**XP** has been upgraded from **XP ${await toRoman(u.upgrades.xp.lvl)}** to **XP ${await toRoman(u.upgrades.xp.lvl + howmuch)}**
				`)

			const failureforxp = new EmbedBuilder()
				.setDescription(`
## FAILURE
-# ${u.name}

Failure to upgrade **XP**, missing **$${await format(totalSpent(u.upgrades.xp.cost, 1.02, howmuch) - u.cash, 2, u.settings.numprefix)}**
				`)
			
			switch (what) {
				case 'buy':
					switch (upgrade) {
						case 'fishing':
							if (u.cash >= totalSpent(u.upgrades.fishing.cost, 1.02, howmuch)) {
								u.cash -= totalSpent(u.upgrades.fishing.cost, 1.02, howmuch)
								u.upgrades.fishing.cost = Math.floor(baseStorageCost * Math.pow(1.02, u.upgrades.fishing.lvl));
								u.upgrades.fishing.lvl += howmuch
								await u.save()
								message.reply({ embeds: [successforfishing] })
								break
							} else {
								message.reply({ embeds: [failureforfishing] })
								break
							}
						case 'cash':
							if (u.cash >= totalSpent(u.upgrades.cash.cost, 1.02, howmuch)) {
								u.cash -= totalSpent(u.upgrades.cash.cost, 1.02, howmuch)
								u.upgrades.cash.cost = Math.floor(baseStorageCost * Math.pow(1.02, u.upgrades.cash.lvl));
								u.upgrades.cash.lvl += howmuch
								await u.save()
								message.reply({ embeds: [successforcash] })
								break
							} else {
								message.reply({ embeds: [failureforcash] })
								break
							}
						case 'storage':
							if (u.cash >= totalSpent(u.upgrades.storage.cost, 1.02, howmuch)) {
								u.cash -= totalSpent(u.upgrades.storage.cost, 1.02, howmuch)
								u.upgrades.storage.lvl += howmuch;
								u.upgrades.storage.max += (howmuch * 35);
								u.upgrades.storage.cost = Math.floor(baseStorageCost * Math.pow(1.02, u.upgrades.storage.lvl));
								await u.save()
								message.reply({ embeds: [successforstorage] })
								break
							} else {
								message.reply({ embeds: [failureforstorage] })
								break
							}
						case 'xp':
							if (u.cash >= totalSpent(u.upgrades.xp.cost, 1.02, howmuch)) {
								u.cash -= totalSpent(u.upgrades.xp.cost, 1.02, howmuch)
								u.upgrades.xp.cost = Math.floor(baseXPCost * Math.pow(1.02, u.upgrades.xp.lvl));
								u.upgrades.xp.lvl += howmuch
								await u.save()
								message.reply({ embeds: [successforxp] })
								break
							} else {
								message.reply({ embeds: [failureforxp] })
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
						case 'storage':
							const storagearr: string[] = []
							const min2 = Math.floor(u.upgrades.storage.lvl / 10) * 10
							const max2 = min2 + 10
							for (let i = min2; i < max2; i++) {
								if (u.upgrades.storage.lvl === i) {
									storagearr.push(`> **(${i}) Tier ${await toRoman(i)} - +${(i * 35) - 35} storage**`)
								} else {
									storagearr.push(`> (${i}) Tier ${await toRoman(i)} - +${(i * 35) - 35} storage`)
								}
							}

							const upgrade2 = new EmbedBuilder()
								.setDescription(`
## UPGRADES
-# ${u.name}

Cash required for next upgrade:
**$${await format(u.upgrades.storage.cost)}** or **$${u.upgrades.storage.cost.toLocaleString('en-US')}**

***Storage*** (T${u.upgrades.storage.lvl})
${storagearr.join('\n')}
								`)
							message.reply({ embeds: [upgrade2] })
							break
						case 'xp':
							const xparr: string[] = []
							const min3 = Math.floor(u.upgrades.xp.lvl / 10) * 10
							const max3 = min3 + 10
							for (let i = min3; i < max3; i++) {
								if (u.upgrades.xp.lvl === i) {
									xparr.push(`> **(${i}) Tier ${await toRoman(i)} - +${((i * 0.7) - 0.7).toFixed(1)}% more XP**`)
								} else {
									xparr.push(`> (${i}) Tier ${await toRoman(i)} - +${((i * 0.7) - 0.7).toFixed(1)}% more XP`)
								}
							}

							const upgrade3 = new EmbedBuilder()
								.setDescription(`
## UPGRADES
-# ${u.name}

Cash required for next upgrade:
**$${await format(u.upgrades.xp.cost)}** or **$${u.upgrades.xp.cost.toLocaleString('en-US')}**

***XP*** (T${u.upgrades.xp.lvl})
${xparr.join('\n')}
								`)
							message.reply({ embeds: [upgrade3] })
							break
					}
				default:
					const upgrades = new EmbedBuilder()
        				.setDescription(`
## UPGRADES
-# ${u.name}

Fishing ${await toRoman(u.upgrades.fishing.lvl)} - $${await format(u.upgrades.fishing.cost, 2, u.settings.numprefix)}
Cash ${await toRoman(u.upgrades.cash.lvl)} - $${await format(u.upgrades.cash.cost, 2, u.settings.numprefix)}
Storage ${await toRoman(u.upgrades.storage.lvl)} - $${await format(u.upgrades.storage.cost, 2, u.settings.numprefix)}
XP ${await toRoman(u.upgrades.xp.lvl)} - $${await format(u.upgrades.xp.cost, 2, u.settings.numprefix)}
                        `)
    				message.reply({ embeds: [upgrades] })
					break
			}
			upgradescd.add(message.author.id)
			setTimeout(() => {
				upgradescd.delete(message.author.id)
			}, 15000)
		}
	} catch (error) {
        throw new Error(`\u001b[36m[src/cmds/pcmds/upgrades.ts]\u001b[36m \u001b[31m[ERROR]\u001b[31m ${error}`)
	}
}
