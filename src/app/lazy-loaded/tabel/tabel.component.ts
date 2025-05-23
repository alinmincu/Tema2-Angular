import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UppercaseDescriptionPipe } from './uppercase-description.pipe';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ModalAddComponent } from '../modal-add/modal-add.component';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';
import tabelData from './tabel-data.json';

@Component({
  selector: 'app-tabel',
  standalone: true,
  imports: [CommonModule, NzTableModule, NzButtonModule, NzPaginationModule, FormsModule, ReactiveFormsModule, UppercaseDescriptionPipe, NzIconModule],
  templateUrl: './tabel.component.html',
  styleUrls: ['./tabel.component.css'],
  providers: [NzModalService]
})
export class TabelComponent implements OnInit {
  @ViewChild('addFormTemplate', { static: true }) addFormTemplate!: TemplateRef<any>;

  listOfData: Array<{ id: number; name: string; character: string; birthDate: string }> = tabelData;
  displayedData = this.listOfData.slice(0, 8);
  addForm: FormGroup;

  pageIndex = 1;
  pageSize = 8;

  constructor(private modal: NzModalService, private fb: FormBuilder) {
    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
      character: ['', [Validators.required, Validators.minLength(5)]],
      date: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.onPageChange(1);
  }

  onPageChange(page: number): void {
    this.pageIndex = page;
    const startIndex = (page - 1) * this.pageSize;
    this.displayedData = this.listOfData.slice(startIndex, startIndex + this.pageSize);
  }

  openAddModal(): void {
    const modalRef = this.modal.create({
      nzTitle: 'Add Item',
      nzContent: ModalAddComponent,
      nzOnOk: () => {
        const instance = modalRef.getContentComponent() as ModalAddComponent;
        if (instance.addForm.valid) {
          const newItem = {
            id: this.listOfData.length + 1,
            name: instance.addForm.value.name || '',
            character: instance.addForm.value.character || '',
            birthDate: instance.addForm.value.date || ''
          };
          this.listOfData = [...this.listOfData, newItem];
          this.onPageChange(this.pageIndex);
          instance.resetForm();
        }
      }
    });
  }

  openEditModal(data: any): void {
    const modalRef = this.modal.create({
      nzTitle: 'Edit Item',
      nzContent: ModalEditComponent,
      nzOnOk: () => {
        const instance = modalRef.getContentComponent() as any;
        if (instance.editForm.valid) {
          const index = this.listOfData.findIndex(item => item.id === data.id);
          if (index !== -1) {
            this.listOfData[index] = {
              id: data.id,
              name: instance.editForm.value.name || '',
              character: instance.editForm.value.character || '',
              birthDate: instance.editForm.value.date || ''
            };
            this.onPageChange(this.pageIndex);
            instance.resetForm();
          }
        }
      }
    });

    setTimeout(() => {
      const instance = modalRef.getContentComponent() as any;
      if (instance && instance.setFormValues) {
        instance.setFormValues(data);
      }
    });
  }

  deleteRow(id: number): void {
    this.listOfData = this.listOfData.filter(item => item.id !== id);
    this.onPageChange(this.pageIndex);
  }
}
