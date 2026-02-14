<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Repositories\ProjectRepositoryInterface;
use App\Services\EscrowLogic;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    use ApiResponse;

    protected $repository;
    protected $escrowService;

    public function __construct(ProjectRepositoryInterface $repository, EscrowLogic $escrowService)
    {
        $this->repository = $repository;
        $this->escrowService = $escrowService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        if ($user->role === 'client') {
            $projects = $this->repository->getByClient($user->id);
        } elseif ($user->role === 'freelancer') {
            $projects = $this->repository->getByFreelancer($user->id);
        } else {
            $projects = $this->repository->all();
        }

        return $this->success(ProjectResource::collection($projects));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request): JsonResponse
    {
        try {
            $project = $this->escrowService->createProject($request->validated());
            return $this->success(new ProjectResource($project), 'Project created successfully', 201);
        } catch (\Exception $e) {
            return $this->error($e->getMessage(), 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $project = $this->repository->find($id);

        if (!$project) {
            return $this->error('Project not found', 404);
        }
        
        return $this->success(new ProjectResource($project));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $updated = $this->repository->update($id, $request->all());

        if (!$updated) {
            return $this->error('Update failed or project not found', 400);
        }

        return $this->success(null, 'Project updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $deleted = $this->repository->delete($id);

        if (!$deleted) {
             return $this->error('Deletion failed or project not found', 400);
        }

        return $this->success(null, 'Project deleted successfully');
    }
    
    // Add custom method for Funding a Milestone
    public function fundMilestone(Request $request, $milestoneId) {
        try {
            $result = $this->escrowService->fundMilestone($milestoneId);
            return $this->success($result, 'Payment initiated');
        } catch (\Exception $e) {
            return $this->error($e->getMessage());
        }
    }

    // Add custom method for Releasing a Milestone
    public function releaseMilestone(Request $request, $milestoneId) {
         try {
            $milestone = $this->escrowService->releaseMilestone($milestoneId);
            return $this->success(new \App\Http\Resources\MilestoneResource($milestone), 'Funds released');
        } catch (\Exception $e) {
            return $this->error($e->getMessage());
        }
    }
}
