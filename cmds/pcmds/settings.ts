import { EmbedBuilder } from 'discord.js'
import bot from './../../data/bot.ts'
import { msgup, cmdup, format } from './../../util/func.ts'
import user from './../../data/user.ts'

const settingscd = new Set();

export default async function settings(message: any): Promise<void> {
    try {
        let b: any = await bot.findOne({ botId: '1389387486035443714' })
        if (message.content.startsWith(`${b.prefix}settings`)) {
            let u: any = await user.findOne({ userId: message.author.id })
            if (settingscd.has(message.author.id)) {
                return message.react('⏳')
            }
            msgup()
            cmdup()

            const args = message.content.split(' ').filter(Boolean)
            const setting = args[1]

            switch (setting) {
                case 'numprefix':
                    u.settings.numprefix = !u.settings.numprefix;
                    await u.save();
                    const numPrefix = new EmbedBuilder()
                        .setDescription(`
## SETTINGS UPDATED
-# ${u.name}

**Number Prefix** is now set to **${u.settings.numprefix}**
                        `);
                    message.reply({ embeds: [numPrefix] });
                    break;
                default: 
                    const settings = new EmbedBuilder()
                        .setDescription(`
## SETTINGS
-# ${u.name}

**>** **Number Prefix**: ${u.settings.numprefix}
-# \`${b.prefix}settings numprefix\`
                        `);
                    message.reply({ embeds: [settings] });
                    break;
            } 
            settingscd.add(message.author.id)
            setTimeout(() => {
                settingscd.delete(message.author.id)
            }, 15000)
        }
    } catch (error) {
        throw new Error(`\u001b[36m[src/cmds/pcmds/settings.ts]\u001b[36m \u001b[31m[ERROR]\u001b[31m ${error}`)
    }
}