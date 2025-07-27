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
    } else if (rod === 'Grand Fishing Rod') {
        const table = [
            { item: 'Seaweed', weight: 5 },
            { item: 'Salmon', weight: 20 },
            { item: 'Cod', weight: 30 },
            { item: 'Clownfish', weight: 25 },
            { item: 'Pufferfish', weight: 15 },
            { item: 'Tuna', weight: 5 }
        ];
        const total = table.reduce((a, b) => a + b.weight, 0);
        let r = Math.random() * total;
        for (const entry of table) {
            if ((r -= entry.weight) < 0) return entry.item;
        }
    } else if (rod === 'Master Fishing Rod') {
        const table = [
            { item: 'Seaweed', weight: 5 },
            { item: 'Salmon', weight: 15 },
            { item: 'Cod', weight: 25 },
            { item: 'Clownfish', weight: 20 },
            { item: 'Pufferfish', weight: 15 },
            { item: 'Tuna', weight: 10 },
            { item: 'Swordfish', weight: 5 }
        ];
        const total = table.reduce((a, b) => a + b.weight, 0);
        let r = Math.random() * total;
        for (const entry of table) {
            if ((r -= entry.weight) < 0) return entry.item;
        }
    } else if (rod === 'Grandmaster\'s Fishing Rod') {
        const table = [
            { item: 'Seaweed', weight: 5 },
            { item: 'Salmon', weight: 10 },
            { item: 'Cod', weight: 20 },
            { item: 'Clownfish', weight: 15 },
            { item: 'Pufferfish', weight: 10 },
            { item: 'Tuna', weight: 10 },
            { item: 'Swordfish', weight: 10 },
            { item: 'Shark', weight: 5 }
        ];
        const total = table.reduce((a, b) => a + b.weight, 0);
        let r = Math.random() * total;
        for (const entry of table) {
            if ((r -= entry.weight) < 0) return entry.item;
        }
    } else if (rod === 'Inhumane Fishing Rod') {
        const table = [
            { item: 'Clownfish', weight: 15 },
            { item: 'Pufferfish', weight: 12 },
            { item: 'Tuna', weight: 15 },
            { item: 'Swordfish', weight: 34 },
            { item: 'Shark', weight: 10 },
            { item: 'Lobster', weight: 5 },
            { item: 'Crab', weight: 5 },
            { item: 'Octopus', weight: 5 },
            { item: 'Squid', weight: 5 },
            { item: 'Whale', weight: 2 },
            { item: 'Lauwiliwilinukunukuʻoiʻoi', weight: 1 },
            { item: 'Humuhumunukunukuāpuʻa', weight: 1 }
        ];
        const total = table.reduce((a, b) => a + b.weight, 0);
        let r = Math.random() * total;
        for (const entry of table) {
            if ((r -= entry.weight) < 0) return entry.item;
        }
    }
    return 'Unknown Fishing Rod'
    throw new Error(`\u001b[36m[src/util/loottable.ts]\u001b[36m \u001b[31m[ERROR]\u001b[31m Invaild fishing rod given, returned \'Unknown Fishing Rod\'.`)
}