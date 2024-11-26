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
            $item->hiv_string = $this->range_hiv($item->nilai_hiv);
            $item->hbsag_string = $this->range_hbsag($item->nilai_hbsag);
            $item->hcv_string = $this->range_hcv($item->nilai_hcv);
            $item->tp_string = $this->range_tp($item->nilai_tp);
            //range
            $item->hiv_range = "0.90-1.10 COI";
            $item->hbsag_range = "0.05-0.06 IU/mL";
            $item->hcv_range = "0.90-1.10 COI";
            $item->tp_range = "0.90-1.10 COI";
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

    private function range_hcv($value)
    {
        $min = 0.90;
        $max = 1.10;

        if ($value >= $min && $value <= $max) {
            return "NR";
        } elseif ($value > $max) {
            return "REACTIVE";
        } else {
            return "NR";
        }
    }

    private function range_hbsag($value)
    {
        $min = 0.05;
        $max = 0.06;

        if ($value >= $min && $value <= $max) {
            return "NR";
        } elseif ($value > $max) {
            return "REACTIVE";
        } else {
            return "NR";
        }
    }

    private function range_hiv($value)
    {
        $min = 0.90;
        $max = 1.10;

        if ($value >= $min && $value <= $max) {
            return "NR";
        } elseif ($value > $max) {
            return "REACTIVE";
        } else {
            return "NR";
        }
    }

    private function range_tp($value)
    {
        $min = 0.90;
        $max = 1.10;

        if ($value >= $min && $value <= $max) {
            return "NR";
        } elseif ($value > $max) {
            return "REACTIVE";
        } else {
            return "NR";
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
