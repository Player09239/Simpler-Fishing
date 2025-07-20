export default async function toRoman(num: number): Promise<string> {
  if (num <= 0 || num >= 4000000) return 'Out of range';

  const romanMap: { value: number; symbol: string }[] = [
    { value: 1000000, symbol: 'M' },
    { value: 900000,  symbol: 'CM' },
    { value: 500000,  symbol: 'D' },
    { value: 400000,  symbol: 'CD' },
    { value: 100000,  symbol: 'C' },
    { value: 90000,   symbol: 'XC' },
    { value: 50000,   symbol: 'L' },
    { value: 40000,   symbol: 'XL' },
    { value: 10000,   symbol: 'X' },
    { value: 9000,    symbol: 'IX' },
    { value: 5000,    symbol: 'V' },
    { value: 4000,    symbol: 'IV' },
    { value: 1000,    symbol: 'M' },
    { value: 900,     symbol: 'CM' },
    { value: 500,     symbol: 'D' },
    { value: 400,     symbol: 'CD' },
    { value: 100,     symbol: 'C' },
    { value: 90,      symbol: 'XC' },
    { value: 50,      symbol: 'L' },
    { value: 40,      symbol: 'XL' },
    { value: 10,      symbol: 'X' },
    { value: 9,       symbol: 'IX' },
    { value: 5,       symbol: 'V' },
    { value: 4,       symbol: 'IV' },
    { value: 1,       symbol: 'I' }
  ];

  const overline = (char: string): string => char + '\u0305';

  let result = '';
  for (const { value, symbol } of romanMap) {
    while (num >= value) {
      const useOverline = value >= 1000;
      const decorated = useOverline
        ? [...symbol].map(overline).join('')
        : symbol;
      result += decorated;
      num -= value;
    }
  }

  return result;
}