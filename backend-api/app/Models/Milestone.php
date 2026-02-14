<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Milestone extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'title',
        'amount',
        'status',
        'submission_path',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
