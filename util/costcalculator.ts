const prices: Record<string, number> = {
    Seaweed: 0.75,
    Salmon: 2.00,
    Cod: 3.50,
    Clownfish: 5.25,
    Pufferfish: 10.50,
    Tuna: 15.25,
    Swordfish: 20.00,
    Shark: 50.00,
    Lobster: 75.00,
    Crab: 100.00,
    Octopus: 150.00,
    Squid: 200.00,
    Whale: 500.00,
    Lauwiliwilinukunukuʻoiʻoi: 1000.00,
    Humuhumunukunukuāpuʻa: 1500.00
};

export default function calculateCost(item: string, amount: number): number {
    return (prices[item] ?? 0) * amount;
}