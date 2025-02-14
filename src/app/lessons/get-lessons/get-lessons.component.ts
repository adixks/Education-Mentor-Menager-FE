import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { API_CONFIG } from '../../config/api-config';

@Component({
selector: 'app-get-lessons',
standalone: true,
templateUrl: './get-lessons.component.html',
styleUrls: ['./get-lessons.component.css'],
imports: [CommonModule, FormsModule, RouterModule]
})
export class GetLessonsComponent {
lessons: any[] = [];
pageNumber = 0;
totalPages = 1;
apiUrl = `${API_CONFIG.baseUrl}/lessons';

constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getLessons();
  }

  getLessons(): void {
    const token = localStorage.getItem('authToken');

    if (!token) {
      alert('⛔ Brak tokena! Użytkownik nie jest zalogowany.');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any>(`${this.apiUrl}?page=${this.pageNumber}&size=5`, { headers }).subscribe({
      next: (data) => {
        this.lessons = data.content;
        this.totalPages = data.totalPages;
      },
      error: (err) => {
        console.error('❌ Błąd podczas pobierania listy lekcji:', err);
        alert('❌ Nie udało się pobrać listy lekcji.');
      }
    });
  }

  prevPage(): void {
    if (this.pageNumber > 0) {
      this.pageNumber--;
      this.getLessons();
    }
  }

  nextPage(): void {
    if (this.pageNumber < this.totalPages - 1) {
      this.pageNumber++;
      this.getLessons();
    }
  }

  goToDashboard(): void {
    this.router.navigate(['/']);
  }
}
