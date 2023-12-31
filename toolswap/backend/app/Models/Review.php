<?php

namespace App\Models;

use App\Models\Offer;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'offer_id',
        'stars'
    ];

    public function offer()
    {
        return $this->belongsTo(Offer::class);
    }
}
