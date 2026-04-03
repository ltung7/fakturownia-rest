export class PaymentsModule {
    constructor(http) {
        this.http = http;
    }
    list(params) {
        return this.http.get('banking/payments', params);
    }
    get(id) {
        return this.http.get(`banking/payments/${id}`);
    }
    create(payload) {
        return this.http.post('banking/payments', { banking_payment: payload });
    }
    update(id, payload) {
        return this.http.put(`banking/payments/${id}`, { banking_payment: payload });
    }
    delete(id) {
        return this.http.delete(`banking/payments/${id}`);
    }
}
//# sourceMappingURL=payments.js.map