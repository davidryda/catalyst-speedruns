import type IValues from "./Values";
import type IRun from "./Run";
import type ILink2 from "./Link2";

export interface IData {
    weblink: string;
    game: string;
    category: string;
    level: string;
    platform?: any;
    region?: any;
    emulators?: any;
    "video-only": boolean;
    timing: string;
    values: IValues;
    runs: IRun[];
    links: ILink2[];
}