<?php

use App\Http\Controllers\AlatController;
use App\Http\Controllers\AntibodyController;
use App\Http\Controllers\HasilPemeriksaanController;
use App\Http\Controllers\ImltdController;
use App\Http\Controllers\PasienController;
use App\Http\Controllers\PemeriksaanController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth'])->name('dashboard');

Route::middleware(['auth'])->group(function () {
    //pasien
    Route::resource('/pasien', PasienController::class);
    //pemeriksaan
    Route::resource('/pemeriksaan', PemeriksaanController::class);
    //alat
    Route::resource('/alat', AlatController::class);
    Route::get('/alat/parameter/head/{alat}', [AlatController::class, 'getParameterHead'])->name('alat.parameter.head');
    Route::get('/alat/parameter/content/{alat}', [AlatController::class, 'getParameterContent'])->name('alat.parameter.content');
    Route::patch('/alat/parameter/{alat}', [AlatController::class, 'setParameter'])->name('alat.set.parameter');
    //screening
    Route::resource('/screening/imltd', ImltdController::class);
    Route::resource('/screening/antibody', AntibodyController::class);

    //hasil pemeriksaan
    Route::get('/hasil-pemeriksaan', [HasilPemeriksaanController::class, 'index'])->name('hasil-pemeriksaan.index');
    Route::post('/hasil-pemeriksaan', [HasilPemeriksaanController::class, 'search'])->name('hasil-pemeriksaan.search');

    //profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
