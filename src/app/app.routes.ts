import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { RegisterChoiceComponent } from './auth/register-choice/register-choice.component';
import { GetTeacherByIdComponent } from './teachers/get-teacher-by-id/get-teacher-by-id.component';
import { AddTeacherComponent } from './teachers/add-teacher/add-teacher.component';
import { UpdateTeacherLanguagesComponent } from './teachers/update-teacher-languages/update-teacher-languages.component';
import { DeleteTeacherComponent } from './teachers/delete-teacher/delete-teacher.component';
import { GetTeachersComponent } from './teachers/get-teachers/get-teachers.component';
import { GetLessonsComponent } from './lessons/get-lessons/get-lessons.component';
import { GetLessonByIdComponent } from './lessons/get-lesson-by-id/get-lesson-by-id.component';
import { AddLessonComponent } from './lessons/add-lesson/add-lesson.component';
import { UpdateLessonComponent } from './lessons/update-lesson/update-lesson.component';
import { UpdateLessonDateComponent } from './lessons/update-lesson-date/update-lesson-date.component';
import { DeleteLessonComponent } from './lessons/delete-lesson/delete-lesson.component';
import { GetLanguagesComponent } from './languages/get-languages/get-languages.component';
import { AddLanguageComponent } from './languages/add-language/add-language.component';
import { DeleteLanguageComponent } from './languages/delete-language/delete-language.component';
import { GetStudentsComponent } from './students/get-students/get-students.component';
import { GetStudentByIdComponent } from './students/get-student-by-id/get-student-by-id.component';
import { AddStudentComponent } from './students/add-student/add-student.component';
import { UpdateStudentTeacherComponent } from './students/update-student-teacher/update-student-teacher.component';
import { DeleteStudentComponent } from './students/delete-student/delete-student.component';
import { AuthGuard } from './auth/auth.guard';

export const appRoutes: Routes = [
{ path: '', component: HomeComponent },
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{ path: 'register-choice', component: RegisterChoiceComponent },
{ path: 'add-teacher', component: AddTeacherComponent},
{ path: 'add-student', component: AddStudentComponent},

// -----------------ROUTES DOSTĘPNE DLA ADMINA-----------------
{ path: 'update-teacher-languages', component: UpdateTeacherLanguagesComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
{ path: 'delete-teacher', component: DeleteTeacherComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
{ path: 'add-language', component: AddLanguageComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
{ path: 'delete-language', component: DeleteLanguageComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
{ path: 'update-student-teacher', component: UpdateStudentTeacherComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
{ path: 'delete-student', component: DeleteStudentComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
{ path: 'update-lesson', component: UpdateLessonComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
{ path: 'delete-lesson', component: DeleteLessonComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },

// -----------------ROUTES DOSTĘPNE DLA NAUCZYCIELA-----------------
{ path: 'teacher-by-id', component: GetTeacherByIdComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_TEACHER'] } },
{ path: 'students', component: GetStudentsComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_TEACHER'] } },
{ path: 'update-date-lesson', component: UpdateLessonDateComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_TEACHER'] } },
{ path: 'student-by-id', component: GetStudentByIdComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_TEACHER'] } },

// -----------------ROUTES DOSTĘPNE DLA UCZNIA-----------------
{ path: 'add-lesson', component: AddLessonComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_TEACHER', 'ROLE_STUDENT'] } },
{ path: 'teachers', component: GetTeachersComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_TEACHER', 'ROLE_STUDENT'] } },
{ path: 'languages', component: GetLanguagesComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_TEACHER', 'ROLE_STUDENT'] } },
{ path: 'lessons', component: GetLessonsComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_TEACHER', 'ROLE_STUDENT'] } },
{ path: 'lesson-by-id', component: GetLessonByIdComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_TEACHER', 'ROLE_STUDENT'] } },

{ path: '**', redirectTo: '' }
];
