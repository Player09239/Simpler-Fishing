import bot from './../data/bot.ts'
import calculateCost from './costcalculator.ts'

export async function msgup(int: number = 1): Promise<void> {
    try {
        let b: any = await bot.findOne({ botId: '1389387486035443714' });
        b.stats.msgs += int
        await b.save()
    } catch (error) {
        throw new Error(`msgup > Failed to update MESSAGES SENT: ${error}`)
    }
}

export async function cmdup(int: number = 1): Promise<void> {
    try {
        let b: any = await bot.findOne({ botId: '1389387486035443714' });
        b.stats.cmds += int
        await b.save()
    } catch (error) {
        throw new Error(`cmdup > Failed to update COMMANDS USED: ${error}`)
    }
}

export async function format(given: number, to: number = 2): Promise<any> {
    try {
        if (given < 1e3) return given.toString()
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
    } catch (error) {
        throw new Error(`format > Failed to format number: ${error}`)
    }
}

export async function stack(given: Array<any>): Promise<string[]> {
    try {
        const counts: Record<string, number> = {};
        for (const item of given) counts[item] = (counts[item] || 0) + 1;

        return Object.entries(counts)
            .filter(([_, qty]) => qty > 0)
            .flatMap(([name, qty]) =>
                Array.from({ length: Math.ceil(qty / 4096) }, (_, i) =>
                    `**>** **x${Math.min(4096, qty - i * 4096)}** ${name}`
                )
            );
    } catch (error) {
        return []
        throw new Error(`stack > Failed to stack items: ${error}`)
    }
}

export async function stackwithcost(given: Array<any>): Promise<string[]> {
    try {
        const counts: Record<string, number> = {};
        for (const item of given) counts[item] = (counts[item] || 0) + 1;

        const result: string[] = [];
        for (const [name, qty] of Object.entries(counts).filter(([_, qty]) => qty > 0)) {
            for (let i = 0; i < Math.ceil(qty / 4096); i++) {
                const stackQty = Math.min(4096, qty - i * 4096);
                const cost = await format(calculateCost(name, stackQty));
                result.push(`**>** **x${stackQty}** ${name} **(**$${cost}**)**`);
            }
        }
        return result;
    } catch (error) {
        return []
        throw new Error(`stackwithcost > Failed to stack items with cost: ${error}`)
    }
}