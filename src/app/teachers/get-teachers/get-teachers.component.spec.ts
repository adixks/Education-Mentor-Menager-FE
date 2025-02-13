import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Teacher {
id: number;
name: string;
email: string;
languages: string[];
}

@Component({
selector: 'app-get-teachers',
templateUrl: './get-teachers.component.html',
styleUrls: ['./get-teachers.component.css'],
imports: [CommonModule] // ✅ Required for *ngFor
})
export class GetTeachersComponent {
teachers: Teacher[] = [];
apiUrl = 'http://localhost:8080/api/v1/teachers';

constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchTeachers();
  }

  fetchTeachers(): void {
    const token = localStorage.getItem('authToken');

    if (!token) {
      console.error('Brak tokena! Użytkownik nie jest zalogowany.');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.get<Teacher[]>(this.apiUrl, { headers }).subscribe({
      next: (data) => {
        this.teachers = data;
      },
      error: (err) => {
        console.error('Błąd pobierania nauczycieli:', err);
      }
    });
  }
}
