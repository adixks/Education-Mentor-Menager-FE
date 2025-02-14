import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { API_CONFIG } from '../../config/api-config';

@Component({
selector: 'app-delete-lesson',
standalone: true,
templateUrl: './delete-lesson.component.html',
styleUrls: ['./delete-lesson.component.css'],
imports: [CommonModule, FormsModule, RouterModule]
})
export class DeleteLessonComponent {
lessonId: string = '';
apiUrl = '${API_CONFIG.baseUrl}/lessons';

constructor(private http: HttpClient, private router: Router) {}

  deleteLesson(): void {
    if (!this.lessonId) {
      alert('⛔ Musisz podać ID lekcji.');
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('⛔ Brak tokena! Użytkownik nie jest zalogowany.');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.delete(`${this.apiUrl}/${this.lessonId}`, { headers }).subscribe({
      next: () => {
        alert('✅ Lekcja została pomyślnie usunięta.');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('❌ Błąd podczas usuwania lekcji:', err);
        alert('❌ Wystąpił błąd podczas usuwania lekcji.');
      }
    });
  }

  goToDashboard(): void {
    this.router.navigate(['/']);
  }
}
