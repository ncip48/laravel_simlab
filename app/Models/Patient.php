<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Patient extends Model
{
    use SoftDeletes;

    protected $fillable = ['name', 'address', 'province_id', 'regency_id', 'district_id', 'village_id', 'identity_number', 'post_code', 'gender', 'birth_place_id', 'birth_date'];
}
