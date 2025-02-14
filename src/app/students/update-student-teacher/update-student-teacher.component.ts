import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { API_CONFIG } from '../../config/api-config';

@Component({
selector: 'app-update-student-teacher',
templateUrl: './update-student-teacher.component.html',
styleUrls: ['./update-student-teacher.component.css'],
standalone: true,
imports: [CommonModule, FormsModule, HttpClientModule]
})
export class UpdateStudentTeacherComponent {
studentId: number = 0;
newTeacherId: number = 0;
responseMessage: string = '';
apiUrl = `${API_CONFIG.baseUrl}/students';

constructor(private http: HttpClient, private router: Router) {}

  updateStudentTeacher(): void {
    if (this.studentId <= 0 || this.newTeacherId <= 0) {
      alert('⛔ Wprowadź poprawne ID studenta i nauczyciela!');
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('⛔ Brak tokena! Użytkownik nie jest zalogowany.');
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.patch(`${this.apiUrl}/${this.studentId}`, this.newTeacherId, { headers }).subscribe({
      next: (data: any) => {
        console.log('✅ Nauczyciel studenta zaktualizowany:', data);
        this.responseMessage = `✅ Nauczyciel studenta został zaktualizowany!`;
        this.studentId = 0;
        this.newTeacherId = 0;
      },
      error: (err) => {
        console.error('❌ Błąd aktualizacji nauczyciela studenta:', err);
        alert('❌ Nie udało się zaktualizować nauczyciela.');
      }
    });
  }

  goToDashboard(): void {
    this.router.navigate(['/']);
  }
}
