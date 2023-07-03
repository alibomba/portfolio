<?php

namespace App\Http\Controllers;

use Mail;
use DateTime;
use App\Models\Appointment;
use Illuminate\Http\Request;
use App\Mail\AppointmentNotification;

class AppointmentController extends Controller
{
    public function index()
    {
        return Appointment::orderBy('date', 'asc')->paginate(10);
    }

    public function getBusyHours($date)
    {
        $appointmentsThatDay = Appointment::whereDate('date', $date)->get();

        $busyHours = [];
        if(count($appointmentsThatDay)>0) {
            foreach($appointmentsThatDay as $appointment) {
                $dateObject = new DateTime($appointment->date);
                $busyHours[] = $dateObject->format('H:00');
            }
        }

        return $busyHours;
    }

    public function store(Request $request)
    {


        if(!isset($request['date'])) {
            return response([
                'message' => 'Nie wybrano daty!'
            ], 422);
        }
        $passedDate = new DateTime($request['date']);
        $passedDate->setTime(0, 0, 0);
        $now = new DateTime();
        $now->setTime(0, 0, 0);

        if($passedDate < $now) {
            return response([
                'message' => 'Wybrano datę z przeszłości!'
            ], 422);
        }

        if(!isset($request['hour']) || $request['hour'] === '' || !is_numeric($request['hour']) || intval($request['hour']) < 7 || intval($request['hour']) > 18) {
            return response([
                'message' => 'Nie wybrano godziny lub jest ona niepoprawna!'
            ], 422);
        }

        if(!isset($request['phoneNumber']) || $request['phoneNumber']==='' || !preg_match("/^[+0-9][-0-9 ()]*[0-9]$/", $request['phoneNumber'])) {
            return response([
                'message' => 'Nie podano numeru telefonu lub jest on niepoprawny!'
            ], 422);
        }

        if(!isset($request['email']) || $request['email']==='' || !preg_match("/^[^\s@]+@[^\s@]+\.[^\s@]+$/", $request['email'])) {
            return response([
                'message' => 'Nie podano adresu e-mail lub jest on niepoprawny!'
            ], 422);
        }

        $passedDate->setTime(intval($request['hour']), 0);

        if(Appointment::where('date', $passedDate)->exists()) {
            return response([
                'message' => 'Podana data jest już zajęta!'
            ], 422);
        }

        $data = [
            'phone_number' => $request['phoneNumber'],
            'email' => $request['email'],
            'date' => $passedDate
        ];

        try {
            Mail::to($request['email'])->send(new AppointmentNotification([
                'date' => $passedDate->format('d.m.Y H:i')
            ]));
        } catch(Exception $e) {
            return response([
                'error' => 'Coś poszło nie tak'
            ], 500);
        }


        return Appointment::create($data);
    }
}
