import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { API_CONFIG } from '../config/api-config';

interface Lesson {
studentId: number;
teacherId: number;
date: string;
}

@Component({
selector: 'app-get-lesson-by-id',
templateUrl: './get-lesson-by-id.component.html',
styleUrls: ['./get-lesson-by-id.component.css'],
standalone: true,
imports: [CommonModule, RouterModule, FormsModule]
})
export class GetLessonByIdComponent {
lesson: Lesson | null = null;
lessonId: string = '';
apiUrl = '${API_CONFIG.baseUrl}/lessons';

constructor(private http: HttpClient, private router: Router) {}

  fetchLesson(): void {
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

    this.http.get<Lesson>(`${this.apiUrl}/${this.lessonId}`, { headers }).subscribe({
      next: (data) => {
        console.log('✅ Otrzymane dane lekcji:', data);
        this.lesson = data;
      },
      error: (err) => {
        console.error('❌ Błąd pobierania lekcji:', err);
        alert('❌ Nie udało się pobrać lekcji.');
        this.lesson = null;
      }
    });
  }

  goToDashboard(): void {
    this.router.navigate(['/']);
  }
}
