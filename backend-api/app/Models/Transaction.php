<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'milestone_id',
        'reference_id',
        'type',
        'amount',
        'status',
    ];

    public function milestone()
    {
        return $this->belongsTo(Milestone::class);
    }
}
