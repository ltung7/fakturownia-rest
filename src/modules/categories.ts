import type { HttpClient } from '../request.js'
import type {
    Category,
    CreateCategoryPayload,
    UpdateCategoryPayload,
} from '../types.js'

export class CategoriesModule {
    constructor(private readonly http: HttpClient) { }

    list(): Promise<Category[]> {
        return this.http.get<Category[]>('categories')
    }

    get(id: number): Promise<Category> {
        return this.http.get<Category>(`categories/${id}`)
    }

    create(payload: CreateCategoryPayload): Promise<Category> {
        return this.http.post<Category>('categories', { category: payload })
    }

    update(id: number, payload: UpdateCategoryPayload): Promise<Category> {
        return this.http.put<Category>(`categories/${id}`, { category: payload })
    }

    delete(id: number): Promise<void> {
        return this.http.delete<void>(`categories/${id}`)
    }
}