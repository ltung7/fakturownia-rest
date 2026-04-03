export class ProductsModule {
    constructor(http) {
        this.http = http;
    }
    list(params) {
        return this.http.get('products', params);
    }
    get(id) {
        return this.http.get(`products/${id}`);
    }
    create(payload) {
        return this.http.post('products', { product: payload });
    }
    update(id, payload) {
        return this.http.put(`products/${id}`, { product: payload });
    }
    delete(id) {
        return this.http.delete(`products/${id}`);
    }
}
//# sourceMappingURL=products.js.map