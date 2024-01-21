import { Message } from "../models";


async function messageSeeder() {
    await Message.insertMany([
        {
            company: '6597d2f7a0eeb1a05d7233b0',
            user: '65a6d145d2f2047fd74be82c',
            sender: 'Company',
            content: 'Dzien dobry, rozpatrzylismy Pana oferte i zdecydowalismy sie Pana zatrudnic w naszej firmie. Prosimy o odpowiedz.',
            sentAt: '2023-12-27'
        },
        {
            company: '6597d2f7a0eeb1a05d7233b0',
            user: '65a6d145d2f2047fd74be82c',
            sender: 'User',
            content: 'Dzien dobry, bardzo dziekuje za rozpatrzenie oferty, jestem podekscytowany.',
            sentAt: '2023-12-28'
        },
        {
            company: '6597d2f7a0eeb1a05d7233b0',
            user: '65a6d145d2f2047fd74be82c',
            sender: 'Company',
            content: 'Super! Prosimy jeszcze o Pana szczegolowe dane.',
            sentAt: '2023-12-29'
        },
        {
            company: '6597d2f7a0eeb1a05d7233b0',
            user: '65a6d145d2f2047fd74be82c',
            sender: 'User',
            content: 'Robi sie, zaraz przesylam',
            sentAt: '2023-12-30'
        },
        {
            company: '6597d2f7a0eeb1a05d7233b0',
            user: '65a6d145d2f2047fd74be82c',
            sender: 'User',
            content: 'Testowa wiadomosc',
            sentAt: '2023-12-31'
        },
        {
            company: '6597d2f7a0eeb1a05d7233b0',
            user: '65a6d145d2f2047fd74be82c',
            sender: 'Company',
            content: 'Testowa wiadomosc asdasdasd',
            sentAt: '2024-01-01'
        },
        {
            company: '6597d2f7a0eeb1a05d7233b0',
            user: '65a6d145d2f2047fd74be82c',
            sender: 'Company',
            content: 'Tak',
            sentAt: '2024-01-02'
        },
        {
            company: '61f8dce5e7a83129bcdb3f1b',
            user: '65a6d145d2f2047fd74be82c',
            sender: 'Company',
            content: 'Dzien dobry, chcielibysmy dac Panu prace. Prosimy o odpowiedz',
            sentAt: '2024-01-01'
        },
        {
            company: '61f8dce5e7a83129bcdb3f1b',
            user: '65a6d145d2f2047fd74be82c',
            sender: 'User',
            content: 'Dzien dobry, dostalem juz oferte i ja przyjalem',
            sentAt: '2024-01-02'
        },
        {
            company: '61f8dce5e7a83129bcdb3f1b',
            user: '65a6d145d2f2047fd74be82c',
            sender: 'User',
            content: 'Niestety nie bede w stanie dla Panstwa pracowac',
            sentAt: '2024-01-03'
        },
        {
            company: '61f8dce5e7a83129bcdb3f1b',
            user: '65a6d145d2f2047fd74be82c',
            sender: 'Company',
            content: 'Jasne nie ma problemu',
            sentAt: '2024-01-04'
        }
    ]);
}

export default messageSeeder;