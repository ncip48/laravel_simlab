<?php

namespace App\Http\Controllers;

use App\Models\Province;
use Illuminate\Http\Request;

class RegionController extends Controller
{
    public function all_provinces()
    {
        $provinces = Province::all();

        return $provinces;
    }
}
