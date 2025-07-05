const prices: Record<string, number> = {
    Seaweed: 0.75,
    Salmon: 2.00,
    Cod: 3.50,
    Clownfish: 5.25,
    Pufferfish: 10.50
};

export default function calculateCost(item: string, amount: number): number {
    return (prices[item] ?? 0) * amount;
}