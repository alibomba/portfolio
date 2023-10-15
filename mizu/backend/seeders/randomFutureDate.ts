function randomFutureDate(): string {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Set the minimum date to tomorrow

    const randomDays = Math.floor(Math.random() * 365); // Generate a random number of days (up to a year)
    const randomDate = new Date(today);
    randomDate.setDate(today.getDate() + randomDays);

    // Format the date as "YYYY-MM-DDT00:00:00.000Z"
    const year = randomDate.getUTCFullYear();
    const month = String(randomDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(randomDate.getUTCDate()).padStart(2, '0');

    return `${year}-${month}-${day}T00:00:00.000Z`;
}


export default randomFutureDate;