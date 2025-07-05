export default function getReward(rod: string): string {
    if (rod === 'Starting Fishing Rod') {
        const table = [
        { item: 'Seaweed', weight: 35 },
        { item: 'Salmon', weight: 30 },
        { item: 'Cod', weight: 20 },
        { item: 'Clownfish', weight: 10 },
        { item: 'Pufferfish', weight: 5 }
        ];
        const total = table.reduce((a, b) => a + b.weight, 0);
        let r = Math.random() * total;
        for (const entry of table) {
            if ((r -= entry.weight) < 0) return entry.item;
        }
        return table[0].item;
    } else if (rod === 'Basic Fishing Rod') {
        const table = [
            { item: 'Seaweed', weight: 20 },
            { item: 'Salmon', weight: 37 },
            { item: 'Cod', weight: 22 },
            { item: 'Clownfish', weight: 14 },
            { item: 'Pufferfish', weight: 7 }
        ];
        const total = table.reduce((a, b) => a + b.weight, 0);
        let r = Math.random() * total;
        for (const entry of table) {
            if ((r -= entry.weight) < 0) return entry.item;
        }
        return table[0].item;
    } else if (rod === 'Slightly Better Fishing Rod') {
        const table = [
            { item: 'Seaweed', weight: 15 },
            { item: 'Salmon', weight: 30 },
            { item: 'Cod', weight: 25 },
            { item: 'Clownfish', weight: 20 },
            { item: 'Pufferfish', weight: 10 }
        ];
        const total = table.reduce((a, b) => a + b.weight, 0);
        let r = Math.random() * total;
        for (const entry of table) {
            if ((r -= entry.weight) < 0) return entry.item;
        }
        return table[0].item;
    } else if (rod === 'Advanced Fishing Rod') {
        const table = [
            { item: 'Seaweed', weight: 10 },
            { item: 'Salmon', weight: 25 },
            { item: 'Cod', weight: 30 },
            { item: 'Clownfish', weight: 20 },
            { item: 'Pufferfish', weight: 15 }
        ];
        const total = table.reduce((a, b) => a + b.weight, 0);
        let r = Math.random() * total;
        for (const entry of table) {
            if ((r -= entry.weight) < 0) return entry.item;
        }
        return table[0].item;
    }
    return 'Unknown Fishing Rod'
    throw new Error(`getReward > Invalid fishing rod type, given ${rod}`);
}