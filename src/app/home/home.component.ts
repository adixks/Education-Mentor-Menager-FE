import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
selector: 'app-home',
standalone: true,
templateUrl: './home.component.html',
styleUrls: ['./home.component.css'],
imports: [CommonModule] // ⬅️ Dodano CommonModule do imports
})
export class HomeComponent {
userRole: string | null = null;

constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.setUserRole();
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setUserRole();
    }
  }

  setUserRole(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          this.userRole = payload.role || null;
        } catch (error) {
          console.error('❌ Błąd dekodowania tokena JWT:', error);
          this.userRole = null;
        }
      }
    }
  }

  isLoggedIn(): boolean {
    return this.userRole !== null;
  }

  isAdmin(): boolean {
    return this.userRole === 'ROLE_ADMIN';
  }

  isTeacher(): boolean {
    return this.userRole === 'ROLE_TEACHER';
  }

  isStudent(): boolean {
    return this.userRole === 'ROLE_STUDENT';
  }

  login(): void {
    console.log('🔹 Przekierowanie do strony logowania...');
    this.router.navigate(['/login']);
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
    }
    this.userRole = null;
    this.router.navigate(['/']);
  }

  // -----------------teachers-----------------
  goToTeachers(): void {
    this.router.navigate(['/teachers']);
  }

  goToTeacherById(): void {
    this.router.navigate(['/teacher-by-id']);
  }

  goToDeleteTeacher(): void {
    console.log('🔹 Przekierowanie do usuwania nauczyciela...');
    this.router.navigate(['/delete-teacher']);
  }

  goToAddTeacher(): void {
    this.router.navigate(['/add-teacher']);
  }

  goToUpdateTeacherLanguages(): void {
    console.log('🔹 Przekierowanie do aktualizacji języków nauczyciela...');
    this.router.navigate(['/update-teacher-languages']);
  }

  // -----------------lesson-----------------
  goToLessons(): void {
    console.log('🔹 Przekierowanie do listy lekcji...');
    this.router.navigate(['/lessons']);
  }

  goToLessonById(): void {
    console.log('🔹 Przekierowanie do pobierania lekcji po ID...');
    this.router.navigate(['/lesson-by-id']);
  }

  goToAddLesson(): void {
    console.log('🔹 Przekierowanie do dodawania lekcji...');
    this.router.navigate(['/add-lesson']);
  }

  goToUpdateLesson(): void {
    console.log('🔹 Przekierowanie do zmiany lekcji...');
    this.router.navigate(['/update-lesson']);
  }

  goToUpdateLessonDate(): void {
    console.log('🔹 Przekierowanie do zmiany daty lekcji...');
    this.router.navigate(['/update-lesson-date']);
  }

  goToDeleteLesson(): void {
    console.log('🔹 Przekierowanie do usuwania lekcji...');
    this.router.navigate(['/delete-lesson']);
  }

  // -----------------language-----------------
  goToLanguages(): void {
    this.router.navigate(['/languages']);
  }

  goToAddLanguage(): void {
    console.log('🔹 Przekierowanie do dodawania języka...');
    this.router.navigate(['/add-language']);
  }

  goToDeleteLanguage(): void {
    console.log('🔹 Przekierowanie do usuwania języka...');
    this.router.navigate(['/delete-language']);
  }

  // -----------------student-----------------
  goToStudents(): void {
    this.router.navigate(['/students']);
  }

  goToStudentById(): void {
    this.router.navigate(['/student-by-id']);
  }

  goToAddStudent(): void {
    this.router.navigate(['/add-student']);
  }

  goToUpdateStudentTeacher(): void {
    console.log('🔹 Przekierowanie do aktualizacji nauczyciela studenta...');
    this.router.navigate(['/update-student-teacher']);
  }

  goToDeleteStudent(): void {
    console.log('🔹 Przekierowanie do usuwania studenta...');
    this.router.navigate(['/delete-student']);
  }
}
