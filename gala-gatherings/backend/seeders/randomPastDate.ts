const {sub, format} = require('date-fns');

function randomPastDate(maxDaysAgo: number): string {
    const currentDate = new Date();
    const randomDaysAgo = Math.floor(Math.random() * maxDaysAgo);
    const pastDate = sub(currentDate, { days: randomDaysAgo });
    return format(pastDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
}

export default randomPastDate;