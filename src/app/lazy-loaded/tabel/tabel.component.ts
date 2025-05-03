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

  listOfData = [
    { id: 1, name: 'Sebastian Stan', character: 'Winter Soldier', birthDate: '1982-08-13' },
    { id: 2, name: 'Tom Hiddleston', character: 'Loki', birthDate: '1981-02-09' },
    { id: 3, name: 'Anthony Mackie', character: 'Falcon', birthDate: '1978-09-23' },
    { id: 4, name: 'Chris Evans', character: 'Captain America', birthDate: '1981-06-13' },
    { id: 5, name: 'Scarlett Johansson', character: 'Black Widow', birthDate: '1984-11-22' },
    { id: 6, name: 'Mark Ruffalo', character: 'Hulk', birthDate: '1967-11-22' },
    { id: 7, name: 'Jeremy Renner', character: 'Hawkeye', birthDate: '1971-01-07' },
    { id: 8, name: 'Tom Holland', character: 'Spider-Man', birthDate: '1996-06-01' },
    { id: 9, name: 'Chris Hemsworth', character: 'Thor', birthDate: '1983-08-11' },
    { id: 10, name: 'Robert Downey Jr.', character: 'Iron Man', birthDate: '1965-04-04' }
  ];

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

  ngOnInit(): void { }

  onPageChange(page: number): void {
    this.pageIndex = page;
    const startIndex = (page - 1) * this.pageSize;
    this.displayedData = this.listOfData.slice(startIndex, startIndex + this.pageSize);
  }

  openAddModal(): void {
    this.modal.create({
      nzTitle: 'Add Item',
      nzContent: this.addFormTemplate,
      nzOnOk: () => {
        if (this.addForm.valid) {
          const newItem = {
            id: this.listOfData.length + 1,
            name: this.addForm.value.name || '',
            character: this.addForm.value.character || '',
            birthDate: this.addForm.value.date || ''
          };
          this.listOfData = [...this.listOfData, newItem];
          this.onPageChange(this.pageIndex);
        }
      }
    });
  }

  openEditModal(data: any): void {
    this.addForm.patchValue({
      name: data.name,
      character: data.character,
      date: data.birthDate
    });

    this.modal.create({
      nzTitle: 'Edit Item',
      nzContent: this.addFormTemplate,
      nzOnOk: () => {
        if (this.addForm.valid) {
          const index = this.listOfData.findIndex(item => item.id === data.id);
          if (index !== -1) {
            this.listOfData[index] = {
              id: data.id,
              name: this.addForm.get('name')?.value,
              character: this.addForm.get('character')?.value,
              birthDate: this.addForm.get('date')?.value
            };
            this.onPageChange(this.pageIndex);
          }
        }
      }
    });
  }

  deleteRow(id: number): void {
    this.listOfData = this.listOfData.filter(item => item.id !== id);
    this.onPageChange(this.pageIndex);
  }
}
