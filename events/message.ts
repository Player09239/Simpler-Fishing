import bot from './../data/bot.ts'
import user from './../data/user.ts'

export default async function msg(message: any): Promise<void> {
    let b: any = await bot.findOne({ botId: '1389387486035443714' });
    let u: any = await user.findOne({ userId: message.author.id });

    if (!b) {
        console.error('SYSTEM > Bot data not found in database.')
        b = new bot({
            botId: '1389387486035443714',
            prefix: 'f!',
            stats: {
                msgs: 0,
                cmds: 0
            }
        })
        await b.save();
    }

    if (!u) {
        console.error('SYSTEM > User data not found in database.')
        u = new user({
            userId: message.author.id,
            name: message.author.username,
            cash: '0',
            inventory: ["Starting Fishing Rod"],
            equipped: 'Starting Fishing Rod',
            catched: 0
        })
        await u.save();
    }
}