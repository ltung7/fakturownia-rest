import type { HttpClient } from '../request.js';
import type { Product, CreateProductPayload, UpdateProductPayload, ListParams } from '../types.js';
export declare class ProductsModule {
    private readonly http;
    constructor(http: HttpClient);
    list(params?: ListParams): Promise<Product[]>;
    get(id: number): Promise<Product>;
    create(payload: CreateProductPayload): Promise<Product>;
    update(id: number, payload: UpdateProductPayload): Promise<Product>;
    delete(id: number): Promise<void>;
}
//# sourceMappingURL=products.d.ts.map