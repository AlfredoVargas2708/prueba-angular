import { Info } from "./info";
import { Chart } from "./chart";
import { Price } from "./price";
import { Constituents } from "./constituents";

export interface Data {
    info: Info;
    constituents?: Constituents[];
    price?: Price;
    chart?: Chart[];
}