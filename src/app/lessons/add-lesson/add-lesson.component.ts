import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { API_CONFIG } from '../../config/api-config';

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
selectedDate: string = '';
chosenSlot: string = '';
freeSlots: string[] = [];
freeSlotsLoaded = false;

apiUrl = `${API_CONFIG.baseUrl}/lessons`;

constructor(private http: HttpClient, private router: Router) {}

  loadFreeSlots(): void {
    if (!this.teacherId || isNaN(Number(this.teacherId))) {
      alert('Musisz podać poprawne ID nauczyciela');
      return;
    }
    if (!this.selectedDate) {
      alert('Musisz wybrać dzień');
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('⛔ Brak tokena! Użytkownik nie jest zalogowany.');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any>(`${this.apiUrl}?size=9999`, { headers }).subscribe({
      next: (data) => {
        const allLessons = data.content || data;
        const teacherLessons = allLessons.filter((lesson: any) =>
          lesson.teacherId === +this.teacherId
        );

        const wantedDay = this.selectedDate;
        const sameDayLessons = teacherLessons.filter((lesson: any) => {
          if (!lesson.date) return false;
          const datePart = lesson.date.substring(0, 10);
          return datePart === wantedDay;
        });

        const possibleSlots = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00'];

        const occupiedSlots: string[] = [];
        for (let lesson of sameDayLessons) {
          const hourStr = lesson.date.substring(11, 13);
          occupiedSlots.push(`${hourStr}:00`);
        }

        this.freeSlots = possibleSlots.filter(slot => !occupiedSlots.includes(slot));
        this.freeSlotsLoaded = true;

      },
      error: (err) => {
        console.error('❌ Błąd przy pobieraniu lekcji:', err);
        alert('❌ Nie udało się załadować wolnych godzin');
      }
    });
  }

  addLesson(): void {
    if (!this.isValidForm()) {
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

    const dateTime = this.combineDateAndHour(this.selectedDate, this.chosenSlot);

    const lesson = {
      studentId: parseInt(this.studentId),
      teacherId: parseInt(this.teacherId),
      date: dateTime
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

  private combineDateAndHour(dateStr: string, hourStr: string): string {
    // "2025-02-20" + "09:00" -> "2025-02-20T09:00:00"
    return `${dateStr}T${hourStr}:00`;
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
    if (!this.selectedDate) {
      alert('Musisz podać datę lekcji (dzień).');
      return false;
    }
    if (!this.chosenSlot) {
      alert('Musisz wybrać godzinę rozpoczęcia lekcji.');
      return false;
    }
    return true;
  }

  goToDashboard(): void {
    this.router.navigate(['/']);
  }
}
