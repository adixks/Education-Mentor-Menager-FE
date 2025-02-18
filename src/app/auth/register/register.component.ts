import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { API_CONFIG } from '../../config/api-config';

@Component({
selector: 'app-register',
standalone: true,
templateUrl: './register.component.html',
styleUrls: ['./register.component.css'],
imports: [FormsModule, CommonModule, HttpClientModule]
})
export class RegisterComponent {
firstName = '';
lastName = '';
language = '';
teacherId: number | null = null;
role = '';

constructor(private http: HttpClient, private router: Router) {}

  register(): void {
    if (!this.firstName || !this.lastName || !this.language || !this.role) {
      alert('⛔ Wszystkie pola są wymagane!');
      return;
    }

    if (this.role === 'TEACHER') {
      alert('✅ Rejestracja jako nauczyciel wymaga weryfikacji umiejętności.');
    }

    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      language: this.language,
      teacherId: this.role === 'STUDENT' ? this.teacherId : null,
      role: this.role
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post<any>(`${API_CONFIG.baseUrl}/auth/register`, user, { headers }).subscribe({
      next: (response) => {
        if (response.token && response.role) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userRole', response.role);
          console.log('✅ Rejestracja zakończona sukcesem! Rola:', response.role);
          alert('✅ Rejestracja zakończona sukcesem! Możesz się teraz zalogować.');
          this.router.navigate(['/']);
        } else {
          alert('⛔ Rejestracja się nie powiodła.');
        }
      },
      error: (err) => {
        console.error('❌ Błąd rejestracji:', err);
        alert('⛔ Nie udało się zarejestrować użytkownika.');
      }
    });
  }

  goToDashboard(): void {
    this.router.navigate(['/']);
  }
}
