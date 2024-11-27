<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Examination extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'patient_id',
        'blood_type',
        'rhesus',
        'blood_bag'
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }
}
