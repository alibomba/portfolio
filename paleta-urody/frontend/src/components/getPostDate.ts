const getPostDate = (date: Date): string => {
    const day = date.getDate();
    let month;
    switch (date.getMonth() + 1) {
        case 1:
            month = 'stycznia';
            break;
        case 2:
            month = 'lutego';
            break;
        case 3:
            month = 'marca';
            break;
        case 4:
            month = 'kwietnia';
            break;
        case 5:
            month = 'maja';
            break;
        case 6:
            month = 'czerwca';
            break;
        case 7:
            month = 'lipca';
            break;
        case 8:
            month = 'sierpnia';
            break;
        case 9:
            month = 'września';
            break;
        case 10:
            month = 'października';
            break;
        case 11:
            month = 'listopada';
            break;
        case 12:
            month = 'grudnia';
    }
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
}

export default getPostDate;