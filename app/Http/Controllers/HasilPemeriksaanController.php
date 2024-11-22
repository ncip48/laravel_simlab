<?php

namespace App\Http\Controllers;

use App\Models\Device;
use App\Models\Patient;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HasilPemeriksaanController extends Controller
{
    public function index()
    {
        $alats = Device::all()->map(function ($alat) {
            return [
                'value' => (string)$alat->id,
                'label' => $alat->name,
            ];
        });
        return Inertia::render('hasil-pemeriksaan', ['alats' => $alats]);
    }

    public function search(Request $request)
    {
        $alatId = $request->input('alat');
        $tanggal = $request->input('tanggal');
        $tanggalParsed = $request->input('tanggalParsed');
        // Parse tanggal from the request to 'Y-m-d' format
        $searchDate = Carbon::parse($tanggal)->format('Y-m-d');

        $results = $this->getParameterContent($alatId);
        $headers = $this->getParameterHead($alatId);

        $alats = Device::all()->map(function ($alat) {
            return [
                'value' => (string)$alat->id,
                'label' => $alat->name,
            ];
        });

        // Filter results based on date
        $filteredResults = $results->filter(function ($item) use ($searchDate) {
            // Parse $item['data'][2] from 'm-d-Y' to 'Y-m-d' for comparison
            $itemDate = Carbon::createFromFormat('m-d-Y', $item['data'][2])->format('Y-m-d');

            // Only include items where the date matches
            return $itemDate === $searchDate;
        });

        // $newResult = [];
        $newResult = $filteredResults->map(function ($item) use ($alatId, $headers, $tanggal) {
            $device = Device::where('id', $alatId)->first();
            $params = json_decode($device->parameter);
            asort($params);

            $parameters = [];
            foreach ($params as $param) {
                // Find the header by its id
                $header = collect($headers)->firstWhere('id', $param);  // This uses Laravel's Collection helper

                // If a header is found, get the 'name' from the header object
                $parameterName = $header ? $header['name'] : 'Unknown Parameter';

                // Add the parameter data to the list
                $parameters[] = [
                    'parameter' => $parameterName,
                    'value' => $item['data'][$header['id'] - 1] ?? null // Safely retrieve data by index
                ];
            }

            return [
                'patient' => Patient::where('id', $item['data'][0])->first(),
                'parameters' => $parameters
            ];
        });

        return Inertia::render('hasil-pemeriksaan', [
            'alat' => $alatId,
            'tanggal' => $tanggal,
            'alats' => $alats,
            'results' => $newResult,
        ]);
    }
}