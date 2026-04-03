export class ClientsModule {
    constructor(http) {
        this.http = http;
    }
    list(params) {
        return this.http.get('clients', params);
    }
    get(id) {
        return this.http.get(`clients/${id}`);
    }
    create(payload) {
        return this.http.post('clients', { client: payload });
    }
    update(id, payload) {
        return this.http.put(`clients/${id}`, { client: payload });
    }
    delete(id) {
        return this.http.delete(`clients/${id}`);
    }
}
//# sourceMappingURL=clients.js.map