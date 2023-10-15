function getPercentage(value: number, total: number): number {
    if (total === 0) {
        // Avoid division by zero
        return 0;
    }

    // Calculate the percentage
    const percentage = (value / total) * 100;

    return percentage;
}

export default getPercentage;