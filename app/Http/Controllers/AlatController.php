<?php

namespace App\Http\Controllers;

use App\Models\Device;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AlatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $devices = Device::all();

        $devices = $devices->map(function ($item) {
            // Decode the 'parameter' field (assumed to be a JSON string)
            $parameters = json_decode($item->parameter, true); // true for associating objects to arrays

            $params_names = [];

            // Check if the decoding was successful
            if (is_array($parameters)) {
                // Loop through each parameter and get the name
                foreach ($parameters as $id_parameter) {
                    // Call the method to get the parameter name, assuming you want to store the names
                    $parameterName = $this->getParameterName($item->id, $id_parameter);

                    // Optionally, you can store or modify the device object with the parameter names
                    // Example: Adding parameter names to the item (you can change how you structure it)
                    $params_names[] = $parameterName; // Add the parameter name to the device
                }
            }

            count($params_names) > 0 ? $item->parameter_name = implode(',', $params_names) : $item->parameter_name = "-";
            // $item->parameter_name = $item->$params_names;

            return $item;
        });

        return Inertia::render('alat/index', [
            'items' => $devices,
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
            'folder' => 'required',
        ], [
            'name.required' => 'Nama tidak boleh kosong',
            'folder.required' => 'Folder tidak boleh kosong',
        ]);

        Device::create($request->all());
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
            'folder' => 'required',
        ], [
            'name.required' => 'Nama tidak boleh kosong',
            'folder.required' => 'Folder tidak boleh kosong',
        ]);

        Device::where('id', $id)->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Device::where('id', $id)->delete();
    }

    public function getParameterHead(string $id)
    {
        $device = Device::find($id);
        $data = array_map('str_getcsv', file($device->folder));
        $headers = collect($data[0]);

        // Add id and name for each header item
        $headersWithIds = $headers->map(function ($header, $index) {
            return [
                'id' => $index + 1,  // start id from 1 (index + 1)
                'name' => $header
            ];
        });

        return $headersWithIds;
    }

    public function getParameterContent(string $id)
    {
        $device = Device::find($id);
        $data = array_map('str_getcsv', file($device->folder));
        $headers = collect(array_slice($data, 1, count($data)));

        // Add id and name for each header item
        $contents = $headers->map(function ($header, $index) {
            return [
                'id' => $index + 1,  // start id from 1 (index + 1)
                'data' => $header
            ];
        });

        return $contents;
    }

    public function getParameterName(string $id, string $id_parameter)
    {
        $parameters = $this->getParameterHead($id);

        $get = $parameters->where('id', $id_parameter)->first();

        return $get['name'];
    }

    public function setParameter(Request $request, string $id)
    {
        $parameters = $request->send_param;
        $parameter = json_encode($parameters);

        Device::where('id', $id)->update(['parameter' => $parameter]);
    }
}
