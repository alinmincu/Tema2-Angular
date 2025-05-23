import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './modal-add.component.html'
})
export class ModalAddComponent {
  addForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
      character: ['', [Validators.required, Validators.minLength(5)]],
      date: ['', [Validators.required]]
    });
  }

  get formValue() {
    return this.addForm.value;
  }

  resetForm() {
    this.addForm.reset();
  }
}
