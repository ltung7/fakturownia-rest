import type { HttpClient } from '../request.js'
import type {
    Product,
    CreateProductPayload,
    UpdateProductPayload,
    ListParams,
} from '../types.js'

export class ProductsModule {
    constructor(private readonly http: HttpClient) { }

    list(params?: ListParams): Promise<Product[]> {
        return this.http.get<Product[]>('products', params as Record<string, unknown>)
    }

    get(id: number): Promise<Product> {
        return this.http.get<Product>(`products/${id}`)
    }

    create(payload: CreateProductPayload): Promise<Product> {
        return this.http.post<Product>('products', { product: payload })
    }

    update(id: number, payload: UpdateProductPayload): Promise<Product> {
        return this.http.put<Product>(`products/${id}`, { product: payload })
    }

    delete(id: number): Promise<void> {
        return this.http.delete<void>(`products/${id}`)
    }
}