import axios, { AxiosInstance, AxiosError } from 'axios'
import type { FakturowniaConfig } from './types.js'

export class FakturowniaError extends Error {
    constructor(
        message: string,
        public readonly status: number,
        public readonly body: unknown
    ) {
        super(message)
        this.name = 'FakturowniaError'
    }
}

export class HttpClient {
    private readonly client: AxiosInstance

    constructor(config: FakturowniaConfig) {
        const subdomain = config.domain ?? 'app'

        this.client = axios.create({
            baseURL: `https://${subdomain}.fakturownia.pl`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            params: {
                api_token: config.token,
            },
        })

        // Normalize API errors into FakturowniaError
        this.client.interceptors.response.use(
            (res) => res,
            (err: AxiosError) => {
                const status = err.response?.status ?? 0
                const body = err.response?.data ?? null
                const message =
                    typeof body === 'object' && body !== null && 'error' in body
                        ? String((body as Record<string, unknown>).error)
                        : `Fakturownia API error: ${status} ${err.message}`

                throw new FakturowniaError(message, status, body)
            }
        )
    }

    async get<T>(path: string, params?: Record<string, unknown>): Promise<T> {
        const res = await this.client.get<T>(`/${path}.json`, { params })
        if (typeof res.data === 'string') {
            console.log(res.config.baseURL! + res.config.url);
        }
        return res.data
    }

    async download(path: string, params?: Record<string, unknown>): Promise<Buffer> {
        const res = await this.client.get<Buffer>(`/${path}.pdf`, { params, responseType: 'arraybuffer' })
        return res.data
    }

    async post<T>(path: string, body?: unknown): Promise<T> {
        const res = await this.client.post<T>(`/${path}.json`, body)
        return res.data
    }

    async put<T>(path: string, body?: unknown): Promise<T> {
        const res = await this.client.put<T>(`/${path}.json`, body)
        return res.data
    }

    async delete<T = void>(path: string): Promise<T> {
        const res = await this.client.delete<T>(`/${path}.json`)
        return res.data
    }

    getUrl(path: string) {
        return this.client.getUri({
            url: `/${path}`,
        });
    }
}