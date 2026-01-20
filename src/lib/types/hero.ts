export interface Asset {
    _id: string;
    section: string;
    subtitle?: string;
    type: string;
    url: string;
    public_id: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface ApiResponse {
    status: boolean;
    message: string;
    data: Asset[];
}