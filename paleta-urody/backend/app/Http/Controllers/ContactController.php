<?php

namespace App\Http\Controllers;

use Mail;
use App\Models\Email;
use App\Models\Contact;
use App\Mail\ContactEmail;
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

        try {
            $email = Email::find(1);

            $data = [
                'from' => $request['email'],
                'subject' => $request['topic'],
                'phone_number' => $request['phone_number'],
                'content' => $request['message']
            ];
            Mail::to($email->email)->send(new ContactEmail($data));
        } catch(Exception $e) {
            return response([
                'error' => 'Coś poszło nie tak'
            ], 500);
        }


        return Contact::create($request->all());
    }

    public function changeEmail(Request $request)
    {
        $messages = [
            'required' => 'Email jest wymagany',
            'email' => 'Podaj poprawny adres e-mail',
            'max' => 'Email może mieć maksymalnie :max znaków'
        ];

        $request->validate([
            'email' => 'required|email|max:25'
        ], $messages);

        try {
            $email = Email::find(1);
            $email->update([
                'email' => $request['email']
            ]);
        } catch(Exception $e) {
            return response([
                'error' => 'Coś poszło nie tak'
            ], 500);
        }

        return response([
            'message' => 'Pomyślnie zmieniono adres e-mail'
        ], 200);
    }

    public function getEmail()
    {
        return Email::find(1);
    }
}
