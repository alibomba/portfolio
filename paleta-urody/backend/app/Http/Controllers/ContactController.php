<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $messages = [
            'email.required' => 'Adres e-mail jest wymagany!',
            'phone_number.required' => 'Numer telefonu jest wymagany!',
            'topic.required' => 'Temat jest wymagany!',
            'message.required' => 'Treść wiadomości jest wymagana!',
            'email' => 'Podaj poprawny adres e-mail!',
            'phone_number.regex' => 'Podaj poprawny numer telefonu!',
            'phone_number.max' => 'Numer telefonu może mieć maksymalnie :max znaków!',
            'topic.max' => 'Temat może mieć maksymalnie :max znaków!',
            'message.max' => 'Wiadomość może mieć maksymalnie :max znaków!'
        ];

        $request->validate([
            'email' => 'required|email',
            'phone_number' => 'required|regex:/^\+?\d{1,3}[-\s]?\(?\d{1,3}\)?[-\s]?\d{1,4}[-\s]?\d{1,4}[-\s]?\d{1,9}$/|max:15',
            'topic' => 'required|string|max:30',
            'message' => 'required|string|max:1500'
        ], $messages);

        return Contact::create($request->all());
    }
}
