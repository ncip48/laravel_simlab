<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Imltd extends Model
{
    use SoftDeletes;

    protected $table = 'imltds';

    protected $fillable = [
        'blood_bag',
        'hiv',
        'nilai_hiv',
        'hbsag',
        'nilai_hbsag',
        'hcv',
        'nilai_hcv',
        'tp',
        'nilai_tp',
        'created_by'
    ];
}
