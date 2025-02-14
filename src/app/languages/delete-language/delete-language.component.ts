import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { API_CONFIG } from '../../config/api-config';

@Component({
selector: 'app-delete-language',
standalone: true,
templateUrl: './delete-language.component.html',
styleUrls: ['./delete-language.component.css'],
imports: [FormsModule, CommonModule]
})
export class DeleteLanguageComponent {
languageId: number = 0;
apiUrl = '${API_CONFIG.baseUrl}/language';

constructor(private http: HttpClient, private router: Router) {}

  deleteLanguage(): void {
    if (!this.languageId) {
      alert('⛔ Podaj ID języka!');
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

    this.http.delete(`${this.apiUrl}/${this.languageId}`, { headers }).subscribe({
      next: () => {
        alert('✅ Język został usunięty!');
        this.languageId = 0;
        this.router.navigate(['/languages']);
      },
      error: (err) => {
        console.error('❌ Błąd usuwania języka:', err);
        alert('❌ Wystąpił błąd podczas usuwania języka.');
      }
    });
  }

  goToDashboard(): void {
    this.router.navigate(['/']);
  }
}
