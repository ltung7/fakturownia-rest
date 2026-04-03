// ─── Config ───────────────────────────────────────────────────────────────────

export interface FakturowniaConfig {
    /** API token from Fakturownia settings */
    token: string
    /** Subdomain, e.g. "mycompany" from mycompany.fakturownia.pl. Defaults to "app" */
    domain?: string
}

// ─── Shared ───────────────────────────────────────────────────────────────────

export interface ListParams {
    page?: number
    per_page?: number
    period?: "last_12_months" | "this_month" | "last_30_days" | "last_month" | "this_year" | "last_year" | "all";
    date_from?: string
    date_to?: string
    client_id?: number
    include_positions?: boolean;
    income?: 'yes' | 'no'
    invoice_ids?: number | string;
    number?: string;
    kind?: string;
    kinds?: string[];
    search_date_type?: "issue_date" | "paid_date" | "transaction_date"
    order?: "number" | "updated_at" | "price_net" | "price_gross" | "price_tax" | "issue_date" | "payment_to" | "paid_date" | "transaction_date" | "buyer_name" | "buyer_tax_no" | "seller_name" | "oid" | "number.desc" | "updated_at.desc" | "price_net.desc" | "price_gross.desc" | "price_tax.desc" | "issue_date.desc" | "payment_to.desc" | "paid_date.desc" | "transaction_date.desc" | "buyer_name.desc" | "buyer_tax_no.desc" | "seller_name.desc" | "oid.desc"
}

export interface ApiResponse<T> {
    data: T
    status: number
}

// ─── Invoices ─────────────────────────────────────────────────────────────────

export type InvoiceKind =
    | 'vat'
    | 'proforma'
    | 'receipt'
    | 'advance'
    | 'final'
    | 'correction'
    | 'vat_mp'
    | 'kp'
    | 'kw'
    | 'estimate'

export type InvoiceStatus = 'issued' | 'sent' | 'paid' | 'partial' | 'rejected'

export type PaymentType =
    | 'transfer'
    | 'card'
    | 'cash'
    | 'barter'
    | 'cheque'
    | 'off'
    | 'online'
    | ""

export interface InvoicePosition {
    name: string
    description?: string
    quantity: number
    quantity_unit?: string
    tax?: number | string
    total_price_gross?: number
    code?: string
    _destroy?: true
}

export interface InvoiceBankAccount {
    bank_name: string
    bank_account_number: string
    bank_currency: string
    bank_swift: string
    formatted_bank_account_number: string
    name: string
    id: number
}

export interface Invoice {
    accounting_income_tax_date: string | null
    accounting_kind: string | null
    accounting_other_tax_date: string | null
    accounting_scheme: string | null
    accounting_status: string | null
    accounting_vat_tax_date: string | null
    additional_info: boolean
    additional_info_desc: string | null
    additional_invoice_field: string | null
    app: string | null
    approval_status: string | null
    attachments_count: number
    bank_accounts: InvoiceBankAccount[]
    buyer_bank: string | null
    buyer_bank_account: string | null
    buyer_city: string | null
    buyer_company: boolean
    buyer_country: string | null
    buyer_email: string | null
    buyer_fax: string | null
    buyer_first_name: string | null
    buyer_last_name: string | null
    buyer_mass_payment_code: string | null
    buyer_mobile_phone: string | null
    buyer_name: string
    buyer_note: string | null
    buyer_person: string
    buyer_phone: string | null
    buyer_post_code: string | null
    buyer_street: string | null
    buyer_tax_no: string | null
    buyer_tax_no_kind: string | null
    buyer_www: string | null
    calculating_strategy: {
        invoice_form_price_kind: "net" | "gross"
        position: string
        sum: string
    }
    cancelled: boolean
    category_id: string | null
    client_id: number
    correction: string | null
    created_at: string
    currency: string
    delivery_address: string | null
    delivery_date: string
    department_id: number
    description: string | null
    description_footer: string | null
    description_long: string | null
    discount: string
    discount_kind: string | null
    discount_net: string
    email_status: string | null
    exchange_currency: string | null
    exchange_currency_rate: string | null
    exchange_currency_rate_den: string
    exchange_date: string | null
    exchange_difference: string
    exchange_kind: string
    exchange_note: null | string
    exchange_rate: string
    exchange_rate_den: string
    exclude_from_accounting: boolean
    exclude_from_stock_level: boolean
    fiscal_status: string | null
    from_api: boolean
    from_invoice_id: string | null
    get_tax2_name: string
    get_tax_name: string
    gov_id: string | null
    gov_kind: string | null
    gov_status: string | null
    gtu_codes: string[]
    has_attachments: boolean
    id: number
    income: boolean
    internal_note: string | null
    invoice_for_receipt_id: string | null
    invoice_id: string | null
    invoice_template_id: number
    issue_date: string | null
    issue_year: number
    issuer: string | null
    issued_to_receipt: boolean
    kind: InvoiceKind
    kind_text: string
    lang: string | null
    na_tax_kind: string | null
    normalized_number: string | null
    not_cost: boolean
    number: string
    oid: string | null
    "overdue?": boolean
    paid: string
    paid_date: string | null
    payment_status: string
    payment_to: string
    payment_to_kind: string | null
    payment_type: PaymentType | string | null
    payment_url: string | null
    pattern: string
    pattern_nr: number | null
    pattern_nr_d: string | null
    pattern_nr_m: number | null
    place: string | null
    price_gross: string
    price_net: string
    price_tax: string
    print_time: string | null
    procedure_designations: string[]
    product_cache: string
    product_id: number | null
    products_margin: string | null
    receipt_for_invoice_id: string | null
    recipient_city: string | null
    recipient_company: string | null
    recipient_country: string | null
    recipient_email: string | null
    recipient_first_name: string | null
    recipient_id: string | null
    recipient_last_name: string | null
    recipient_name: string | null
    recipient_note: string | null
    recipient_phone: string | null
    recipient_post_code: string | null
    recipient_street: string | null
    recipient_tax_no: string | null
    recurring_id: string | null
    reverse_charge: boolean
    sales_code: string
    sell_date: string | null
    sell_date_kind: string | null
    seller_bank: string | null
    seller_bank_account: string | null
    seller_bank_account_id: string | null
    seller_city: string | null
    seller_country: string
    seller_email: string
    seller_fax: string
    seller_name: string
    seller_person: string | null
    seller_phone: string
    seller_post_code: string | null
    seller_street: string | null
    seller_tax_no: string | null
    seller_tax_no_kind: string | null
    seller_www: string
    sent_time: string | null
    show_attachments: boolean
    show_discount: boolean
    split_payment: string | null
    status: InvoiceStatus
    tax2_visible: string | null
    tax_name_type: string
    "tax_visible?": boolean
    test: boolean
    token: string | null
    transaction_date: string | null
    updated_at: string
    use_delivery_address: boolean
    use_issuer: boolean
    use_moss: boolean
    user_id: number
    view_url: string | null
    warehouse_document_id: string | null
    warehouse_id: number | null

