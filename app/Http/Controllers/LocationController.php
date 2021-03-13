<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class LocationController extends Controller
{
    var $limit = 5;
    /**
     * Retrieve the location information based on sent params.
     *
     * @param  string locationId
     * @return json
     */
    public function index(Request $request)
    {
        $req = $request->input();
        if (empty($req)) {
            return "{}"; // return empty json if no params received
        }
        // retrieve the location info based
        $params = [
            'client_id' => env("FQ_CLIENT_ID"),
            'client_secret' => env("FQ_CLIENT_SECRET"),
            'v' => env("V"),
            'limit' => $this->limit,
            'near' => $req["location"]
        ];

        if (!empty($req["activeCategory"])) {
            $params["categoryId"] = implode(',', $req["activeCategory"]);
        }
        return Http::get(env("FQ_VENUE_URL"), $params)->throw()->json();
    }
}
