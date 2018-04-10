import { responseStatus, messageType} from '../models/enums';

export interface IEnvironment {
		env: string;
}

export interface User{
	name: string;
	id: number;
	dateOfJoin: Date;
}

export interface IResponse<T> {
		data: T;
		status: responseStatus;
		messageKey?: string;
		apiUrl?: string;
}
export interface IAppConfig {
    isProduction: boolean;
	loginUrl: string;
}
export interface IAPIResponse<T> {
		data?: T;
		code: string;
		message: string;
}

export interface ILoginDetail {
		id: number;
		userId: number;
		userName: string;
		accessToken: string;
		expires: Date;
		loggedinDate?: Date;
		isLoggedIn?: boolean;
}

export interface ILoginUser {
		password: string;
		userName: string;
}

export interface IKeyValue {
		id: number;
		name: string;
}

export interface IKeyData {
		key: string;
		data: any;
}


