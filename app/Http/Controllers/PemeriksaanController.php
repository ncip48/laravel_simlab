<?php

namespace App\Http\Controllers;

use App\Models\Examination;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PemeriksaanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $items = Examination::with('patient')->get();
        $items = $items->map(function ($item) {
            $item->patient_name = $item->patient()->first()->name;
            return $item;
        });
        return Inertia::render('pemeriksaan/index', [
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
            'blood_bag' => 'required',
            'blood_type' => 'required',
            'rhesus' => 'required',
        ], [
            'blood_bag.required' => 'No kantong tidak boleh kosong',
            'blood_type.required' => 'Golongan darah harus dipilih',
            'rhesus.required' => 'Rhesus harus dipilih',
        ]);

        Examination::create($request->all());
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
