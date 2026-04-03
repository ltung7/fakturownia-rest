import { HttpClient } from './request.js';
import { InvoicesModule } from './modules/invoices.js';
import { ProductsModule } from './modules/products.js';
import { ClientsModule } from './modules/clients.js';
import { PaymentsModule } from './modules/payments.js';
import { CategoriesModule } from './modules/categories.js';
export class Fakturownia {
    /**
     * @param token   - API token from Fakturownia → Settings → Integration
     * @param domain - Your subdomain (e.g. "mycompany" from mycompany.fakturownia.pl).
     *                  Optional — defaults to "app" if omitted.
     */
    constructor(token, domain) {
        const config = { token, domain };
        if (token.includes('/')) {
            const credentials = token.split('/');
            config.token = credentials[0];
            config.domain = credentials[1];
        }
        else if (domain)
            config.domain = domain;
        const http = new HttpClient(config);
        this.invoices = new InvoicesModule(http);
        this.products = new ProductsModule(http);
        this.clients = new ClientsModule(http);
        this.payments = new PaymentsModule(http);
        this.categories = new CategoriesModule(http);
    }
}
// Single barrel — consumers import everything from 'fakturownia'
export * from './types.js';
export { FakturowniaError } from './request.js';
//# sourceMappingURL=index.js.map