<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Project;
use App\Models\Milestone;
use App\Models\Transaction;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Users
        $client = User::create([
            'name' => 'Sultan Client',
            'email' => 'client@escrowy.com',
            'password' => Hash::make('password'),
            'role' => 'client',
        ]);

        $freelancer = User::create([
            'name' => 'Jagoan Koding',
            'email' => 'freelancer@escrowy.com',
            'password' => Hash::make('password'),
            'role' => 'freelancer',
        ]);

        $admin = User::create([
            'name' => 'Super Admin',
            'email' => 'admin@escrowy.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // 2. Create Projects
        
        // Project 1: Active (E-Commerce)
        $project1 = Project::create([
            'title' => 'Redesign Toko Online E-Commerce',
            'description' => 'Membuat ulang tampilan toko online dengan Next.js dan styling modern.',
            'total_budget' => 5000000,
            'status' => 'active',
            'client_id' => $client->id,
            'freelancer_id' => $freelancer->id,
        ]);

        $m1_1 = Milestone::create([
            'project_id' => $project1->id,
            'title' => 'DP & UI Design',
            'amount' => 1500000,
            'status' => 'released',
        ]);
        
        $m1_2 = Milestone::create([
            'project_id' => $project1->id,
            'title' => 'Frontend Development',
            'amount' => 2000000,
            'status' => 'in_escrow', // Sedang dikerjakan / uang sudah masuk
        ]);

        $m1_3 = Milestone::create([
            'project_id' => $project1->id,
            'title' => 'Backend Integration & Deployment',
            'amount' => 1500000,
            'status' => 'pending',
        ]);

        // Transaction for Milestone 1 (Completed)
        Transaction::create([
            'milestone_id' => $m1_1->id,
            'reference_id' => 'TXN-' . uniqid(),
            'type' => 'inbound',
            'amount' => 1500000,
            'status' => 'settlement',
        ]);
        Transaction::create([
            'milestone_id' => $m1_1->id,
            'reference_id' => 'PAYOUT-' . uniqid(),
            'type' => 'outbound',
            'amount' => 1500000,
            'status' => 'settlement',
        ]);

        // Transaction for Milestone 2 (In Escrow - Uang masuk tapi belum cair)
        Transaction::create([
            'milestone_id' => $m1_2->id,
            'reference_id' => 'TXN-' . uniqid(),
            'type' => 'inbound',
            'amount' => 2000000,
            'status' => 'settlement',
        ]);


        // Project 2: Pending (AI Service) - Belum ada freelancer
        $project2 = Project::create([
            'title' => 'Python AI Microservice',
            'description' => 'Membuat service untuk deteksi objek menggunakan YOLOv8.',
            'total_budget' => 3000000,
            'status' => 'draft',
            'client_id' => $client->id,
        ]);

        Milestone::create([
            'project_id' => $project2->id,
            'title' => 'Full Development',
            'amount' => 3000000,
            'status' => 'pending',
        ]);


        // Project 3: Completed (Logo Design)
        $project3 = Project::create([
            'title' => 'Logo & Branding Startup',
            'description' => 'Desain logo vector dan brand guideline.',
            'total_budget' => 1000000,
            'status' => 'completed',
            'client_id' => $client->id,
            'freelancer_id' => $freelancer->id,
        ]);

         $m3_1 = Milestone::create([
            'project_id' => $project3->id,
            'title' => 'Final Deliverables',
            'amount' => 1000000,
            'status' => 'released',
        ]);
        
        Transaction::create([
            'milestone_id' => $m3_1->id,
            'reference_id' => 'TXN-' . uniqid(),
            'type' => 'inbound',
            'amount' => 1000000,
            'status' => 'settlement',
        ]);
         Transaction::create([
            'milestone_id' => $m3_1->id,
            'reference_id' => 'PAYOUT-' . uniqid(),
            'type' => 'outbound',
            'amount' => 1000000,
            'status' => 'settlement',
        ]);

    }
}
