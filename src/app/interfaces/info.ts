export interface Info {
    name: string;
    shortName: string;
    countryName: string;
    codeInstrument: string;
    marketName?: string;
    currencyName?: string;
    currencySymbol?: string;
    hourOpen?: string;
    hourClose?: string;
    trading?: boolean;
    exchangeRate?: number;
}