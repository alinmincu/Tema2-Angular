import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-edit',
  standalone: true,
  imports: [CommonModule, NzTableModule, NzButtonModule, NzIconModule, NzPaginationModule, ReactiveFormsModule],
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.css']
})
export class ModalEditComponent {
  pageSize: number = 10;
  pageIndex: number = 1;
  listOfData: Array<{ name: string; character: string; birthDate: string }> = [
    { name: 'Item 1', character: 'Description 1', birthDate: '2023-01-01' },
    { name: 'Item 2', character: 'Description 2', birthDate: '2023-01-02' },
    { name: 'Item 3', character: 'Description 3', birthDate: '2023-01-03' }
  ];

  addForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addForm = this.fb.group({
      name: [''],
      character: [''],
      date: ['']
    });
  }

  addItem(): void {
    const newItem = { name: 'New Item', character: 'New Character', birthDate: new Date().toISOString().split('T')[0] };
    this.listOfData = [...this.listOfData, newItem];
  }

  editItem(item: { name: string; character: string; birthDate: string }): void {
    console.log('Editing item:', item);
  }
}
