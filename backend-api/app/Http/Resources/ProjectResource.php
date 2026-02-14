<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'total_budget' => $this->total_budget,
            'formatted_budget' => 'Rp ' . number_format($this->total_budget, 0, ',', '.'),
            'status' => $this->status,
            'client' => new UserResource($this->whenLoaded('client')),
            'freelancer' => new UserResource($this->whenLoaded('freelancer')),
            'milestones' => MilestoneResource::collection($this->whenLoaded('milestones')),
            'created_at' => $this->created_at->toISOString(),
            'updated_at' => $this->updated_at->toISOString(),
        ];
    }
}

class UserResource extends JsonResource {
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
        ];
    }
}

class MilestoneResource extends JsonResource {
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'amount' => $this->amount,
            'status' => $this->status,
        ];
    }
}
