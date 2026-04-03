import type { HttpClient } from '../request.js'
import type {
    Payment,
    CreatePaymentPayload,
    UpdatePaymentPayload,
    ListParams,
} from '../types.js'

export class PaymentsModule {
    constructor(private readonly http: HttpClient) { }

    list(params?: ListParams): Promise<Payment[]> {
        return this.http.get<Payment[]>('banking/payments', params as Record<string, unknown>)
    }

    get(id: number): Promise<Payment> {
        return this.http.get<Payment>(`banking/payments/${id}`)
    }

    create(payload: CreatePaymentPayload): Promise<Payment> {
        return this.http.post<Payment>('banking/payments', { banking_payment: payload })
    }

    update(id: number, payload: UpdatePaymentPayload): Promise<Payment> {
        return this.http.put<Payment>(`banking/payments/${id}`, { banking_payment: payload })
    }

    delete(id: number): Promise<void> {
        return this.http.delete<void>(`banking/payments/${id}`)
    }
}