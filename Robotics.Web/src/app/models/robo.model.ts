export interface IRobo {
    name: string;
    color: string;
    direction: string;
    updatedBy?: string;
    updatedOn?: Date;
}

export interface IRoboMovement {
    robo: IRobo;
    movement: IDistance[];
}

export interface IDistance {
    x: number;
    y: number;
}
export interface IMovement {
    robo: IRobo;
    movement: number;
}
