<?php

namespace App\Http\Controllers;

use App\Models\District;
use App\Models\Examination;
use App\Models\Patient;
use App\Models\Province;
use App\Models\Regency;
use App\Models\Village;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class PasienController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $items = Patient::all();
        $items = $items->map(function ($item) {
            $item->jk_string = $item->jk_string();
            $province = $item->province->name ?? '';
            $regency = $item->regency->name ?? '';
            $district = $item->district->name ?? '';
            $village = $item->village->name ?? '';
            $item->address_full = "$item->address, $village, $district, $regency, Provinsi $province, $item->post_code";
            if ($item->birth_date) {
                $birthDate = Carbon::parse($item->birth_date);
                $now = Carbon::now();

                $years = floor($birthDate->diffInYears($now)); // Get complete years
                $months = floor($birthDate->copy()->addYears($years)->diffInMonths($now)); // Get remaining months

                // Format age as "X year(s) Y month(s)"
                if ($years > 0) {
                    $item->age = "{$years} tahun" . ($months > 0 ? " {$months} bulan" : "");
                } else {
                    $item->age = "{$months} bulan";
                }
            } else {
                $item->age = null; // No age if birth_date is missing
            }
            return $item;
        });
        return Inertia::render('pasien/index', [
            'items' => $items,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'identity_number' => 'required',
            'address' => 'required',
            'gender' => 'required',
            'post_code' => 'required',
            'birth_date' => 'required',
        ], [
            'name.required' => 'Nama tidak boleh kosong',
            'identity_number.required' => 'NIK tidak boleh kosong',
            'address.required' => 'Alamat tidak boleh kosong',
            'gender.required' => 'Jenis kelamin harus dipilih',
            'post_code.required' => 'Kode pos tidak boleh kosong',
            'birth_date.required' => 'Tanggal lahir tidak boleh kosong',
        ]);

        Patient::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required',
            'identity_number' => 'required',
            'address' => 'required',
            'gender' => 'required',
            'post_code' => 'required',
            'birth_date' => 'required',
        ], [
            'name.required' => 'Nama tidak boleh kosong',
            'identity_number.required' => 'NIK tidak boleh kosong',
            'address.required' => 'Alamat tidak boleh kosong',
            'gender.required' => 'Jenis kelamin harus dipilih',
            'post_code.required' => 'Kode pos tidak boleh kosong',
            'birth_date.required' => 'Tanggal lahir tidak boleh kosong',
        ]);

        Patient::where('id', $id)->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Patient::where('id', $id)->delete();
    }

    public function pemeriksaan(string $id)
    {
        $patient = Patient::find($id);
        $patient->jk_string = $patient->jk_string();
        $province = $patient->province->name ?? '';
        $regency = $patient->regency->name ?? '';
        $district = $patient->district->name ?? '';
        $village = $patient->village->name ?? '';
        $patient->address_full = "$patient->address, $village, $district, $regency, Provinsi $province, $patient->post_code";
        if ($patient->birth_date) {
            $birthDate = Carbon::parse($patient->birth_date);
            $now = Carbon::now();

            $years = floor($birthDate->diffInYears($now)); // Get complete years
            $months = floor($birthDate->copy()->addYears($years)->diffInMonths($now)); // Get remaining months

            // Format age as "X year(s) Y month(s)"
            if ($years > 0) {
                $patient->age = "{$years} tahun" . ($months > 0 ? " {$months} bulan" : "");
            } else {
                $patient->age = "{$months} bulan";
            }
        } else {
            $patient->age = null; // No age if birth_date is missing
        }

        $items = Examination::with('patient')->where('patient_id', $id)->get();
        return Inertia::render('pemeriksaan/detail', [
            'items' => $items,
            'patient' => $patient,
        ]);
    }
}
