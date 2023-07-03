<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Post;
use App\Models\User;
use App\Models\Email;
use App\Models\Appointment;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Post::factory(40)->create();

        Appointment::create([
            'phone_number' => '123123123',
            'email' => 'test@gmail.com',
            'date' => '2023-06-24 9:00:00'
        ]);

        Appointment::create([
            'phone_number' => '123123123',
            'email' => 'test@gmail.com',
            'date' => '2023-07-14 13:00:00'
        ]);

        Appointment::create([
            'phone_number' => '123123123',
            'email' => 'test@gmail.com',
            'date' => '2023-07-14 7:00:00'
        ]);

        Appointment::create([
            'phone_number' => '123123123',
            'email' => 'test@gmail.com',
            'date' => '2024-01-22 18:00:00'
        ]);

        Appointment::create([
            'phone_number' => '123123123',
            'email' => 'test@gmail.com',
            'date' => '2023-06-27 16:00:00'
        ]);

        Appointment::create([
            'phone_number' => '123123123',
            'email' => 'test@gmail.com',
            'date' => '2023-06-29 14:00:00'
        ]);

        Appointment::create([
            'phone_number' => '123123123',
            'email' => 'test@gmail.com',
            'date' => '2023-06-29 13:00:00'
        ]);

        Appointment::create([
            'phone_number' => '123123123',
            'email' => 'test@gmail.com',
            'date' => '2023-06-29 12:00:00'
        ]);

        Appointment::create([
            'phone_number' => '123123123',
            'email' => 'test@gmail.com',
            'date' => '2023-06-29 11:00:00'
        ]);

        Appointment::create([
            'phone_number' => '123123123',
            'email' => 'test@gmail.com',
            'date' => '2023-06-29 10:00:00'
        ]);

        Appointment::create([
            'phone_number' => '123123123',
            'email' => 'test@gmail.com',
            'date' => '2023-06-29 09:00:00'
        ]);

        Appointment::create([
            'phone_number' => '123123123',
            'email' => 'test@gmail.com',
            'date' => '2023-06-29 08:00:00'
        ]);

        Appointment::create([
            'phone_number' => '123123123',
            'email' => 'test@gmail.com',
            'date' => '2023-06-29 07:00:00'
        ]);

        User::create([
            'login' => 'administrator',
            'password' => '$2a$10$Vyf8oyHtVzY5XCW4wyf.vurl2p1CYzkD2h8XFrnQQw.zJsu4xWs4G'
        ]);

        Email::create([
            'email' => 'wojci.bro@gmail.com'
        ]);
    }
}
