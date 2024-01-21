import { Application } from "../models";


async function applicationSeeder() {
    await Application.insertMany([
        {
            name: 'Jakis',
            surname: 'Random',
            email: 'random@gmail.com',
            phoneNumber: '123 123 123',
            CV: '123123123',
            offer: '65a318dfb517b9b39c23d01c',
            status: 'Oczekujące',
            sentAt: '2024-01-13T15:56:53.107+00:00'
        },
        {
            name: 'Inny',
            surname: 'Random',
            email: 'inny@gmail.com',
            phoneNumber: '123 123 123',
            CV: '123123123',
            offer: '65a318dfb517b9b39c23d01c',
            status: 'Oczekujące',
            sentAt: '2024-01-13T15:56:53.107+00:00'
        },
        {
            name: 'Adam',
            surname: 'Kowalski',
            email: 'adam@gmail.com',
            phoneNumber: '123 123 123',
            CV: '123123123',
            offer: '65a318dfb517b9b39c23d01c',
            user: '65a6d145d2f2047fd74be785',
            status: 'Oczekujące',
            sentAt: '2024-01-13T15:56:53.107+00:00'
        },
        {
            name: 'Piotr',
            surname: 'Adamczyk',
            email: 'piotr@gmail.com',
            phoneNumber: '123 123 123',
            CV: '123123123',
            offer: '65a318dfb517b9b39c23d01c',
            user: '65a6d145d2f2047fd74be786',
            status: 'Oczekujące',
            sentAt: '2024-01-13T15:56:53.107+00:00'
        },
        {
            name: 'Dawid',
            surname: 'Nowak',
            email: 'dawid@gmail.com',
            phoneNumber: '123 123 123',
            CV: '123123123',
            offer: '65a318dfb517b9b39c23d01c',
            user: '65a6d145d2f2047fd74be787',
            status: 'Oczekujące',
            sentAt: '2023-01-13T15:56:53.107+00:00'
        },
        {
            name: 'Wojtek',
            surname: 'Bronka',
            email: 'wojci.bro@gmail.com',
            phoneNumber: '123 123 123',
            CV: '123123123',
            offer: '65a318dfb517b9b39c23d01c',
            user: '65a6d145d2f2047fd74be82c',
            status: 'Oczekujące',
            sentAt: '2023-01-13T15:56:53.107+00:00'
        },
    ]);
}

export default applicationSeeder;