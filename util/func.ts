import user from './../data/user.ts';
import bot from './../data/bot.ts'
import calculateCost from './costcalculator.ts'
import fontConverter from './fontconverter.ts'

export async function msgup(int: number = 1): Promise<void> {
    try {
        let b: any = await bot.findOne({ botId: '1389387486035443714' });
        b.stats.msgs += int
        await b.save()
    } catch (error) {
        throw new Error(`\u001b[36m[src/util/func.ts]\u001b[36m \u001b[31m[ERROR]\u001b[31m ${error}`)
    }
}

export async function cmdup(int: number = 1): Promise<void> {
    try {
        let b: any = await bot.findOne({ botId: '1389387486035443714' });
        b.stats.cmds += int
        await b.save()
    } catch (error) {
        throw new Error(`\u001b[36m[src/util/func.ts]\u001b[36m \u001b[31m[ERROR]\u001b[31m ${error}`)
    }
}

export async function format(given: number, to: number = 2, numprefix: boolean = true): Promise<any> {
    try {
        if (!numprefix) return given.toLocaleString('en-US', { maximumFractionDigits: to, minimumFractionDigits: to })

        if (given < 1e3) return given.toFixed(2)
        if (given >= 1e3 && given < 1e6) return (given / 1e3).toFixed(to) + 'k (thousands)'
        if (given >= 1e6 && given < 1e9) return (given / 1e6).toFixed(to) + 'm (millions)'
        if (given >= 1e9 && given < 1e12) return (given / 1e9).toFixed(to) + 'b (billions)'
        if (given >= 1e12 && given < 1e15) return (given / 1e12).toFixed(to) + 't (trillions)'
        if (given >= 1e15 && given < 1e18) return (given / 1e15).toFixed(to) + 'qa (quadrillions)'
        if (given >= 1e18 && given < 1e21) return (given / 1e18).toFixed(to) + 'qn (quintillions)'
        if (given >= 1e21 && given < 1e24) return (given / 1e21).toFixed(to) + 'sx (sextillions)'
        if (given >= 1e24 && given < 1e27) return (given / 1e24).toFixed(to) + 'sp (septillions)'
        if (given >= 1e27 && given < 1e30) return (given / 1e27).toFixed(to) + 'oc (octillions)'
        if (given >= 1e30 && given < 1e33) return (given / 1e30).toFixed(to) + 'no (nonillions)'
        if (given >= 1e33 && given < 1e36) return (given / 1e33).toFixed(to) + 'dc (decillions)'
        if (given >= 1e36 && given < 1e39) return (given / 1e36).toFixed(to) + 'udc (undecillions)'
        if (given >= 1e39 && given < 1e42) return (given / 1e39).toFixed(to) + 'ddc (duodecillions)'
        if (given >= 1e42 && given < 1e45) return (given / 1e42).toFixed(to) + 'tdc (tredecillions)'
        if (given >= 1e45 && given < 1e48) return (given / 1e45).toFixed(to) + 'qadc (quattuordecillions)'
        if (given >= 1e48 && given < 1e51) return (given / 1e48).toFixed(to) + 'qndc (quindecillions)'
        if (given >= 1e51 && given < 1e54) return (given / 1e51).toFixed(to) + 'sxdc (sexdecillions)'
        if (given >= 1e54 && given < 1e57) return (given / 1e54).toFixed(to) + 'spdc (septendecillions)'
        if (given >= 1e57 && given < 1e60) return (given / 1e57).toFixed(to) + 'ocdc (octodecillions)'
        if (given >= 1e60 && given < 1e63) return (given / 1e60).toFixed(to) + 'nodc (novemdecillions)'
        if (given >= 1e63 && given < 1e66) return (given / 1e63).toFixed(to) + 'vg (vigintillions)'
        if (given >= 1e66 && given < 1e69) return (given / 1e66).toFixed(to) + 'uvg (unvigintillions)'
        if (given >= 1e69 && given < 1e72) return (given / 1e69).toFixed(to) + 'dvg (duovigintillions)'
        if (given >= 1e72 && given < 1e75) return (given / 1e72).toFixed(to) + 'tvg (trevigintillions)'
        if (given >= 1e75 && given < 1e78) return (given / 1e75).toFixed(to) + 'qavg (quattuorvigintillions)'
        if (given >= 1e78 && given < 1e81) return (given / 1e78).toFixed(to) + 'qnvg (quinvigintillions)'
        if (given >= 1e81 && given < 1e84) return (given / 1e81).toFixed(to) + 'sxvg (sexvigintillions)'
        if (given >= 1e84 && given < 1e87) return (given / 1e84).toFixed(to) + 'spvg (septenvigintillions)'
        if (given >= 1e87 && given < 1e90) return (given / 1e87).toFixed(to) + 'ocvg (octovigintillions)'
        if (given >= 1e90 && given < 1e93) return (given / 1e90).toFixed(to) + 'novg (novemvigintillions)'
        if (given >= 1e93 && given < 1e96) return (given / 1e93).toFixed(to) + 'tg (trigintillions)'
        if (given >= 1e96 && given < 1e100) return (given / 1e100).toFixed(to) + 'g (googol)'
    } catch (error) {
        throw new Error(`\u001b[36m[src/util/func.ts]\u001b[36m \u001b[31m[ERROR]\u001b[31m ${error}`)
    }
}

export async function stack(given: Array<any>): Promise<string[]> {
    try {
        const counts: Record<string, number> = {};
        for (const item of given) counts[item] = (counts[item] || 0) + 1;

        return Object.entries(counts)
            .filter(([_, qty]) => qty > 0)
            .flatMap(([name, qty]) =>
                Array.from({ length: Math.ceil(qty / 16384) }, (_, i) =>
                    `**>** **x${Math.min(16384, qty - i * 16384)}** ${name}`
                )
            );
    } catch (error) {
        return []
        throw new Error(`\u001b[36m[src/util/func.ts]\u001b[36m \u001b[31m[ERROR]\u001b[31m ${error}`)
    }
}

export async function stackwithcost(given: Array<any>, numprefix: boolean): Promise<string[]> {
    try {
        const counts: Record<string, number> = {};
        for (const item of given) counts[item] = (counts[item] || 0) + 1;

        const result: string[] = [];
        for (const [name, qty] of Object.entries(counts).filter(([_, qty]) => qty > 0)) {
            for (let i = 0; i < Math.ceil(qty / 16384); i++) {
                const stackQty = Math.min(16384, qty - i * 16384);
                const cost = await format(calculateCost(name, stackQty), 2, numprefix);
                result.push(`**>** **x${stackQty}** ${name} **(**$${await fontConverter(cost)}**)**`);
            }
        }
        return result;
    } catch (error) {
        return []
        throw new Error(`\u001b[36m[src/util/func.ts]\u001b[36m \u001b[31m[ERROR]\u001b[31m ${error}`)
    }
}