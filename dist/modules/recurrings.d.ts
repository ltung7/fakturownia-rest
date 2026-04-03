import type { HttpClient } from '../request.js';
import type { ListParams, CreateRecurringInvoicePayload, UpdateRecurringInvoicePayload, RecurringInvoice } from '../types.js';
export declare class RecurringsModule {
    private readonly http;
    constructor(http: HttpClient);
    list(params?: ListParams): Promise<RecurringInvoice[]>;
    create(payload: CreateRecurringInvoicePayload): Promise<RecurringInvoice>;
    update(id: number, payload: UpdateRecurringInvoicePayload): Promise<RecurringInvoice>;
}
//# sourceMappingURL=recurrings.d.ts.map