import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { API_CONFIG } from '../../config/api-config';

@Component({
selector: 'app-update-lesson-date',
standalone: true,
templateUrl: './update-lesson-date.component.html',
styleUrls: ['./update-lesson-date.component.css'],
imports: [CommonModule, FormsModule, RouterModule]
})
export class UpdateLessonDateComponent {
lessonId: string = '';
date: string = '';
apiUrl = `${API_CONFIG.baseUrl}/lessons`;

constructor(private http: HttpClient, private router: Router) {}

  updateLessonDate(): void {
    if (!this.lessonId) {
      alert('Musisz podać ID lekcji.');
      return;
    }
    if (!this.date) {
      alert('Musisz podać nową datę lekcji.');
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Brak tokena! Użytkownik nie jest zalogowany.');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = { date: this.date };

    this.http.patch(`${this.apiUrl}/${this.lessonId}`, body, { headers }).subscribe({
      next: () => {
        alert('Data lekcji została pomyślnie zaktualizowana.');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Błąd podczas aktualizacji daty lekcji:', err);
        alert('Wystąpił błąd podczas aktualizacji daty lekcji.');
      }
    });
  }

  goToDashboard(): void {
    this.router.navigate(['/']);
  }
}
