import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admissions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admissions.html',
  styleUrl: './admissions.css',
})
export class AdmissionsComponent {
  admissionForm: FormGroup;
  submitted = false;
  success = false;

  constructor(private fb: FormBuilder) {
    this.admissionForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      dob: ['', Validators.required],
      education: ['', Validators.required],
      statement: ['', [Validators.required, Validators.minLength(50)]]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.admissionForm.valid) {
      console.log('Form Submitted', this.admissionForm.value);
      this.success = true;
      this.admissionForm.reset();
      this.submitted = false;
    }
  }
}
