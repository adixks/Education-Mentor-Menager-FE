import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
selector: 'app-register-choice',
standalone: true,
templateUrl: './register-choice.component.html',
styleUrls: ['./register-choice.component.css'],
imports: [CommonModule]
})
export class RegisterChoiceComponent {
constructor(private router: Router) {}

  registerAsStudent(): void {
    this.router.navigate(['/add-student']);
  }

  registerAsTeacher(): void {
    alert('✅ Rejestracja jako nauczyciel wymaga weryfikacji umiejętności.');
    this.router.navigate(['/add-teacher']);
  }

  goToDashboard(): void {
    this.router.navigate(['/']);
  }
}
