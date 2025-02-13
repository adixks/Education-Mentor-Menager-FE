import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateLessonComponent } from './update-lesson.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('UpdateLessonComponent', () => {
  let component: UpdateLessonComponent;
  let fixture: ComponentFixture<UpdateLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      declarations: [UpdateLessonComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a function to update lesson', () => {
    expect(component.updateLesson).toBeDefined();
  });

  it('should have a function to navigate back to dashboard', () => {
    expect(component.goToDashboard).toBeDefined();
  });

  it('should display error message if lesson ID is missing', () => {
    spyOn(window, 'alert');
    component.lessonId = '';
    component.updateLesson();
    expect(window.alert).toHaveBeenCalledWith('Musisz podać ID lekcji.');
  });

  it('should display error message if required fields are missing', () => {
    spyOn(window, 'alert');
    component.lessonId = '1';
    component.studentId = '';
    component.teacherId = '';
    component.date = '';
    component.updateLesson();
    expect(window.alert).toHaveBeenCalledWith('Wszystkie pola są wymagane.');
  });
});
