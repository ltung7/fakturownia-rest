export class CategoriesModule {
    constructor(http) {
        this.http = http;
    }
    list() {
        return this.http.get('categories');
    }
    get(id) {
        return this.http.get(`categories/${id}`);
    }
    create(payload) {
        return this.http.post('categories', { category: payload });
    }
    update(id, payload) {
        return this.http.put(`categories/${id}`, { category: payload });
    }
    delete(id) {
        return this.http.delete(`categories/${id}`);
    }
}
//# sourceMappingURL=categories.js.map