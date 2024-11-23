<?php

namespace App\Http\Controllers;

use App\Models\Antibody;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AntibodyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $items = Antibody::all();
        $items = $items->map(function ($item) {
            $item->p1_string = $item->p1 ? "Positif" : "Negatif";
            $item->p2_string = $item->p2 ? "Positif" : "Negatif";
            $item->p3_string = $item->p3 ? "Positif" : "Negatif";
            $item->p4_string = $item->p4 ? "Positif" : "Negatif";
            $item->result = $item->result();
            $item->pemeriksa = User::where('id', $item->created_by)->first()->name;
            return $item;
        });
        return Inertia::render('screening/antibody/index', [
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
            'p1' => 'required',
            'p2' => 'required',
            'p3' => 'required',
            'p4' => 'required',
        ]);

        $request['created_by'] = Auth::user()->id;
        Antibody::create($request->all());
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
            'blood_bag' => 'required',
            'p1' => 'required',
            'p2' => 'required',
            'p3' => 'required',
            'p4' => 'required',
        ]);

        Antibody::where('id', $id)->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Antibody::where('id', $id)->delete();
    }
}
