<?php

namespace App\Services;

use App\Models\Project;
use App\Models\Milestone;
use App\Models\Transaction;
use Illuminate\Support\Facades\DB;
use App\Traits\ApiResponse;
use Exception;

class EscrowLogic
{
    use ApiResponse;

    protected $midtransService;
    protected $aiService;

    public function __construct(MidtransService $midtransService, AiService $aiService)
    {
        $this->midtransService = $midtransService;
        $this->aiService = $aiService;
    }

    /**
     * Create a new project with initial milestones.
     *
     * @param array $data
     * @return Project
     */
    public function createProject(array $data): Project
    {
        return DB::transaction(function () use ($data) {
            $project = Project::create([
                'title' => $data['title'],
                'description' => $data['description'],
                'total_budget' => $data['total_budget'],
                'client_id' => auth()->id(), // Assuming authenticated user is client
                'status' => 'draft',
            ]);

            if (isset($data['milestones'])) {
                foreach ($data['milestones'] as $milestoneData) {
                    $project->milestones()->create([
                        'title' => $milestoneData['title'],
                        'amount' => $milestoneData['amount'],
                        'status' => 'pending',
                    ]);
                }
            }

            return $project;
        });
    }

    /**
     * Fund a milestone (move to escrow).
     *
     * @param int $milestoneId
     * @return array
     */
    public function fundMilestone(int $milestoneId): array
    {
        $milestone = Milestone::findOrFail($milestoneId);

        if ($milestone->status !== 'pending') {
            throw new Exception("Milestone is not pending funding.");
        }

        // Logic to initiate payment with Midtrans
        $transaction = Transaction::create([
            'milestone_id' => $milestone->id,
            'type' => 'inbound',
            'amount' => $milestone->amount,
            'status' => 'pending',
            'reference_id' => 'TXN-' . uniqid(),
        ]);

        $paymentUrl = $this->midtransService->createPayment($transaction);

        return ['payment_url' => $paymentUrl, 'transaction_id' => $transaction->id];
    }

    /**
     * Release funds for a milestone (completed).
     *
     * @param int $milestoneId
     * @return Milestone
     */
    public function releaseMilestone(int $milestoneId): Milestone
    {
        return DB::transaction(function () use ($milestoneId) {
            $milestone = Milestone::findOrFail($milestoneId);

            if ($milestone->status !== 'in_escrow') {
                throw new Exception("Milestone funds are not in escrow.");
            }

            // Verify with AI Service (example integration)
            $verification = $this->aiService->verifySubmission($milestone->submission_path);
            
            if (!$verification['approved']) {
                // Handle rejection or flag for review
                // For now, we proceed manually or throw error based on logic
                // throw new Exception("AI Verification Failed: " . $verification['reason']);
            }

            $milestone->update(['status' => 'released']);
            
            Transaction::create([
                'milestone_id' => $milestone->id,
                'type' => 'outbound', // Payout to freelancer
                'amount' => $milestone->amount,
                'status' => 'completed',
                'reference_id' => 'PAYOUT-' . uniqid(),
            ]);

            return $milestone;
        });
    }
}
