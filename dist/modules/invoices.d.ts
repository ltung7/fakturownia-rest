import type { HttpClient } from '../request.js';
import type { Invoice, CreateInvoicePayload, UpdateInvoicePayload, ListParams, InvoiceStatus, InvoiceStatusResponse } from '../types.js';
export declare class InvoicesModule {
    private readonly http;
    constructor(http: HttpClient);
    list(params?: ListParams): Promise<Invoice[]>;
    get(id: number): Promise<Invoice>;
    create(payload: CreateInvoicePayload): Promise<Invoice>;
    update(id: number, payload: UpdateInvoicePayload): Promise<Invoice>;
    delete(id: number): Promise<void>;
    cancel(id: number, reason: string): Promise<InvoiceStatusResponse>;
    uploadAttachment(id: number, buffer: Buffer, fileName: string, mimeType?: string): Promise<string>;
    setStatus(id: number, status: InvoiceStatus): Promise<InvoiceStatusResponse>;
    /** Send the invoice to the buyer via email */
    sendByEmail(id: number, emailTo?: string): Promise<void>;
    /** Mark the invoice as paid */
    markAsPaid(id: number, paidDate?: string): Promise<InvoiceStatusResponse>;
    getPdfUrl(id: number): string;
    downloadPdf(id: number, path: string): Promise<string>;
    downloadAttachments(id: number, path: string): Promise<string>;
}
//# sourceMappingURL=invoices.d.ts.map