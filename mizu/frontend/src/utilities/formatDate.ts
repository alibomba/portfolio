import moment from 'moment-timezone';

function formatDate(dateString: string): string {
    const date = moment.tz(dateString, 'Europe/Warsaw');
    const now = moment().startOf('day');
    if (date.isSame(now, 'day')) {
        return date.format('HH:mm');
    }
    else {
        let month;
        switch (date.month()) {
            case 0:
                month = 'stycznia';
                break;
            case 1:
                month = 'lutego';
                break;
            case 2:
                month = 'marca';
                break;
            case 3:
                month = 'kwietnia';
                break;
            case 4:
                month = 'maja';
                break;
            case 5:
                month = 'czerwca';
                break;
            case 6:
                month = 'lipca';
                break;
            case 7:
                month = 'sierpnia';
                break;
            case 8:
                month = 'września';
                break;
            case 9:
                month = 'października';
                break;
            case 10:
                month = 'listopada';
                break;
            case 11:
                month = 'grudnia';
                break;
        }

        return `${date.date()} ${month} ${date.year()}`;
    }
}

export default formatDate;