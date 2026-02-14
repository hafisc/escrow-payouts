<?php

namespace App\Repositories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Collection;

interface ProjectRepositoryInterface
{
    public function all(): Collection;
    public function find(int $id): ?Project;
    public function create(array $data): Project;
    public function update(int $id, array $data): bool;
    public function delete(int $id): bool;
    public function getByClient(int $clientId): Collection;
    public function getByFreelancer(int $freelancerId): Collection;
}
