import axios from 'axios';
export class FakturowniaError extends Error {
    constructor(message, status, body) {
        super(message);
        this.status = status;
        this.body = body;
        this.name = 'FakturowniaError';
    }
}
export class HttpClient {
    constructor(config) {
        const subdomain = config.domain ?? 'app';
        this.client = axios.create({
            baseURL: `https://${subdomain}.fakturownia.pl`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            params: {
                api_token: config.token,
            },
        });
        // Normalize API errors into FakturowniaError
        this.client.interceptors.response.use((res) => res, (err) => {
            const status = err.response?.status ?? 0;
            const body = err.response?.data ?? null;
            const message = typeof body === 'object' && body !== null && 'error' in body
                ? String(body.error)
                : `Fakturownia API error: ${status} ${err.message}`;
            throw new FakturowniaError(message, status, body);
        });
    }
    async get(path, params) {
        const res = await this.client.get(`/${path}.json`, { params });
        return res.data;
    }
    async download(path, params) {
        const res = await this.client.get(`/${path}.pdf`, { params, responseType: 'arraybuffer' });
        return res.data;
    }
    async post(path, body) {
        const res = await this.client.post(`/${path}.json`, body);
        return res.data;
    }
    async put(path, body) {
        const res = await this.client.put(`/${path}.json`, body);
        return res.data;
    }
    async delete(path) {
        const res = await this.client.delete(`/${path}.json`);
        return res.data;
    }
    getUrl(path) {
        return this.client.getUri({
            url: `/${path}`,
        });
    }
}
//# sourceMappingURL=request.js.map