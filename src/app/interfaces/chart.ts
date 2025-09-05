export interface Chart {
    datetimeLastPrice: string;
    datetimeLastPriceTs: number;
    lastPrice: number;
    highPrice: number;
    lowPrice: number;
    openPrice: number;
    closePrice: number;
    volume: number;
    volumeMoney: number;
    performanceRelative: number;
    performanceAbsolute: number;
    tend: string
}