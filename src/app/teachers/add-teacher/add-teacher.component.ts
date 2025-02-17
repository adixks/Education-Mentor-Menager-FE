import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { API_CONFIG } from '../../config/api-config';

@Component({
selector: 'app-add-teacher',
templateUrl: './add-teacher.component.html',
styleUrls: ['./add-teacher.component.css'],
standalone: true,
imports: [CommonModule, RouterModule, FormsModule]
})
export class AddTeacherComponent {
firstName: string = '';
lastName: string = '';
password: string = '';
languages: string = '';
apiUrl = `${API_CONFIG.baseUrl}/teachers`;

constructor(private http: HttpClient, private router: Router) {}

  addTeacher(): void {
    if (!this.isValidForm()) {
      console.error('⛔ Formularz zawiera błędy!');
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const teacher = {
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password,
      languages: this.languages ? this.languages.split(',').map(lang => lang.trim()) : [] // ❗ Sprawdzenie czy istnieją języki
    };

    this.http.post(`${this.apiUrl}`, teacher, { headers }).subscribe({
      next: () => {
        alert('✅ Nauczyciel został dodany pomyślnie! Możesz się teraz zalogować.');
        this.router.navigate(['/login']); // ❗ Przekierowanie na logowanie po rejestracji
      },
      error: (err) => {
        console.error('❌ Błąd podczas dodawania nauczyciela:', err);
        alert('❌ Nie udało się dodać nauczyciela.');
      }
    });
  }

  isValidForm(): boolean {
    if (this.firstName.length < 2) {
      alert('⛔ Imię musi mieć co najmniej 2 znaki.');
      return false;
    }
    if (this.lastName.length < 2) {
      alert('⛔ Nazwisko musi mieć co najmniej 2 znaki.');
      return false;
    }
    if (this.password.length < 6) {
      alert('⛔ Hasło musi mieć co najmniej 6 znaków.');
      return false;
    }
    return true;
  }

  goToDashboard(): void {
    this.router.navigate(['/']);
  }
}
