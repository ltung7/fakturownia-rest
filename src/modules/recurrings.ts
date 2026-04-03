import fs from 'node:fs'
import axios from 'axios'
import FormData from "form-data";

import type { HttpClient } from '../request.js'
import type {
    Invoice,
    ListParams,
    CreateRecurringInvoicePayload,
    UpdateRecurringInvoicePayload,
    RecurringInvoice,
} from '../types.js'

export class RecurringsModule {
    constructor(private readonly http: HttpClient) { }

    list(params?: ListParams): Promise<RecurringInvoice[]> {
        return this.http.get<RecurringInvoice[]>('recurrings', params as Record<string, unknown>)
    }

    create(payload: CreateRecurringInvoicePayload): Promise<RecurringInvoice> {
        return this.http.post<RecurringInvoice>('recurrings', { recurring: payload })
    }

    update(id: number, payload: UpdateRecurringInvoicePayload): Promise<RecurringInvoice> {
        return this.http.put<RecurringInvoice>(`recurrings/${id}`, { recurring: payload })
    }
}