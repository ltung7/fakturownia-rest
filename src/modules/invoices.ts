import fs from 'node:fs'
import axios from 'axios'
import FormData from "form-data";

import type { HttpClient } from '../request.js'
import type {
    Invoice,
    CreateInvoicePayload,
    UpdateInvoicePayload,
    ListParams,
    InvoiceStatus,
    InvoiceStatusResponse,
    CreateRecurringInvoicePayload,
    UpdateRecurringInvoicePayload,
} from '../types.js'

export class InvoicesModule {
    constructor(private readonly http: HttpClient) { }

    list(params?: ListParams): Promise<Invoice[]> {
        return this.http.get<Invoice[]>('invoices', params as Record<string, unknown>)
    }

    get(id: number): Promise<Invoice> {
        return this.http.get<Invoice>(`invoices/${id}`)
    }

    create(payload: CreateInvoicePayload): Promise<Invoice> {
        return this.http.post<Invoice>('invoices', { invoice: payload })
    }

    update(id: number, payload: UpdateInvoicePayload): Promise<Invoice> {
        return this.http.put<Invoice>(`invoices/${id}`, { invoice: payload })
    }

    delete(id: number): Promise<void> {
        return this.http.delete<void>(`invoices/${id}`)
    }

    cancel(id: number, reason: string): Promise<InvoiceStatusResponse> {
        return this.http.post<InvoiceStatusResponse>(`invoices/cancel`, {
            cancel_invoice_id: id,
            cancel_reason: reason
        })
    }

    createRecurring(payload: CreateRecurringInvoicePayload): Promise<Invoice> {
        return this.http.post<Invoice>('recurrings', { recurring_invoice: payload })
    }

    updateRecurring(id: number, payload: UpdateRecurringInvoicePayload): Promise<Invoice> {
        return this.http.put<Invoice>(`recurrings/${id}`, { recurring_invoice: payload })
    }


    async uploadAttachment(id: number, buffer: Buffer, fileName: string, mimeType: string = 'application/pdf'): Promise<{ message: string }> {
        interface AwsData {
            url: string
            key: string
            policy: string
            signature: string
            acl: string
            success_action_status: string
            AWSAccessKeyId: string
        }

        const awsData = await this.http.get<AwsData>(`invoices/${id}/get_new_attachment_credentials`);
        const formData = new FormData();
        formData.append("AWSAccessKeyId", awsData.AWSAccessKeyId);
        formData.append("key", awsData.key.replace('${filename}', fileName));
        formData.append("policy", awsData.policy);
        formData.append("signature", awsData.signature);
        formData.append("acl", awsData.acl);
        formData.append("success_action_status", awsData.success_action_status);
        formData.append("file", buffer, { filename: fileName, contentType: mimeType });

        await axios.post(awsData.url, formData, {
            headers: { ...formData.getHeaders() },
        }).then(response => response.data);

        return await this.http.post(`invoices/${id}/add_attachment`, { file_name: fileName })
    }

    setStatus(id: number, status: InvoiceStatus): Promise<InvoiceStatusResponse> {
        return this.http.post<InvoiceStatusResponse>(`invoices/${id}/change_status`, { status })
    }

    /** Send the invoice to the buyer via email */
    sendByEmail(id: number, emailTo?: string): Promise<void> {
        return this.http.post<void>(`invoices/${id}/send_by_email`, {
            ...(emailTo && { email_to: emailTo }),
        })
    }

    /** Mark the invoice as paid */
    markAsPaid(id: number, paidDate?: string): Promise<InvoiceStatusResponse> {
        return this.http.post<InvoiceStatusResponse>(`invoices/${id}/change_status`, {
            status: 'paid',
            ...(paidDate && { paid_date: paidDate }),
        })
    }

    getPdfUrl(id: number): string {
        return this.http.getUrl(`invoices/${id}.pdf`)
    }

    async downloadPdf(id: number, path: string): Promise<string> {
        const response = await this.http.download(`invoices/${id}`)
        fs.writeFileSync(path, response);
        return path;
    }

    async downloadAttachments (id: number, path: string): Promise<string> {
        const response = await this.http.download(`invoices/${id}/attachments_zip`)
        console.log("🚀 ~ InvoicesModule ~ downloadAttachments ~ response:", response.length)
        fs.writeFileSync(path, response);
        return path;
    }
}