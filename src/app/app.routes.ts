import { Routes } from '@angular/router';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CallbackPageComponent } from './pages/callback-page/callback-page.component';
import { LoginComponent } from './pages/login/login.component';
import { ArticleEditorComponent } from './pages/article/article-editor/article-editor.component';
import { ArticleViewPageComponent } from './pages/article/article-view-page/article-view-page.component';
import { UserViewPageComponent } from './pages/user/user-view-page/user-view-page.component';
import { ArticleEditPageComponent } from './pages/article/article-edit-page/article-edit-page.component';
import { EditProfilePageComponent } from './pages/user/edit-profile-page/edit-profile-page.component';

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
    {
        path: 'edit',
        component: EditProfilePageComponent
    },
    {
        path: ':handle',
        component: UserViewPageComponent
    },
    {
        path: ':handle/:idOrSlug',
        component: ArticleViewPageComponent
    },
    {
        path: ':handle/:idOrSlug/edit',
        component: ArticleEditPageComponent
    }

];
