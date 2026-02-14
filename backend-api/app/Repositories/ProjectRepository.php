<?php

namespace App\Repositories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Collection;

class ProjectRepository implements ProjectRepositoryInterface
{
    protected $model;

    public function __construct(Project $project)
    {
        $this->model = $project;
    }

    public function all(): Collection
    {
        return $this->model->with(['client', 'freelancer', 'milestones'])->orderBy('created_at', 'desc')->get();
    }

    public function find(int $id): ?Project
    {
        return $this->model->with(['client', 'freelancer', 'milestones'])->find($id);
    }

    public function create(array $data): Project
    {
        return $this->model->create($data); // Note: complex creation logic handled by Service
    }

    public function update(int $id, array $data): bool
    {
        $project = $this->model->find($id);
        if (!$project) return false;
        
        return $project->update($data);
    }

    public function delete(int $id): bool
    {
        return $this->model->destroy($id);
    }

    public function getByClient(int $clientId): Collection
    {
        return $this->model->where('client_id', $clientId)
            ->with(['freelancer', 'milestones'])
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function getByFreelancer(int $freelancerId): Collection
    {
        return $this->model->where('freelancer_id', $freelancerId)
            ->with(['client', 'milestones'])
            ->orderBy('created_at', 'desc')
            ->get();
    }
}