    positions?: InvoicePosition[]
}

export interface CreateInvoicePayload {
    kind?: InvoiceKind
    number?: string
    currency?: string
    exchange_currency?: string;
    lang?: string
    payment_type?: PaymentType
    issue_date: string;
    sell_date?: string;
    from_invoice_id?: number;
    income?: "0"

    buyer_name: string
    buyer_tax_no?: string
    buyer_email?: string
    buyer_phone?: string
    buyer_street?: string
    buyer_city?: string
    buyer_post_code?: string
    buyer_country?: string
    buyer_company?: false,
    buyer_first_name?: string,
    buyer_last_name?: string,

    seller_bank?: string
    seller_bank_account?: string
    seller_bank_account_id?: string
    seller_city?: string
    seller_country?: string
    seller_email?: string
    seller_fax?: string
    seller_name?: string
    seller_person?: string
    seller_phone?: string
    seller_post_code?: string
    seller_street?: string
    seller_tax_no?: string
    seller_tax_no_kind?: string
    seller_www?: string

    client_id?: number
    department_id?: number
    correction_reason?: string;
    exclude_from_stock_level?: boolean;
    additional_params?: string;
    
    sale_date?: string
    payment_to?: string
    payment_to_kind?: string | number
    positions: InvoicePosition[]

    description?: string

    // create only?
    copy_invoice_from?: number
    advance_creation_mode?: "percent" | "amount",
    advance_value?: string,
    position_name?: string
    invoice_ids?: number[]

    // Invoice metadata
    place?: string;
    category_id?: number;
    accounting_kind?: "purchases" | "expenses" | "media" | "salary" | "incident" | "fuel0" | "fuel_expl75" | "fuel_expl100" | "fixed_assets" | "fixed_assets50" | "no_vat_deduction";
    status?: InvoiceStatus;
    paid?: string;
    paid_date?: string;
    oid?: string;
    oid_unique?: "yes" | string;
    warehouse_id?: number;
    invoice_id?: number;
    delivery_date?: string;

    // Seller extras
    seller_bdo_no?: string;
    seller_jst?: "0" | "1";
    seller_gv?: "0" | "1";
    use_invoice_issuer?: "0" | "1";
    invoice_issuer?: string;

    // Buyer extras
    buyer_tax_no_kind?: string;
    buyer_note?: string;
    buyer_jst?: "0" | "1";
    buyer_gv?: "0" | "1";
    buyer_person?: string;
    disable_tax_no_validation?: string;

    recipient_id?: number;
    recipient_name?: string;
    recipient_street?: string;
    recipient_post_code?: string;
    recipient_city?: string;
    recipient_country?: string;
    recipient_email?: string;
    recipient_phone?: string;
    recipient_note?: string;

