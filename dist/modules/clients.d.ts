import type { HttpClient } from '../request.js';
import type { Client, CreateClientPayload, UpdateClientPayload, ListParams } from '../types.js';
export declare class ClientsModule {
    private readonly http;
    constructor(http: HttpClient);
    list(params?: ListParams): Promise<Client[]>;
    get(id: number): Promise<Client>;
    create(payload: CreateClientPayload): Promise<Client>;
    update(id: number, payload: UpdateClientPayload): Promise<Client>;
    delete(id: number): Promise<void>;
}
//# sourceMappingURL=clients.d.ts.map