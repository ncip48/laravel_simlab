<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Patient extends Model
{
    use SoftDeletes;

    protected $fillable = ['name', 'address', 'province_id', 'regency_id', 'district_id', 'village_id', 'identity_number', 'post_code', 'gender', 'birth_place_id', 'birth_date'];

    public function province()
    {
        return $this->belongsTo(Province::class);
    }

    public function regency()
    {
        return $this->belongsTo(Regency::class);
    }

    public function district()
    {
        return $this->belongsTo(District::class);
    }

    public function village()
    {
        return $this->belongsTo(Village::class);
    }

    public function jk_string()
    {
        return $this->gender == "L" ? "Laki-Laki" : "Perempuan";
    }
}
