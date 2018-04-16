import { color, direction } from "./enums";

export interface IRobo {
    name: string;
    color: color;
    direction: direction;
    updatedBy?: string;
    updatedOn?: Date;
}

export interface IRoboMovement {
    robo: IRobo;
    movement: IDistance[];
    total: number;
}

export interface IDistance {
    x: number;
    y: number;
}
export interface IMovement {
    robo: IRobo;
    movement: number;
}

export interface ISeries {
    name: string;
    data: number[];
    color: string;
}

export interface IDisplayDistance {
    option: string;
    distance: number;
}