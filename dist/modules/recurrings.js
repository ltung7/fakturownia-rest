export class RecurringsModule {
    constructor(http) {
        this.http = http;
    }
    list(params) {
        return this.http.get('recurrings', params);
    }
    create(payload) {
        return this.http.post('recurrings', { recurring: payload });
    }
    update(id, payload) {
        return this.http.put(`recurrings/${id}`, { recurring: payload });
    }
}
//# sourceMappingURL=recurrings.js.map