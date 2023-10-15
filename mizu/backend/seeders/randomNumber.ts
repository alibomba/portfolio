function randomNumber(min: number, max: number): number {
    if (min > max) {
        throw new Error("Min value should be less than or equal to max value");
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default randomNumber;