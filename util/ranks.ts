export async function nextrank(current: any): Promise<any> {
    try {
        const ranks: string[] = [
            'F-', 'F', 'F+', 'E-', 'E', 'E+',
            'D-', 'D', 'D+', 'C-', 'C', 'C+',
            'B-', 'B', 'B+', 'A-', 'A', 'A+',
            'S-', 'S', 'S+', 'SS', 'SSS'
        ]

        for (let i = -1; i < 24; i++) {
            if (ranks[i] === current) {
                i++
                return ranks[i]
                break
            }
        }
    } catch (error) {
        throw new Error(`\u001b[36m[src/util/ranks.ts]\u001b[36m \u001b[31m[ERROR]\u001b[31m ${error}`)
    }
}

export async function rankreq(current: any): Promise<any> {
    try {
        const req: { [ key: string ]: number } = {
            'F-': 40, 'F': 45, 'F+': 50, 
            'E-': 56, 'E': 62, 'E+': 68,
            'D-': 75, 'D': 82, 'D+': 89,
            'C-': 98, 'C': 106, 'C+': 114,
            'B-': 123, 'B': 132, 'B+': 141,
            'A-': 151, 'A': 161, 'A+': 171,
            'S-': 182, 'S': 193, 'S+': 204,
            'SS': 216, 'SSS': 228
        }

        return req[current]
    } catch (error) {
        throw new Error(`\u001b[36m[src/util/ranks.ts]\u001b[36m \u001b[31m[ERROR]\u001b[31m ${error}`)
    }
}