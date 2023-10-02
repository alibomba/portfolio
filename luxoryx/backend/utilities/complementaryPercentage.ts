function complementaryPercentage(number: number, percentage: number): number {
    const complementaryPercent = 100 - percentage;
    const result = (complementaryPercent / 100) * number;
    return result;
}

export default complementaryPercentage;