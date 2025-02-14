import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { API_CONFIG } from '../../config/api-config';

interface Teacher {
id: number;
firstName: string;
lastName: string;
email: string;
languages: string[];
}

@Component({
selector: 'app-get-teacher-by-id',
templateUrl: './get-teacher-by-id.component.html',
styleUrls: ['./get-teacher-by-id.component.css'],
standalone: true,
imports: [CommonModule, RouterModule, FormsModule, HttpClientModule]
})
export class GetTeacherByIdComponent implements OnInit {
teacher: Teacher | null = null;
teacherId: string = '';
apiUrl = `${API_CONFIG.baseUrl}/teachers';

constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.teacherId = id;
        this.fetchTeacher();
      }
    });
  }

  fetchTeacher(): void {
    if (!this.teacherId.trim()) {
      alert('⛔ Wprowadź ID nauczyciela!');
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

    this.http.get<Teacher>(`${this.apiUrl}/${this.teacherId}`, { headers }).subscribe({
      next: (data) => {
        console.log('✅ Otrzymane dane nauczyciela:', data);
        this.teacher = data;
      },
      error: (err) => {
        console.error('❌ Błąd pobierania nauczyciela:', err);
        alert('❌ Nie znaleziono nauczyciela.');
        this.teacher = null;
      }
    });
  }

  goToDashboard(): void {
    this.router.navigate(['/']);
  }
}
