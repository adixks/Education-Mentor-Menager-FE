import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateLessonDateComponent } from './update-lesson-date.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('UpdateLessonDateComponent', () => {
  let component: UpdateLessonDateComponent;
  let fixture: ComponentFixture<UpdateLessonDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      declarations: [UpdateLessonDateComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLessonDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a function to update lesson date', () => {
    expect(component.updateLessonDate).toBeDefined();
  });

  it('should have a function to navigate back to dashboard', () => {
    expect(component.goToDashboard).toBeDefined();
  });

  it('should display error message if lesson ID is missing', () => {
    spyOn(window, 'alert');
    component.lessonId = '';
    component.updateLessonDate();
    expect(window.alert).toHaveBeenCalledWith('Musisz podać ID lekcji.');
  });

  it('should display error message if date is missing', () => {
    spyOn(window, 'alert');
    component.lessonId = '1';
    component.date = '';
    component.updateLessonDate();
    expect(window.alert).toHaveBeenCalledWith('Musisz podać nową datę lekcji.');
  });
});
