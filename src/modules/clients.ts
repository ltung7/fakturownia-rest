import type { HttpClient } from '../request.js'
import type {
    Client,
    CreateClientPayload,
    UpdateClientPayload,
    ListParams,
} from '../types.js'

export class ClientsModule {
    constructor(private readonly http: HttpClient) { }

    list(params?: ListParams): Promise<Client[]> {
        return this.http.get<Client[]>('clients', params as Record<string, unknown>)
    }

    get(id: number): Promise<Client> {
        return this.http.get<Client>(`clients/${id}`)
    }

    create(payload: CreateClientPayload): Promise<Client> {
        return this.http.post<Client>('clients', { client: payload })
    }

    update(id: number, payload: UpdateClientPayload): Promise<Client> {
        return this.http.put<Client>(`clients/${id}`, { client: payload })
    }

    delete(id: number): Promise<void> {
        return this.http.delete<void>(`clients/${id}`)
    }
}