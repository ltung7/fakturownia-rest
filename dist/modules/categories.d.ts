import type { HttpClient } from '../request.js';
import type { Category, CreateCategoryPayload, UpdateCategoryPayload } from '../types.js';
export declare class CategoriesModule {
    private readonly http;
    constructor(http: HttpClient);
    list(): Promise<Category[]>;
    get(id: number): Promise<Category>;
    create(payload: CreateCategoryPayload): Promise<Category>;
    update(id: number, payload: UpdateCategoryPayload): Promise<Category>;
    delete(id: number): Promise<void>;
}
//# sourceMappingURL=categories.d.ts.map