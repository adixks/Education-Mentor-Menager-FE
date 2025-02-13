import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
selector: 'app-get-students',
standalone: true,
templateUrl: './get-students.component.html',
styleUrls: ['./get-students.component.css'],
imports: [CommonModule, RouterModule]
})
export class GetStudentsComponent implements OnInit {
students: any[] = [];
apiUrl = 'http://localhost:8080/api/v1/students';

constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('⛔ Brak tokena! Użytkownik nie jest zalogowany.');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.get<any>(this.apiUrl, { headers }).subscribe({
      next: (response) => {
        this.students = response.content;
        console.log('📚 Otrzymani studenci:', this.students);
      },
      error: (err) => {
        console.error('❌ Błąd pobierania studentów:', err);
        alert('❌ Wystąpił błąd podczas pobierania listy studentów.');
      }
    });
  }

  goToDashboard(): void {
    this.router.navigate(['/']);
  }
}
