<?php

namespace App\Http\Controllers;

use App\Models\Patient;
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
        return Inertia::render('pasien/index', [
            'items' => Patient::all(),
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
}
