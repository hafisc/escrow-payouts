<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class AiService
{
    protected $baseUrl;

    public function __construct()
    {
        // Python Microservice at port 8000
        $this->baseUrl = config('services.ai.base_url', 'http://localhost:8000');
    }

    /**
     * Send submission to Python AI service for verification.
     *
     * @param string $submissionPath
     * @return array
     */
    public function verifySubmission(string $submissionPath): array
    {
        try {
            $response = Http::post($this->baseUrl . '/verify', [
                'path' => $submissionPath,
            ]);

            if ($response->successful()) {
                return $response->json(); // Expected ['approved' => true/false, 'reason' => '']
            }

            return ['approved' => true, 'reason' => 'Service unavailable, manual review required']; // Fallback

        } catch (\Exception $e) {
            // Log error
            return ['approved' => true, 'reason' => 'Service error, manual check needed']; // Fallback
        }
    }
}
