const {format, add} = require('date-fns')

function randomFutureDate(maxDaysInFuture: number): string {
    const currentDate = new Date();
    const randomDaysInFuture = Math.floor(Math.random() * maxDaysInFuture);
    const futureDate = add(currentDate, { days: randomDaysInFuture });
    return format(futureDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
}

export default randomFutureDate;