<?php

namespace App\Http\Controllers;

use App\Models\Imltd;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ImltdController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $items = Imltd::all();
        $items = $items->map(function ($item) {
            $item->hiv_string = $item->hiv ? "Positif ($item->nilai_hiv)" : "Negatif ($item->nilai_hiv)";
            $item->hbsag_string = $item->hbsag ? "Positif ($item->nilai_hbsag)" : "Negatif ($item->nilai_hbsag)";
            $item->hcv_string = $item->hcv ? "Positif ($item->nilai_hcv)" : "Negatif ($item->nilai_hcv)";
            $item->tp_string = $item->tp ? "Positif ($item->nilai_tp)" : "Negatif ($item->nilai_tp)";
            $item->pemeriksa = User::where('id', $item->created_by)->first()->name;
            return $item;
        });
        return Inertia::render('screening/imltd/index', [
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

    private function range_hiv($value)
    {
        $min = 20;
        $max = 80;

        if ($value >= $min && $value <= $max) {
            return "NEGATIVE";
        } elseif ($value > $max) {
            return "POSITIF";
        } else {
            return "POSITIF";
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'blood_bag' => 'required',
            'hiv' => 'required',
            'nilai_hiv' => 'required',
            'hbsag' => 'required',
            'nilai_hbsag' => 'required',
            'hcv' => 'required',
            'nilai_hcv' => 'required',
            'tp' => 'required',
            'nilai_tp' => 'required',
        ]);

        $request['created_by'] = Auth::user()->id;
        Imltd::create($request->all());
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
            'hiv' => 'required',
            'nilai_hiv' => 'required',
            'hbsag' => 'required',
            'nilai_hbsag' => 'required',
            'hcv' => 'required',
            'nilai_hcv' => 'required',
            'tp' => 'required',
            'nilai_tp' => 'required',
        ]);

        Imltd::where('id', $id)->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Imltd::where('id', $id)->delete();
    }
}
