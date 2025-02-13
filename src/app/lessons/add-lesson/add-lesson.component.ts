import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { API_CONFIG } from '../config/api-config';

@Component({
selector: 'app-add-lesson',
standalone: true,
templateUrl: './add-lesson.component.html',
styleUrls: ['./add-lesson.component.css'],
imports: [CommonModule, FormsModule, RouterModule]
})
export class AddLessonComponent {
studentId: string = '';
teacherId: string = '';
date: string = '';
apiUrl = '${API_CONFIG.baseUrl}/lessons';

constructor(private http: HttpClient, private router: Router) {}

  addLesson(): void {
    if (!this.isValidForm()) {
      alert('⛔ Formularz zawiera błędy!');
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
      studentId: parseInt(this.studentId),
      teacherId: parseInt(this.teacherId),
      date: this.date
    };

    this.http.post(this.apiUrl, lesson, { headers }).subscribe({
      next: () => {
        alert('✅ Lekcja została pomyślnie dodana!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('❌ Błąd podczas dodawania lekcji:', err);
        alert('❌ Wystąpił błąd podczas dodawania lekcji.');
      }
    });
  }

  isValidForm(): boolean {
    if (!this.studentId || isNaN(Number(this.studentId))) {
      alert('Musisz podać poprawne ID ucznia.');
      return false;
    }
    if (!this.teacherId || isNaN(Number(this.teacherId))) {
      alert('Musisz podać poprawne ID nauczyciela.');
      return false;
    }
    if (!this.date) {
      alert('Musisz podać datę lekcji.');
      return false;
    }
    return true;
  }

  goToDashboard(): void {
    this.router.navigate(['/']);
  }
}
