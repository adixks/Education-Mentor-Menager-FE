import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { API_CONFIG } from '../config/api-config';

interface Student {
firstName: string;
lastName: string;
language: string;
teacherId?: number; // ❗ Zmieniono na opcjonalne pole
password: string;
}

@Component({
selector: 'app-add-student',
templateUrl: './add-student.component.html',
styleUrls: ['./add-student.component.css'],
standalone: true,
imports: [CommonModule, FormsModule, HttpClientModule]
})
export class AddStudentComponent {
student: Student = {
firstName: '',
lastName: '',
language: '',
teacherId: undefined, // ❗ Teraz opcjonalne
password: ''
};

responseMessage: string = '';
apiUrl = '${API_CONFIG.baseUrl}/students';

constructor(private http: HttpClient, private router: Router) {}

  addStudent(): void {
    // ✅ WALIDACJA DANYCH FORMULARZA
    if (!this.student.firstName.trim() || !this.student.lastName.trim() || !this.student.language.trim() || !this.student.password.trim()) {
      alert('⛔ Wprowadź poprawne dane studenta!');
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // ✅ WYSYŁANIE ŻĄDANIA BEZ TOKENA
    this.http.post<Student>(this.apiUrl, this.student, { headers }).subscribe({
      next: (data) => {
        console.log('✅ Student dodany:', data);
        this.responseMessage = `✅ Student ${data.firstName} ${data.lastName} został dodany!`;

        alert('✅ Rejestracja zakończona sukcesem! Możesz się teraz zalogować.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('❌ Błąd dodawania studenta:', err);
        alert('❌ Nie udało się dodać studenta.');
      }
    });
  }

  goToDashboard(): void {
    this.router.navigate(['/']);
  }
}
