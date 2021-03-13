<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class LocationCategoryController extends Controller
{
    /**
     *return the json result of the API for location categories.
     *
     * @return json
     */
    public function index()
    {
        $params = [
            'client_id' => env("FQ_CLIENT_ID"),
            'client_secret' => env("FQ_CLIENT_SECRET"),
            'v' => env("V"),
        ];

        return Http::get(env("FQ_CATEGORY_URL"), $params)->throw()->json();
    }
}
