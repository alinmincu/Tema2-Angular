import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'lazy',
        loadChildren: () => import('./lazy-loaded/lazy-loaded.module').then(m => m.LazyLoadedModule)
    },
    { path: '', redirectTo: '/lazy', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
