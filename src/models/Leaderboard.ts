import type IArea from "./Area";
import type IUsersEntity from "./UserEntity";

export default interface ILeaderboard {
    area: IArea;
    totalCount: number;
    users: IUsersEntity[];
}