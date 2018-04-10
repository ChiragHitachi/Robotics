import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
		setItem: (key: string, value: any) => void;
		getItem: (key: string) => any;
		clearItem: (key: string) => void;
		clearStorage: () => void;

		constructor() {
				const vm = this;

				vm.setItem = (key: string, value: any) => {
						localStorage.setItem(key, JSON.stringify(value));
				};

				vm.getItem = (key: string) => {
					const item = localStorage.getItem(key);
						return item ? JSON.parse(item) : '';
				};

				vm.clearItem = (key: string) => {
						localStorage.removeItem(key);
				};

				/**
         * Clean-Up localStorage.  Can be done during log-out
         */
				vm.clearStorage = () => {
						localStorage.clear();
				};
		}
}
