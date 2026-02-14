<?php

namespace App\Services;

use Exception;

class MidtransService
{
    protected $serverKey;
    protected $clientKey;
    protected $isProduction;

    public function __construct()
    {
        $this->serverKey = config('services.midtrans.server_key');
        $this->clientKey = config('services.midtrans.client_key');
        $this->isProduction = config('services.midtrans.is_production', false);
        
        // Setup configuration (simulated for SDK usage)
        // \Midtrans\Config::$serverKey = $this->serverKey;
        // \Midtrans\Config::$isProduction = $this->isProduction;
    }

    /**
     * Create a payment transaction url.
     *
     * @param object $transaction
     * @return string
     */
    public function createPayment($transaction): string
    {
        // Simulate obtaining URL from Midtrans Snap
        // $params = [
        //     'transaction_details' => [
        //         'order_id' => $transaction->reference_id,
        //         'gross_amount' => $transaction->amount,
        //     ],
        // ];
        
        // $snapToken = \Midtrans\Snap::getSnapToken($params);
        
        return "https://app.sandbox.midtrans.com/snap/v2/vtweb/" . $transaction->reference_id; // Dummy URL
    }
}
