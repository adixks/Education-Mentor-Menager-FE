import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { API_CONFIG } from '../config/api-config';

@Component({
selector: 'app-get-languages',
standalone: true,
templateUrl: './get-languages.component.html',
styleUrls: ['./get-languages.component.css'],
imports: [CommonModule, RouterModule]
})
export class GetLanguagesComponent implements OnInit {
languages: any[] = [];
apiUrl = `${API_CONFIG.baseUrl}/language`;

constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getLanguages();
  }

  getLanguages(): void {
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
        this.languages = response.content;
        console.log('📚 Otrzymane języki:', this.languages);
      },
      error: (err) => {
        console.error('❌ Błąd pobierania języków:', err);
        alert('❌ Wystąpił błąd podczas pobierania listy języków.');
      }
    });
  }
}
