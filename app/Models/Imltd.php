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
        'nilai_hiv',
        'nilai_hbsag',
        'nilai_hcv',
        'nilai_tp',
        'created_by'
    ];
}
