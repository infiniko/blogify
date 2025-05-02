import { Routes } from '@angular/router';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CallbackPageComponent } from './pages/callback-page/callback-page.component';
import { LoginComponent } from './pages/login/login.component';
import { ArticleEditorComponent } from './pages/article/article-editor/article-editor.component';

export const routes: Routes = [
    {
        path: 'signup',
        component: SignUpComponent
    },
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'callback',
        component: CallbackPageComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'article/new',
        component: ArticleEditorComponent
    },
];
