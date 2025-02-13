import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
selector: 'app-login',
standalone: true,
templateUrl: './login.component.html',
styleUrls: ['./login.component.css'],
imports: [FormsModule, CommonModule, HttpClientModule]
})
export class LoginComponent {
username = '';
password = '';

constructor(private http: HttpClient, private router: Router) {}

  login(): void {
    const credentials = { username: this.username, password: this.password };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    console.log('📨 Wysyłanie żądania logowania...', credentials);

    this.http.post<any>('http://localhost:8080/api/v1/auth/login', credentials, { headers }).subscribe({
      next: (response) => {
        if (response.token && response.role) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userRole', response.role);
          console.log('🔹 Token zapisany w LocalStorage:', response.token);
          console.log('🔹 Rola użytkownika:', response.role);
          this.router.navigate(['/']);
        } else {
          alert('⛔ Błędne dane logowania');
        }
      },
      error: (err) => {
        console.error('❌ Błąd logowania:', err);
        alert('⛔ Błędne dane logowania');
      }
    });
  }

  goToRegister(): void {
    this.router.navigate(['/register-choice']);
  }
}
