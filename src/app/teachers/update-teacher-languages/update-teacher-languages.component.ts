import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { API_CONFIG } from '../../config/api-config';

@Component({
selector: 'app-update-teacher-languages',
templateUrl: './update-teacher-languages.component.html',
styleUrls: ['./update-teacher-languages.component.css'],
standalone: true,
imports: [CommonModule, RouterModule, FormsModule]
})
export class UpdateTeacherLanguagesComponent {
teacherId: string = '';
languages: string = '';
apiUrl = `${API_CONFIG.baseUrl}/teachers`;

constructor(private http: HttpClient, private router: Router) {}

  updateLanguages(): void {
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

    const languagesArray = this.languages.split(',').map(lang => lang.trim());
    const body = { languagesList: languagesArray };

    this.http.patch(`${this.apiUrl}/${this.teacherId}`, body, { headers }).subscribe({
      next: () => {
        alert('✅ Języki zostały zaktualizowane pomyślnie!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('❌ Błąd podczas aktualizacji języków:', err);
        alert(`❌ Nie udało się zaktualizować języków. Status: ${err.status}`);
      }
    });
  }

  isValidForm(): boolean {
    if (!this.teacherId) {
      alert('Musisz podać ID nauczyciela.');
      return false;
    }
    const languagesArray = this.languages.split(',').filter(lang => lang.trim().length > 0);
    if (languagesArray.length < 2) {
      alert('Musisz podać co najmniej dwa języki.');
      return false;
    }
    return true;
  }

  goToDashboard(): void {
    this.router.navigate(['/']);
  }
}
