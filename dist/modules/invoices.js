import fs from 'node:fs';
import axios from 'axios';
import FormData from "form-data";
export class InvoicesModule {
    constructor(http) {
        this.http = http;
    }
    list(params) {
        return this.http.get('invoices', params);
    }
    get(id) {
        return this.http.get(`invoices/${id}`);
    }
    create(payload) {
        return this.http.post('invoices', { invoice: payload });
    }
    update(id, payload) {
        return this.http.put(`invoices/${id}`, { invoice: payload });
    }
    delete(id) {
        return this.http.delete(`invoices/${id}`);
    }
    cancel(id, reason) {
        return this.http.post(`invoices/cancel`, {
            cancel_invoice_id: id,
            cancel_reason: reason
        });
    }
    async uploadAttachment(id, buffer, fileName, mimeType = 'application/pdf') {
        const awsData = await this.http.get(`invoices/${id}/get_new_attachment_credentials`);
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
        return await this.http.post(`invoices/${id}/add_attachment`, { file_name: fileName });
    }
    setStatus(id, status) {
        return this.http.post(`invoices/${id}/change_status`, { status });
    }
    /** Send the invoice to the buyer via email */
    sendByEmail(id, emailTo) {
        return this.http.post(`invoices/${id}/send_by_email`, {
            ...(emailTo && { email_to: emailTo }),
        });
    }
    /** Mark the invoice as paid */
    markAsPaid(id, paidDate) {
        return this.http.post(`invoices/${id}/change_status`, {
            status: 'paid',
            ...(paidDate && { paid_date: paidDate }),
        });
    }
    getPdfUrl(id) {
        return this.http.getUrl(`invoices/${id}.pdf`);
    }
    async downloadPdf(id, path) {
        const response = await this.http.download(`invoices/${id}`);
        fs.writeFileSync(path, response);
        return path;
    }
    async downloadAttachments(id, path) {
        const response = await this.http.download(`invoices/${id}/attachments_zip`);
        console.log("🚀 ~ InvoicesModule ~ downloadAttachments ~ response:", response.length);
        fs.writeFileSync(path, response);
        return path;
    }
}
//# sourceMappingURL=invoices.js.map