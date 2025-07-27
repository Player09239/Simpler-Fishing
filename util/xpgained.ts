export default async function xpcalc(multi: number = 1): Promise<number | void> {
    return Math.floor(Math.random() * 6) * multi
}