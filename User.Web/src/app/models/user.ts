export interface ILogin{
    userName: string;
    password: string;
}

export interface IRegister extends ILogin {
    confirmPassword: string;
}
