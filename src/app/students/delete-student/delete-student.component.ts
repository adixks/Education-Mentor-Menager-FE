import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { API_CONFIG } from '../../config/api-config';

@Component({
selector: 'app-delete-student',
templateUrl: './delete-student.component.html',
styleUrls: ['./delete-student.component.css'],
standalone: true,
imports: [CommonModule, FormsModule, HttpClientModule]
})
export class DeleteStudentComponent {
studentId: number = 0;
responseMessage: string = '';
apiUrl = `${API_CONFIG.baseUrl}/students`;

constructor(private http: HttpClient, private router: Router) {}

  deleteStudent(): void {
    if (this.studentId <= 0) {
      alert('⛔ Wprowadź poprawne ID studenta!');
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('⛔ Brak tokena! Użytkownik nie jest zalogowany.');
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.delete(`${this.apiUrl}/${this.studentId}`, { headers }).subscribe({
      next: () => {
        console.log('✅ Student usunięty.');
        this.responseMessage = `✅ Student o ID ${this.studentId} został usunięty!`;
        this.studentId = 0;
      },
      error: (err) => {
        console.error('❌ Błąd usuwania studenta:', err);
        alert('❌ Nie udało się usunąć studenta. Sprawdź ID i spróbuj ponownie.');
      }
    });
  }

  goToDashboard(): void {
    this.router.navigate(['/']);
  }
}
