<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Antibody extends Model
{
    use SoftDeletes;

    protected $table = 'antibodies';

    protected $fillable = [
        'blood_bag',
        'p1',
        'p2',
        'p3',
        'p4',
        'created_by'
    ];

    public function result()
    {
        if ($this->p1 || $this->p2 || $this->p3 || $this->p4) {
            return "Positif";
        } else {
            return "Negatif";
        }
    }
}
