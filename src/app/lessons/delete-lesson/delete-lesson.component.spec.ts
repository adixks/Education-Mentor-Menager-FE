import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteLessonComponent } from './delete-lesson.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('DeleteLessonComponent', () => {
  let component: DeleteLessonComponent;
  let fixture: ComponentFixture<DeleteLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteLessonComponent, HttpClientTestingModule, RouterTestingModule, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteLesson() and show alert', () => {
    spyOn(window, 'alert');
    component.lessonId = '1';
    component.deleteLesson();
    expect(window.alert).toHaveBeenCalled();
  });
});
