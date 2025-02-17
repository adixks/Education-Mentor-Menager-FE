import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { API_CONFIG } from '../../config/api-config';

interface Student {
id: number;
firstName: string;
lastName: string;
language: string;
}

@Component({
selector: 'app-get-student-by-id',
templateUrl: './get-student-by-id.component.html',
styleUrls: ['./get-student-by-id.component.css'],
standalone: true,
imports: [CommonModule, RouterModule, FormsModule, HttpClientModule]
})
export class GetStudentByIdComponent implements OnInit {
student: Student | null = null;
studentId: string = '';
apiUrl = `${API_CONFIG.baseUrl}/students`;

constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.studentId = id;
        this.fetchStudent();
      }
    });
  }

fetchStudent(): void {
  if (!this.studentId.trim()) {
    alert('⛔ Wprowadź ID studenta!');
    return;
  }

  const token = localStorage.getItem('authToken');

  // 🚨 Sprawdzenie, czy token istnieje
  if (!token || token === 'null' || token === 'undefined') {
    alert('⛔ Brak tokena! Użytkownik nie jest zalogowany.');
    this.router.navigate(['/login']);
    return;
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  this.http.get<Student>(`${this.apiUrl}/${this.studentId}`, { headers }).subscribe({
    next: (data) => {
      console.log('✅ Otrzymane dane studenta:', data);
      this.student = data;
    },
    error: (err) => {
      console.error('❌ Błąd pobierania studenta:', err);
      alert('❌ Nie znaleziono studenta.');
      this.student = null;
    }
  });
}

  goToDashboard(): void {
    this.router.navigate(['/']);
  }
}
