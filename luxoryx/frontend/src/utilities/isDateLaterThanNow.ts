function isDateLaterThanNow(date: string): boolean {
    const parsedDate = new Date(date);

    const now = new Date();

    return parsedDate > now;
}

export default isDateLaterThanNow;