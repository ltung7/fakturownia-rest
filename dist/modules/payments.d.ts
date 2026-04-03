import type { HttpClient } from '../request.js';
import type { Payment, CreatePaymentPayload, UpdatePaymentPayload, ListParams } from '../types.js';
export declare class PaymentsModule {
    private readonly http;
    constructor(http: HttpClient);
    list(params?: ListParams): Promise<Payment[]>;
    get(id: number): Promise<Payment>;
    create(payload: CreatePaymentPayload): Promise<Payment>;
    update(id: number, payload: UpdatePaymentPayload): Promise<Payment>;
    delete(id: number): Promise<void>;
}
//# sourceMappingURL=payments.d.ts.map