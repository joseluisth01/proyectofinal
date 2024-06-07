<?php

namespace App\Http\Controllers;
use App\Mail\TestMail;
use Mail;

use Illuminate\Http\Request;

class MailController extends Controller
{
    //
    public function getMail(){
        $data = ['name' => 'Ratatuille'];
        Mail::to('joseluistirado02@gmail.com')->send(new TestMail($data));
    }
}
