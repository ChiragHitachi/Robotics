import { Injectable, Output, EventEmitter, Inject } from '@angular/core';
import { ILoginDetail } from '../models/common.models';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class CommonService{
	public LoginDetail: ILoginDetail = { id: 0, userId: 0, accessToken: '', userName: '', expires: null };

	public getAuthToken = () => {
		if (this.LoginDetail.accessToken.length > 0) {
				return 'Bearer ' + this.LoginDetail.accessToken;
		}
	}

	public getRequestHeader = () => {
		const header = new HttpHeaders();
		header.append('Accept', 'application/json');
		header.append('Content-Type', 'application/json');
		header.append('Cache-Control', 'no-cache');
		header.append('Pragma', 'no-cache');
		if (this.LoginDetail.accessToken.length > 0) {
				header.append('Authorization', this.getAuthToken());
		}
		return header;
	}
}
