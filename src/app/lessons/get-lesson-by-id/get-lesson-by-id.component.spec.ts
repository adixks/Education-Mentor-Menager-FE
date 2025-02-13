import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetLessonByIdComponent } from './get-lesson-by-id.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('GetLessonByIdComponent', () => {
  let component: GetLessonByIdComponent;
  let fixture: ComponentFixture<GetLessonByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetLessonByIdComponent, HttpClientTestingModule, FormsModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(GetLessonByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an empty lessonId on init', () => {
    expect(component.lessonId).toBe('');
  });

  it('should display an alert when lessonId is missing', () => {
    spyOn(window, 'alert');
    component.fetchLesson();
    expect(window.alert).toHaveBeenCalledWith('⛔ Musisz podać ID lekcji.');
  });
});
