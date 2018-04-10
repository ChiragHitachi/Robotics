import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IResponse, IAPIResponse, IAppConfig } from '../models/common.models';
import { responseStatus } from '../models/enums';
import { CommonService } from './common.service';

@Injectable()
export class WebRequest {
	patch: <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => Observable<IResponse<T>>;
	get: <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => Observable<IResponse<T>>;
	post: <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => Observable<IResponse<T>>;
	put: <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => Observable<IResponse<T>>;

	constructor(private http: HttpClient, private commonService: CommonService) {
		const vm = this;

		vm.get = <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => {
			const options = vm.getRequestOption('get', url, data, header ? header : vm.commonService.getRequestHeader());
			return vm.http.get(url, options).map((response: IAPIResponse<T>) => {
				const result = vm.handleAPIResponse<T>(response, url);
				return result;
			},
			).catch((error: any) => {
				return vm.handleError<T>(error.status, url);
			});
		};

		vm.post = <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => {
			const options = vm.getRequestOption('post', url, data, header ? header : vm.commonService.getRequestHeader());

			return vm.http.post(url, data, options).map((response: IAPIResponse<T>) => {
				const result = vm.handleAPIResponse<T>(response, url);
				return result;
			},
			).catch((error: any) => {
				return vm.handleError<T>(error.status, url);
			});
		};

		vm.put = <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => {
			const options = vm.getRequestOption('put', url, data, header ? header : vm.commonService.getRequestHeader());
			return vm.http.put(url, data, options).map((response: IAPIResponse<T>) => {
				const result = vm.handleAPIResponse<T>(response, url);
				return result;
			},
			).catch((error: any) => {
				return vm.handleError<T>(error.status, url);
			});
		};

		vm.patch = <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => {
			const options = vm.getRequestOption('patch', url, data, header ? header : vm.commonService.getRequestHeader());

			return vm.http.patch(url, options).map((response: IAPIResponse<T>) => {
				const result = vm.handleAPIResponse<T>(response, url);
				return result;
			},
			).catch((error: any) => {
				return vm.handleError<T>(error.status, url);
			});
		};
	}
	private genParams(params: object, httpParams = new HttpParams()): object {
		Object.keys(params)
			.filter(key => {
				const v = params[key];
				return (Array.isArray(v) || typeof v === 'string') ?
					(v.length > 0) :
					(v !== null && v !== undefined);
			})
			.forEach(key => {
				httpParams = httpParams.set(key, params[key]);
			});
		return { params: httpParams };
	}
	private getRequestOption(method: any, url: string, data?: any, header?: any) {

		const httpParams = new HttpParams();
		const options = {
			headers: header,
			responseType: 'json',
			params: httpParams
		};
		const opts = Object.assign({}, options, method === 'get' && data ? this.genParams(data, options.params):null);
		return opts;
	}

	private handleAPIResponse<T>(apiResponse: IAPIResponse<any>, url: string) {
		const result: IResponse<T> = {
			apiUrl: url,
			data: null,
			messageKey: '',
			status: responseStatus.Success
		};
		result.messageKey = apiResponse.code;
		if (apiResponse.code === '000') {
			result.data = apiResponse.data;
		} else if (apiResponse.code === '005') {
			result.status = responseStatus.Timeout;
		} else {
			result.status = responseStatus.APIError;
		}

		return result;
	}

	private handleError<T>(status: any, url: string) {
		const result: IResponse<T> = {
			apiUrl: url,
			data: null,
			messageKey: 'DefaultError',
			status: responseStatus.Failure
		};

		if (status === 500) {
			result.status = responseStatus.Failure;
		} else if (status === 401 || status === 403) {
			result.status = responseStatus.NotAuthorized;
			result.messageKey = 'NotAuthorized';
		} else if (status === 404 || status === 503) {
			result.status = responseStatus.ApiNotAvailable;
		}

		// log the error
		return Observable.throw(result);
	}
}
