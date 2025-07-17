export default async function toRoman(num: number): Promise<string | void | number> {
    if (num === 1) return 'I'
    if (num === 2) return 'II'
    if (num === 3) return 'III'
    if (num === 4) return 'IV'
    if (num === 5) return 'V'
    if (num === 6) return 'VI'
    if (num === 7) return 'VII'
    if (num === 8) return 'VIII'
    if (num === 9) return 'IX'
    if (num === 10) return 'X'
    else return num
}