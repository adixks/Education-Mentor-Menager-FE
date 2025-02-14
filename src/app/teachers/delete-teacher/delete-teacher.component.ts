import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { API_CONFIG } from '../../config/api-config';

@Component({
selector: 'app-delete-teacher',
standalone: true,
templateUrl: './delete-teacher.component.html',
styleUrls: ['./delete-teacher.component.css'],
imports: [CommonModule, FormsModule, RouterModule]
})
export class DeleteTeacherComponent {
teacherId: string = '';
message: string | null = null;
apiUrl = `${API_CONFIG.baseUrl}/teachers';

constructor(private http: HttpClient, private router: Router) {}

  deleteTeacher(): void {
    if (!this.teacherId) {
      this.message = '⛔ Musisz podać ID nauczyciela.';
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      this.message = '⛔ Brak tokena! Użytkownik nie jest zalogowany.';
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.delete(`${this.apiUrl}/${this.teacherId}`, { headers }).subscribe({
      next: () => {
        this.message = '✅ Nauczyciel został pomyślnie usunięty.';
      },
      error: (err) => {
        console.error('❌ Błąd podczas usuwania nauczyciela:', err);
        this.message = '❌ Wystąpił błąd podczas usuwania nauczyciela.';
      }
    });
  }

  goToDashboard(): void {
    this.router.navigate(['/']);
  }
}
