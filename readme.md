# fakturownia

Fully-typed Node.js wrapper for the [Fakturownia](https://fakturownia.pl) REST API.

## Installation

```bash
npm install fakturownia
```

## Quick Start

```ts
import { Fakturownia } from 'fakturownia'

const fk = new Fakturownia('your-api-token', 'yoursubdomain')
// If your account URL is yoursubdomain.fakturownia.pl
// The second argument is optional — omit it if using app.fakturownia.pl
```

Your API token is available under **Settings → Integration → API token**.

---

## Invoices

### List invoices

```ts
// All invoices (first page)
const invoices = await fk.invoices.list()

// With filters
const invoices = await fk.invoices.list({
  page: 1,
  per_page: 25,
  period: 'this_month',     // 'this_month' | 'last_month' | 'this_year' | 'last_year'
  date_from: '2024-01-01',
  date_to: '2024-12-31',
  client_id: 123,
})
```

### Get a single invoice

```ts
const invoice = await fk.invoices.get(456)

console.log(invoice.number)      // "FV 1/01/2025"
console.log(invoice.price_gross) // "1230.00"
console.log(invoice.status)      // "issued" | "paid" | ...
```

### Create an invoice

```ts
import type { CreateInvoicePayload } from 'fakturownia'

const payload: CreateInvoicePayload = {
  kind: 'vat',
  buyer_name: 'Acme sp. z o.o.',
  buyer_tax_no: 'PL1234567890',
  buyer_email: 'accounting@acme.com',
  payment_type: 'transfer',
  payment_to_kind: 14,   // days until due
  currency: 'PLN',
  positions: [
    {
      name: 'Web development — March 2025',
      quantity: 1,
      quantity_unit: 'szt.',
      unit_price: 5000,
      tax: 23,
    },
    {
      name: 'Hosting (monthly)',
      quantity: 3,
      quantity_unit: 'miesiąc',
      unit_price: 49,
      tax: 23,
    },
  ],
}

const invoice = await fk.invoices.create(payload)
console.log(invoice.id)     // 789
console.log(invoice.number) // auto-assigned by Fakturownia
```

### Update an invoice

```ts
const updated = await fk.invoices.update(789, {
  buyer_email: 'new@acme.com',
  description: 'Updated payment details',
})
```

### Delete an invoice

```ts
await fk.invoices.delete(789)
```

### Send invoice by email

```ts
// Uses the buyer email stored on the invoice
await fk.invoices.sendByEmail(789)

// Or override the recipient
await fk.invoices.sendByEmail(789, 'someone@acme.com')
```

### Mark as paid

```ts
const paid = await fk.invoices.markAsPaid(789)

// With a specific payment date
const paid = await fk.invoices.markAsPaid(789, '2025-03-15')
```

---

## Clients

### List clients

```ts
const clients = await fk.clients.list({ per_page: 50 })
```

### Create a client

```ts
const client = await fk.clients.create({
  name: 'Acme sp. z o.o.',
  tax_no: 'PL1234567890',
  email: 'accounting@acme.com',
  city: 'Warsaw',
  post_code: '00-001',
  street: 'ul. Przykładowa 1',
  country: 'PL',
})
```

### Update / delete

```ts
await fk.clients.update(client.id, { phone: '+48 123 456 789' })
await fk.clients.delete(client.id)
```

---

## Products

### List products

```ts
const products = await fk.products.list()
```

### Create a product

```ts
const product = await fk.products.create({
  name: 'Web Hosting — Basic',
  code: 'HOST-BASIC',
  price_net: 49,
  tax: 23,
  currency: 'PLN',
  unit: 'miesiąc',
})
```

### Update / delete

```ts
await fk.products.update(product.id, { price_net: 59 })
await fk.products.delete(product.id)
```

---

## Payments

### List payments

```ts
const payments = await fk.payments.list({ per_page: 20 })
```

### Create a payment linked to an invoice

```ts
const payment = await fk.payments.create({
  name: 'Bank transfer — FV 1/01/2025',
  kind: 'income',
  price: 1230,
  currency: 'PLN',
  invoice_id: 789,
  paid: true,
  paid_date: '2025-03-10',
})
```

---

## Categories

```ts
const categories = await fk.categories.list()

const cat = await fk.categories.create({ name: 'Software' })
await fk.categories.update(cat.id, { name: 'Software & SaaS' })
await fk.categories.delete(cat.id)
```

---

## Error Handling

All API errors are thrown as `FakturowniaError` with a `status` (HTTP status code) and `body` (raw API response).

```ts
import { Fakturownia, FakturowniaError } from 'fakturownia'

const fk = new Fakturownia('your-token', 'yoursubdomain')

try {
  const invoice = await fk.invoices.get(99999)
} catch (err) {
  if (err instanceof FakturowniaError) {
    console.error('Status:', err.status)   // 404
    console.error('Body:', err.body)       // raw API response
    console.error('Message:', err.message) // human-readable
  }
}
```

## Requirements

- Node.js 18+
- TypeScript 5+ (for consumers using types)

## License

MIT