    // Display/formatting
    additional_info?: "0" | "1";
    additional_info_desc?: string;
    show_discount?: "0" | "1";
    invoice_template_id?: number;
    description_footer?: string;
    description_long?: string;
    internal_note?: string;
    additional_invoice_field?: string;

    // Currency/exchange
    exchange_kind?: "ecb" | "nbp" | "cbr" | "nbu" | "nbg" | "own";
    exchange_currency_rate?: string;
    exchange_note?: string;

    // Tax & accounting
    split_payment?: "0" | "1";
    use_oss?: "0" | "1";
    accounting_vat_tax_date?: string;
    accounting_income_tax_date?: string;
    exempt_tax_kind?: string;
    np_tax_kind?: string;
    reverse_charge?: boolean;
    accounting_note_kind?: "credit" | "debit";
    procedure_designations?: string[];
    procedure_vat_margin?: "procedura marży dla biur podróży" | "procedura marży – towary używane" | "procedura marży – dzieła sztuki" | "procedura marży – przedmioty kolekcjonerskie i antyki";
    skonto_active?: "0" | "1";
    skonto_discount_date?: string;
    skonto_discount_value?: string;
    corrected_content_before?: string;
    corrected_content_after?: string;
    calculating_strategy?: {
        position?: "default" | "keep_gross";
        sum?: "sum" | "keep_gross" | "keep_net";
        invoice_form_price_kind?: "net" | "gross";
    };
}

type UpdateInvoicePosition = Partial<InvoicePosition> & {
    id?: number;
};

export type UpdateInvoicePayload = Partial<Omit<CreateInvoicePayload, "positions">> & {
    positions?: UpdateInvoicePosition[];
};

export type InvoiceStatusResponse = {
    id: number
    status: string
    approval_status: string | null
    payment_status: string
    color_kind: string
    colors: Array<string>
    percent_paid: number
    translation: string
    approval_translation: string | null
}


// ─── Products ─────────────────────────────────────────────────────────────────

export interface Product {
    id: number
    name: string
    description?: string
    code?: string
    unit?: string
    price_net: number
    price_gross?: number
    tax: number | string
    currency: string
    quantity?: number
    quantity_unit?: string
    category_id?: number
    warehouse_id?: number
    created_at: string
    updated_at: string
}

export interface CreateProductPayload {
    name: string
    code?: string
    description?: string
    price_net: number
    tax: number | string
    currency?: string
    unit?: string
    quantity?: number
    category_id?: number
    warehouse_id?: number
}

export type UpdateProductPayload = Partial<CreateProductPayload>

// ─── Clients ──────────────────────────────────────────────────────────────────

export interface Client {
    id: number
    name: string
    tax_no?: string
    email?: string
    phone?: string
    street?: string
    city?: string
    post_code?: string
    country?: string
    first_name?: string
    last_name?: string
    bank?: string
    bank_account?: string
    discount?: number
    payment_to_kind?: number
    category_id?: number
    created_at: string
    updated_at: string
}

export interface CreateClientPayload {
    name: string
    tax_no?: string
    email?: string
    phone?: string
    street?: string
    city?: string
    post_code?: string
    country?: string
    first_name?: string
    last_name?: string
    bank?: string
    bank_account?: string
    discount?: number
    payment_to_kind?: number
    category_id?: number
}

export type UpdateClientPayload = Partial<CreateClientPayload>

// ─── Payments ─────────────────────────────────────────────────────────────────

export type PaymentKind = 'income' | 'expense'

export interface Payment {
    id: number
    name: string
    kind: PaymentKind
    price: number
    currency: string
    invoice_id?: number
    paid?: boolean
    paid_date?: string
    bank_account?: string
    description?: string
    created_at: string
    updated_at: string
}

export interface CreatePaymentPayload {
    name: string
    kind?: PaymentKind
    price: number
    currency?: string
    invoice_id?: number
    paid?: boolean
    paid_date?: string
    bank_account?: string
    description?: string
}

export type UpdatePaymentPayload = Partial<CreatePaymentPayload>

// ─── Categories ───────────────────────────────────────────────────────────────

export interface Category {
    id: number
    name: string
    description?: string
    created_at: string
    updated_at: string
}

export interface CreateCategoryPayload {
    name: string
    description?: string
}

export type UpdateCategoryPayload = Partial<CreateCategoryPayload>

// ─── Warehouses ───────────────────────────────────────────────────────────────

export interface Warehouse {
    id: number
    name: string
    description?: string
    created_at: string
    updated_at: string
}

// ─── Departments ──────────────────────────────────────────────────────────────

export interface Department {
    id: number
    name: string
    shortcut?: string
    tax_no?: string
    bank?: string
    bank_account?: string
    city?: string
    street?: string
    post_code?: string
    created_at: string
    updated_at: string
}