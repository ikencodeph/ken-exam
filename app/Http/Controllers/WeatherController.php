<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WeatherController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $req = $request->input();
        if (empty($req)) {
            return "{}"; // return empty json
        }
        $params = [
            'appid' => env("OW_API_KEY"),
            'q' => $req['location'],
            'units' => 'metric'
        ];
        return Http::get(env("OW_PATH"), $params)->throw()->json();
    }
}
