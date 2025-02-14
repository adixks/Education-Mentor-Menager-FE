import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { API_CONFIG } from '../../config/api-config';

@Component({
selector: 'app-update-lesson',
standalone: true,
templateUrl: './update-lesson.component.html',
styleUrls: ['./update-lesson.component.css'],
imports: [CommonModule, FormsModule, RouterModule]
})
export class UpdateLessonComponent {
lessonId: string = '';
studentId: string = '';
teacherId: string = '';
date: string = '';
apiUrl = '${API_CONFIG.baseUrl}/lessons';

constructor(private http: HttpClient, private router: Router) {}

  updateLesson(): void {
    if (!this.isValidForm()) {
      console.error('⛔ Formularz zawiera błędy!');
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

    const lesson = {
      studentId: parseInt(this.studentId, 10),
      teacherId: parseInt(this.teacherId, 10),
      date: this.date
    };

    this.http.put(`${this.apiUrl}/${this.lessonId}`, lesson, { headers }).subscribe({
      next: () => {
        alert('✅ Lekcja została zaktualizowana pomyślnie!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('❌ Błąd podczas aktualizacji lekcji:', err);
        alert('❌ Nie udało się zaktualizować lekcji.');
      }
    });
  }

  isValidForm(): boolean {
    if (!this.lessonId || !this.studentId || !this.teacherId || !this.date) {
      alert('⛔ Wszystkie pola muszą być wypełnione.');
      return false;
    }
    return true;
  }

  goToDashboard(): void {
    this.router.navigate(['/']);
  }
}
