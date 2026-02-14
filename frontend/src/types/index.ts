export interface Milestone {
    id: number;
    title: string;
    amount: number;
    status: 'pending' | 'in_escrow' | 'released' | 'disputed';
    submission_path?: string;
}

export interface Transaction {
    id: number;
    reference_id: string;
    amount: number;
    type: 'inbound' | 'outbound';
    status: 'pending' | 'settlement' | 'failed';
    created_at: string;
}

export interface Project {
    id: number;
    title: string;
    description: string;
    total_budget: number;
    status: 'draft' | 'active' | 'completed' | 'disputed';
    client_id: number;
    freelancer_id?: number;
    milestones: Milestone[];
    created_at: string;
    client?: { name: string };
    freelancer?: { name: string };
}
