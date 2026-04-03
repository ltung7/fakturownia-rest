import type { FakturowniaConfig } from './types.js';
export declare class FakturowniaError extends Error {
    readonly status: number;
    readonly body: unknown;
    constructor(message: string, status: number, body: unknown);
}
export declare class HttpClient {
    private readonly client;
    constructor(config: FakturowniaConfig);
    get<T>(path: string, params?: Record<string, unknown>): Promise<T>;
    download(path: string, params?: Record<string, unknown>): Promise<Buffer>;
    post<T>(path: string, body?: unknown): Promise<T>;
    put<T>(path: string, body?: unknown): Promise<T>;
    delete<T = void>(path: string): Promise<T>;
    getUrl(path: string): string;
}
//# sourceMappingURL=request.d.ts.map