import type IVideos from "./Videos";
import type IStatus from "./Status";
import type IPlayer from "./Player";
import type ITimes from "./Times";
import type ISystem from "./System";
import type IValues2 from "./Values2";

export default interface IRun2 {
    id: string;
    weblink: string;
    game: string;
    level: string;
    category: string;
    videos: IVideos;
    comment: string;
    status: IStatus;
    players: IPlayer[];
    date: string;
    submitted: Date;
    times: ITimes;
    system: ISystem;
    splits?: any;
    values: IValues2;
}