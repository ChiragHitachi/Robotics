import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

export const APP_ROUTING: ModuleWithProviders = RouterModule.forRoot([
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'Register',
        component: RegisterComponent
    },
    {
        path: 'Home',
        component: HomeComponent
    },

]);
