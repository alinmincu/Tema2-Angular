import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalAddComponent } from './modal-add/modal-add.component';
import { ModalEditComponent } from './modal-edit/modal-edit.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        NzButtonModule,
        NzTableModule,
        NzModalModule,
        FormsModule,
        ReactiveFormsModule,
        ModalAddComponent,
        ModalEditComponent,
        RouterModule.forChild(routes)
    ],
    exports: []
})
export class LazyLoadedModule { }
