export interface License {
    _id: string;
    phone: string;
    status: 'trial' | 'active' | 'expired';
    activatedOn: Date;
}
