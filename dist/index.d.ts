import { InvoicesModule } from './modules/invoices.js';
import { ProductsModule } from './modules/products.js';
import { ClientsModule } from './modules/clients.js';
import { PaymentsModule } from './modules/payments.js';
import { CategoriesModule } from './modules/categories.js';
import { RecurringsModule } from './modules/recurrings.js';
export declare class Fakturownia {
    readonly invoices: InvoicesModule;
    readonly products: ProductsModule;
    readonly clients: ClientsModule;
    readonly payments: PaymentsModule;
    readonly categories: CategoriesModule;
    readonly recurrings: RecurringsModule;
    /**
     * @param token   - API token from Fakturownia → Settings → Integration
     * @param domain - Your subdomain (e.g. "mycompany" from mycompany.fakturownia.pl).
     *                  Optional — defaults to "app" if omitted.
     */
    constructor(token: string, domain?: string);
}
export * from './types.js';
export { FakturowniaError } from './request.js';
//# sourceMappingURL=index.d.ts.map