import user from './../data/user.ts'

export default async function checklvlup(id: string): Promise<void> {
    try {
        let u: any = await user.findOne({ userId: id })
        while (u.l.xpreq <= u.l.xp) {
            u.l.xp -= u.l.xpreq
            u.l.xpreq += Math.floor(u.l.xpreq * 0.06)
            u.l.lv += 1
            await u.save()
        }
    } catch (error) {
        throw new Error(`\u001b[36m[src/util/checklvlup.ts]\u001b[36m \u001b[31m[ERROR]\u001b[31m ${error}`)
    }
}