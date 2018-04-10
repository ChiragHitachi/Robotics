export interface IRobo {
    name: string;
    color: string;
    updatedBy?: string;
    updatedOn?: Date;
}

export interface IRoboMovement {
    robo: IRobo;
    movement: IMovement[];
}

export interface IMovement {
    x: number;
    y: number;
}
