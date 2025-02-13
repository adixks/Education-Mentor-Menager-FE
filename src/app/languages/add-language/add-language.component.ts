import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { API_CONFIG } from '../config/api-config';

@Component({
selector: 'app-add-language',
standalone: true,
templateUrl: './add-language.component.html',
styleUrls: ['./add-language.component.css'],
imports: [CommonModule, RouterModule, FormsModule]
})
export class AddLanguageComponent {
languageName: string = '';
apiUrl = '${API_CONFIG.baseUrl}/language';

constructor(private http: HttpClient, private router: Router) {}

  addLanguage(): void {
    if (!this.languageName.trim()) {
      alert('⛔ Nazwa języka nie może być pusta!');
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

    const body = { name: this.languageName };

    this.http.post<any>(this.apiUrl, body, { headers }).subscribe({
      next: (response) => {
        console.log('✅ Język dodany:', response);
        alert(`✅ Język "${response.name}" został dodany!`);
        this.router.navigate(['/languages']);
      },
      error: (err) => {
        console.error('❌ Błąd dodawania języka:', err);
        alert('❌ Wystąpił błąd podczas dodawania języka.');
      }
    });
  }

  goToDashboard(): void {
    this.router.navigate(['/']);
  }
}
