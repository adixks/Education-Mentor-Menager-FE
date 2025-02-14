import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { API_CONFIG } from '../../config/api-config';

interface Teacher {
id: number;
firstName: string;
lastName: string;
languages: string[];
}

@Component({
selector: 'app-get-teachers',
templateUrl: './get-teachers.component.html',
styleUrls: ['./get-teachers.component.css'],
standalone: true,
imports: [CommonModule, RouterModule, HttpClientModule]
})
export class GetTeachersComponent implements OnInit {
teachers: Teacher[] = [];
apiUrl = '${API_CONFIG.baseUrl}/teachers`;

pageNumber = 0;
totalPages = 1;

constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchTeachers();
  }

  fetchTeachers(): void {
    if (typeof localStorage === 'undefined') {
      console.error('⛔ localStorage is not available.');
      return;
    }

    const token = localStorage.getItem('authToken');

    if (!token) {
      console.error('⛔ Brak tokena! Użytkownik nie jest zalogowany.');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.get<{ content: Teacher[]; totalPages: number }>(
      `${this.apiUrl}?page=${this.pageNumber}&size=5`, { headers }
    ).subscribe({
      next: (data) => {
        console.log('✅ Otrzymane dane nauczycieli:', data);
        this.teachers = data.content;
        this.totalPages = data.totalPages;
      },
      error: (err) => {
        console.error('❌ Błąd pobierania nauczycieli:', err);
      }
    });
  }

  prevPage(): void {
    if (this.pageNumber > 0) {
      this.pageNumber--;
      this.fetchTeachers();
    }
  }

  nextPage(): void {
    if (this.pageNumber < this.totalPages - 1) {
      this.pageNumber++;
      this.fetchTeachers();
    }
  }

  goToDashboard(): void {
    this.router.navigate(['/']);
  }
}
