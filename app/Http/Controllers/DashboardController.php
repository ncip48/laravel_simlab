<?php

namespace App\Http\Controllers;

use App\Models\Examination;
use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(){
        return Inertia::render('dashboard', [
            'jumlahPasien' => Patient::count(),
            'jumlahKantong' => Examination::count(),
        ]);
    }
}
