<?php

namespace App\Http\Controllers;

use App\Models\Device;

abstract class Controller
{
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
}
